import { exec } from "child_process";

export function pingHost(target: string): Promise<boolean> {
  return new Promise((resolve) => {
    const command =
      process.platform === "win32"
        ? `ping -n 1 ${target}`
        : `ping -c 1 ${target}`;

    exec(command, (error) => {
      resolve(!error);
    });
  });
}