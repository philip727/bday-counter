import { For, createSignal, type Component } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { ClientProviderResponse, useClient } from './Client';
import { Portal } from 'solid-js/web';
import WishNotification from './WishNotification';

type Wish = {
    name: string,
    time: number,
}


const WishNotifier: Component = (props: any) => {
    const [client] = useClient() as ClientProviderResponse;
    const [wishes, setWishes] = createStore<Array<Wish>>([]);

    client().on("new_wish", (name) => {
        console.log(`${name} wished a happy birthday`);

        const curTime = Math.floor(Date.now() / 1000);

        setWishes(produce(prev => prev.push({ name: name, time: curTime })));
    })

    client().on("stored_wishes", (wishes: Array<Wish>) => {
        wishes.forEach(wish => {
            console.log(wish);
            setWishes(produce(prev => prev.push(wish)));
        })
    })

    setInterval(() => {
        for (let i = 0; i < wishes.length; i++) {
            const wish = wishes[i];
            const curTime = Math.floor(Date.now() / 1000);
            const time_since = curTime - wish.time;

            if (time_since > 20) {
                setWishes(produce(prev => prev.splice(i, 1)));
            }
        }
    }, 500)

    return (
        <div class="absolute bottom-0 left-0 w-72 h-full 
            flex flex-col justify-end items-center pl-4 pb-4 gap-4">
            <For each={wishes}>
                {(wish) =>
                    <WishNotification name={wish.name} />
                }
            </For>
        </div>
    )
}


export default WishNotifier;
