import { For, createSignal, type Component } from 'solid-js'
import { ClientProviderResponse, useClient } from './Client';
import WishNotification from './WishNotification';

type ServerReceivedWishes = {
    totalWishes: number,
    names: Array<string>
}

const ReceivedWishes: Component = () => {
    const [wishes, setWishes] = createSignal<ServerReceivedWishes>({ names: [], totalWishes: 0 });
    const [client] = useClient() as ClientProviderResponse;

    client().emit("get_total_wishes");

    client().on("total_wishes", (data: ServerReceivedWishes) => {
        setWishes(data);
    })

    return (
        <div class="w-full flex flex-col justify-center items-center">
            <h1
                class="text-7xl font-bold text-center text-white mb-4 poppins w-[40rem]"
            >
                HAPPY BIRTHDAY SHELLEY!!!
            </h1>
            <p class="text-4xl font-bold tracking-widest text-center text-white">
                {"Thank you <3"}
            </p>
            <div class="overflow-y-scroll h-72 w-96 p-2 flex flex-col gap-4 no-scrollbar justify-start items-center mt-4">
                <For each={wishes().names}>
                    {(name) => (
                        <WishNotification name={name} />
                    )}
                </For>
            </div>
        </div>
    )
}

export default ReceivedWishes;
