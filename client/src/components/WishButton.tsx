import type { Component } from 'solid-js';
import { ClientProviderResponse, useClient } from './Client';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { modalEvents } from '../scripts/modal';

const WishButton: Component = () => {
    const [client] = useClient() as ClientProviderResponse;
    
    return (
        <div class="w-96">
            <button onclick={() => onWishClick(client(), "philip")}>
                Wish Birthday
            </button>
        </div>
    )
}

const onWishClick = (client: Socket<DefaultEventsMap, DefaultEventsMap>, name: string) => {
    modalEvents.send("open_name_modal");
}


export default WishButton;
