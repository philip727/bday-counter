import { For, createSignal, type Component } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { ClientProviderResponse, useClient } from './Client';

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

    setInterval(() => {
        for (let i = 0; i < wishes.length; i++) {
            const wish = wishes[i];
            const curTime = Math.floor(Date.now() / 1000);
            const time_since = curTime - wish.time;

            if (time_since > 5) {
                setWishes(produce(prev => prev.splice(i, 1)));
            }
        }
    }, 500)

    return (
        <div>
            <For each={wishes}>
                {(wish) =>
                    <div>
                        {wish.name}
                    </div>
                }
            </For>
        </div>
    )
}


export default WishNotifier;
