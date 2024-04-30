export type DispatchableEvent = {
    callbacks: [() => void]
}

export class EventDispatcher {
    #events: { [id: string]: DispatchableEvent };

    constructor() {
        this.#events = {};
    }

    on(id: string, callback: () => void) {
        if (!Object.keys(this.#events).includes(id)) {
            this.#events[id] = { callbacks: [callback] };
            return;
        }

        this.#events[id].callbacks.push(callback);
    }

    send(id: string) {
        if (!Object.keys(this.#events).includes(id)) {
            throw new Error("Attempted to send an event that doesn't exist");
        }

        const event = this.#events[id];
        for (let i = 0; i < event.callbacks.length; i++) {
            const callback = event.callbacks[i];
            callback();
        }
    }
}
