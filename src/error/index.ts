export class AttackerError extends Error {
    constructor (message: string) {
        super(message);
        this.name = "AttackerError";
    }
};