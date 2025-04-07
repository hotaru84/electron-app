declare module 'pcap-parser' {
  import { Readable } from 'stream';
  import { EventEmitter } from 'events';

  export interface PcapPacketHeader {
    tv_sec: number;
    tv_usec: number;
    orig_len: number;
  }

  export interface PcapPacket {
    header: PcapPacketHeader;
    data: Buffer;
  }

  export interface PcapParserInstance extends EventEmitter {
    on(event: 'packet', callback: (packet: PcapPacket) => void): this;
    on(event: 'end', callback: () => void): this;
    on(event: 'error', callback: (err: Error) => void): this;
  }

  export function parse(stream: Readable): PcapParserInstance;
}
