import { Show, createSignal, type Component } from 'solid-js';
import { Portal } from 'solid-js/web';
import { modalEvents } from '../scripts/modal';

const WishModal: Component = () => {
    const [name, setName] = createSignal("");

    modalEvents.on("open_name_modal", () => {
        console.log("hay");
    })


    return (
        <Show when={false}>
            <Portal>
                <div class="absolute">
                    <input id="name-input" value="" placeholder="Your name" />
                </div>
            </Portal>
        </Show>
    )
}

export default WishModal;
