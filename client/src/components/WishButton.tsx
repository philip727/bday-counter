import type { Component } from 'solid-js';
import { ClientProviderResponse, useClient } from './Client';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

const WishButton: Component = () => {
    const [client] = useClient() as ClientProviderResponse;
    
    return (
        <div>
            <button onclick={() => onWishClick(client(), "philip")}>
                Wish Birthday
            </button>
        </div>
    )
}

const onWishClick = (client: Socket<DefaultEventsMap, DefaultEventsMap>, name: string) => {
    client.emit("wish", name);
}


export default WishButton;
