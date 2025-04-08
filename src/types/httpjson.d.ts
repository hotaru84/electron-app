export type HttpRequest = {
  method: string;
  url: string;
  host: string;
  body?: string;
  headers?: Record<string, string>;
};

export type HttpResponse = {
  statusCode: string;
  reason: string;
  body?: string;
  headers?: Record<string, string>;
};

export type Response = {
  method: string;
  path: string;
} & HttpResponse;