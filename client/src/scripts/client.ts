import io from "socket.io-client";

const createClient = (addr: string) => {
    const socket = io(addr);

    return socket;
}

export { createClient };
