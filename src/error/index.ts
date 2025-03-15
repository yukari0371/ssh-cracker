export class CrackerError extends Error {
    constructor (message: string) {
        super(message);
        this.name = "AttackerError";
    }
};
