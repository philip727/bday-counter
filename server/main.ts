import { createServer, request } from "http";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import fs from 'fs'

const PORT = 4000;

// no need for db when theres this much data
let storedData = {
    totalWishes: 0,
    names: [],
}

type Wish = {
    name: string,
    time: number,
}

const main = () => {
    const httpServer = createServer();
    const ioServer = new Server(httpServer, { cors: { origin: "*" } });
    const currentWishes: Wish[] = [];

    if (fs.existsSync("./data.json")) {
        storedData = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    }

    // Updates the current wishes and deletes old ones
    setInterval(() => {
        for (let i = 0; i < currentWishes.length; i++) {
            const wish = currentWishes[i];
            const curTime = Math.floor(Date.now() / 1000);
            const time_since = curTime - wish.time;

            if (time_since > 20) {
                currentWishes.splice(i, 1);
            }
        }
    }, 500)

    // Saves our data every 1 second
    setInterval(() => {
        fs.writeFileSync("./data.json", JSON.stringify(storedData));
    }, 10000)

    ioServer.on("connection", (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => {
        // Sends the current wishes to a new connection
        socket.emit("stored_wishes", currentWishes);

        socket.on("get_total_wishes", () => {
            socket.emit("total_wishes", storedData);
        });

        // When someone wishes we need to make sure it is a safe wish
        socket.on("wish", async (name: string) => {
            if (!name || /\d/.test(name) || /\s/g.test(name) || name.length > 7) {
                return;
            }

            // Uses an api to make sure the name isn't profane
            const response = await fetch(`https://www.purgomalum.com/service/containsprofanity?text=${name}`,
                { method: "GET" }
            );

            if (!response.ok) {
                const status = response.status;
                console.warn(`Failed profanity filter request: ${status}`);
                return;
            }

            // Response is plaintext, ion know why
            let containsProfanity = await response.text();
            if (containsProfanity == "true") {
                console.log(`Failed to wish as name was deemed profane: ${name}`);
                return;
            }

            // Sends event back to client so we can display the birthday wish yay
            console.log(`${name} wished a happy birthday`);

            // Stores the wish
            storedData.totalWishes++;
            storedData.names.push(name);
            currentWishes.push({ name: name, time: (Date.now() / 1000) });

            // Sends the wish to all clients
            ioServer.emit("new_wish", name);
        });

    });

    console.log(`Server running on port ${PORT}`);
    httpServer.listen(4000);
}

main();
