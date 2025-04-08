import axios from "axios";
import { HttpRequest } from "../types/httpjson";

export async function executeRequest(request: HttpRequest) {
  const url = `http://${request.host}${request.url}`;
  const method = request.method.toLowerCase();
  const headers = request.headers || { "Content-Type": "application/json" };
  const data = request.body ? JSON.parse(request.body) : undefined;

  try {
    const response = await axios({
      method,
      url,
      headers,
      data,
    });
    console.log("Response Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
}
