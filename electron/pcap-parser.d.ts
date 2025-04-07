declare module 'pcap-parser' {
  import { Readable } from 'stream';
  import { EventEmitter } from 'events';

  export interface PcapPacketHeader {
    tv_sec: number;   // タイムスタンプ（秒）
    tv_usec: number;  // タイムスタンプ（マイクロ秒）
    orig_len: number; // パケットの元の長さ
  }

  export interface PcapPacket {
    header: PcapPacketHeader;
    data: Buffer;
  }

  // parse() が返すオブジェクトは EventEmitter を継承しており、'packet' などのイベントを受け取る
  export function parse(stream: Readable): EventEmitter & {
    on(event: 'packet', callback: (packet: PcapPacket) => void): this;
    on(event: 'end', callback: () => void): this;
    on(event: 'error', callback: (err: Error) => void): this;
  };
}
