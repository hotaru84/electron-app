

/**
 * Wireshark JSON（複数のフレームが含まれる）をパースして
 * HttpRequest[] および HttpResponse[] に分解する
 */

import { HttpRequest, HttpResponse } from "../types/httpjson";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseHttpJson(json: any): {
  requests: HttpRequest[];
  responses: HttpResponse[];
} {
  const frames = Array.isArray(json) ? json : json["packets"] || [];

  const requests: HttpRequest[] = [];
  const responses: HttpResponse[] = [];

  for (const frame of frames) {
    const layers = frame._source?.layers;
    if (!layers || !layers.http) continue;

    const http = layers.http;

    // リクエストかレスポンスを判定
    if ("http.request.method" in http) {
      const method = http["http.request.method"];
      const host = http["http.host"] || "localhost:3000";
      const uri = http["http.request.uri"] || "/";
      const body = http["http.file_data"];
      const headers: Record<string, string> = {};

      for (const [key, value] of Object.entries(http)) {
        if (key.startsWith("http.") && typeof value === "string" && !key.includes("file_data") && !key.includes("request.method") && !key.includes("host") && !key.includes("request.uri")) {
          const headerKey = key.replace("http.", "").replace(/\./g, "-");
          headers[headerKey] = value;
        }
      }

      requests.push({
        method,
        host,
        url: uri,
        headers,
        body: body ? hexToUtf8(body) : undefined,
      });
    }

    if ("http.response.code" in http) {
      const statusCode = http["http.response.code"];
      const reason = http["http.response.phrase"] || "OK";
      const body = http["http.file_data"];
      const headers: Record<string, string> = {};

      for (const [key, value] of Object.entries(http)) {
        if (key.startsWith("http.") && typeof value === "string" && !key.includes("file_data") && !key.includes("response.code") && !key.includes("response.phrase")) {
          const headerKey = key.replace("http.", "").replace(/\./g, "-");
          headers[headerKey] = value;
        }
      }

      responses.push({
        statusCode,
        reason,
        headers,
        body: body ? hexToUtf8(body) : undefined,
      });
    }
  }

  return { requests, responses };
}

/**
 * Wiresharkの http.file_data に含まれる 16進文字列を UTF-8 文字列へ変換
 */
function hexToUtf8(hexString: string): string {
  const hex = hexString.replace(/:/g, "");
  const bytes = new Uint8Array(hex.match(/.{1,2}/g)!.map((b) => parseInt(b, 16)));
  return new TextDecoder("utf-8").decode(bytes);
}
