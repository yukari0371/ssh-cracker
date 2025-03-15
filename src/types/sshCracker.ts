export type sshCheckResult =
| {
    status: "success";
    hostname: string;
    username: string;
    password: string;
} | {
    status: "error";
    message: string;
};
