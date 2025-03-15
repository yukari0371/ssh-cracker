export async function prompt(q: string): Promise<string> {
    return new Promise((resolve) => {
        process.stdout.write(`${q}> `);
        process.stdin.once("data", (data) => {
            resolve(data.toString().trim());
        });
    });
};