import { Show, createSignal, type Component } from 'solid-js';
import { Portal } from 'solid-js/web';
import { modalEvents } from '../scripts/modal';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { ClientProviderResponse, useClient } from './Client';

const WishModal: Component = () => {
    const [client] = useClient() as ClientProviderResponse;
    const [name, setName] = createSignal("");
    const [show, setShow] = createSignal(false);

    modalEvents.on("open_name_modal", () => {
        setShow(prev => !prev);
    })

    return (
        <Show when={show()}>
            <Portal>
                <div class="absolute top-0 left-0 w-screen h-full flex justify-center items-center">
                    <div class="h-20 w-32 border-2 border-black">
                        <input
                            id="name-input"
                            value=""
                            placeholder="Your name"
                            onkeyup={(e) => {
                                setName(e.currentTarget.value);
                            }}
                        />
                        <button
                            onclick={() => { onWishClick(client(), name()) }}
                        >
                            Send wishes
                        </button>
                    </div>
                </div>
            </Portal>
        </Show>
    )
}

const onWishClick = (client: Socket<DefaultEventsMap, DefaultEventsMap>, name: string) => {
    console.log(`${name} wishes you a happy birthday`);
    client.emit("wish", name);
}

export default WishModal;
