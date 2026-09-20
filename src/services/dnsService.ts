import dns from "dns";

export function resolveDNS(target: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    dns.resolve(target, "A", (error, addresses) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(addresses);
    });
  });
}