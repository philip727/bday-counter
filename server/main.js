import { createServer } from "http";
import { Server } from "socket.io";

const PORT = 4000;

const main = () => {
    const httpServer = createServer();
    const ioServer = new Server(httpServer, { cors: { origin: "*" } });

    ioServer.on("connection", (socket) => {
        console.log("Hay connection");

        socket.on("wish", (name) => {
            console.log(`${name} wishes you a happy birthday`);


            ioServer.emit("new_wish", name);
        });

    });

    console.log(`Server running on port ${PORT}`);
    httpServer.listen(4000);
}

main();
