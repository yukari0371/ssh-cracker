export type sshCheckResult =
| {
    status: "success";
    host: string;
    username: string;
    password: string;
} | {
    status: "error";
    message: string;
};
