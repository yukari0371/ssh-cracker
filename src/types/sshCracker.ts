import { NodeSSH } from "node-ssh";

export type sshCheckResult =
| {
    status: "success";
    hostname: string;
    username: string;
    password: string;
    result: NodeSSH;
} | {
    status: "error";
    message: string;
};
