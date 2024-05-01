import { Match, Switch, type Component } from 'solid-js';
import { ClientProviderResponse, useClient } from './Client';
import { modalEvents } from '../scripts/modal';
import { hasWished } from '../scripts/wished';

const WishButton: Component = () => {
    return (
        <div class="w-96 flex items-center justify-center mt-10">
            <button
                onclick={() => onWishClick()}
                class="h-16 w-56 bg-white rounded-2xl shadow-two"
            >
                <Switch>
                    <Match when={hasWished()}>
                        <p class="font-semibold tracking-widest text-3xl text-[var(--pastel-yellow)]">
                            {"Thank you <3"}
                        </p>
                    </Match>
                    <Match when={!hasWished()}>
                        <p class="font-semibold tracking-widest text-3xl text-[var(--pastel-yellow)]">
                            Wish Birthday
                        </p>
                    </Match>
                </Switch>
            </button>
        </div>
    )
}

const onWishClick = () => {
    if (hasWished()) {
        return;
    }

    modalEvents.send("open_name_modal");
}


export default WishButton;
