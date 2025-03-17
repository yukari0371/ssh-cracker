export async function prompt(q: string): Promise<string> {
    return new Promise((resolve) => {
        process.stdout.write(`${q}> `);
        process.stdin.resume();
        process.stdin.once("data", (data) => {
            process.stdin.pause();
            resolve(data.toString().trim());
        });
    });
};
