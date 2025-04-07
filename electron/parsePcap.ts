import { Readable } from 'stream';
import * as PcapParser from 'pcap-parser';

export const parsePcap = (
  fileBuffer: ArrayBuffer
): Promise<{ requests: string[]; responses: string[] }> => {
  return new Promise((resolve, reject) => {
    const requests: string[] = [];
    const responses: string[] = [];

    const stream = Readable.from(Buffer.from(fileBuffer));
    const parser = PcapParser.parse(stream);

    parser.on('packet', (packet: PcapParser.PcapPacket) => {
      const rawData = packet.data;

      try {
        // Ethernet ヘッダ（14バイト）をスキップ
        const etherType = rawData.readUInt16BE(12);
        if (etherType !== 0x0800) return; // IPv4でなければスキップ

        // IPヘッダ（20バイトを仮定）をスキップ
        const ipHeaderLength = (rawData[14] & 0x0f) * 4;
        const protocol = rawData[23]; // 6: TCP, 17: UDP
        if (protocol !== 6) return; // TCP以外はスキップ

        const tcpHeaderOffset = 14 + ipHeaderLength;
        const tcpHeaderLength = ((rawData[tcpHeaderOffset + 12] >> 4) & 0x0f) * 4;

        const httpOffset = tcpHeaderOffset + tcpHeaderLength;
        const httpPayload = rawData.slice(httpOffset).toString('utf-8');

        // HTTP判定（簡易的）
        if (/^(GET|POST|PUT|DELETE|OPTIONS|HEAD) /.test(httpPayload)) {
          requests.push(httpPayload);
        } else if (/^HTTP\/1\.[01] \d{3}/.test(httpPayload)) {
          responses.push(httpPayload);
        }
      } catch (err) {
        console.warn('packet parse error:', err);
      }
    });

    parser.on('end', () => {
      console.log(requests);
      resolve({ requests, responses });
    });

    parser.on('error', (err) => {
      reject(err);
    });
  });
};
