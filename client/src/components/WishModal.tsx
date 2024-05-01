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
                    <div class="h-48 w-72  border-[var(--darker-pastel-pink)] flex flex-col items-center justify-between py-6 
                        bg-[var(--pastel-pink)] rounded-2xl shadow-one">
                        <input
                            class="w-56 h-12 border-[var(--darker-pastel-pink)] 
                                rounded-2xl shadow-two pl-2 tracking-widest font-semibold"
                            id="name-input"
                            value=""
                            placeholder="Your name"
                            onkeyup={(e) => {
                                setName(e.currentTarget.value);
                            }}
                        />
                        <button
                            class="w-56 h-16 bg-white rounded-2xl  
                                border-[var(--darker-pastel-pink)] shadow-two"
                            onclick={() => { onWishClick(client(), name()) }}
                        >
                            <p class="font-semibold tracking-widest text-2xl text-[var(--pastel-pink)]">
                                Send wishes 🎉
                            </p>
                        </button>
                    </div>
                </div>
            </Portal>
        </Show>
    )
}

const onWishClick = (client: Socket<DefaultEventsMap, DefaultEventsMap>, name: string) => {
    client.emit("wish", name);
}

export default WishModal;
