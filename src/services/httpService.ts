import https from "https";
import http from "http";

export interface HTTPResult {
  statusCode: number | null;
  responseTime: number | null;
  reachable: boolean;
}

export function checkHTTP(target: string): Promise<HTTPResult> {
  return new Promise((resolve) => {
    const start = Date.now();

    let url: URL;

    try {
      url = new URL(target);
    } catch {
      resolve({
        statusCode: null,
        responseTime: null,
        reachable: false,
      });
      return;
    }

    const client = url.protocol === "https:" ? https : http;

    const request = client.get(
      url,
      {
        timeout: 5000,
      },
      (response) => {
        const responseTime = Date.now() - start;

        response.resume();

        resolve({
          statusCode: response.statusCode ?? null,
          responseTime,
          reachable: true,
        });
      }
    );

    request.on("timeout", () => {
      request.destroy();

      resolve({
        statusCode: null,
        responseTime: null,
        reachable: false,
      });
    });

    request.on("error", () => {
      resolve({
        statusCode: null,
        responseTime: null,
        reachable: false,
      });
    });
  });
}