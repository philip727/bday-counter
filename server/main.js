import { createServer, request } from "http";
import { Server } from "socket.io";

const PORT = 4000;

const main = () => {
    const httpServer = createServer();
    const ioServer = new Server(httpServer, { cors: { origin: "*" } });

    ioServer.on("connection", (socket) => {
        console.log("Hay connection");

        socket.on("wish", async (name) => {
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
            ioServer.emit("new_wish", name);
        });

    });

    console.log(`Server running on port ${PORT}`);
    httpServer.listen(4000);
}

main();
