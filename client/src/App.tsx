import { Match, Show, Switch, type Component } from 'solid-js';
import Counter from './components/Counter';
import WishButton from './components/WishButton';
import { createClient } from './scripts/client';
import { ClientProvider } from './components/Client';
import WishNotifier from './components/WishNotifier';
import WishModal from './components/WishModal';
import Title from './components/Title';
import { checkIfAlreadyWished, isBirthday } from './scripts/wished';
import ReceivedWishes from './components/ReceivedWishes';

const App: Component = () => {
    const client = createClient("127.0.0.1:4000");

    // Checks if we've already wished
    checkIfAlreadyWished();

    return (
        <ClientProvider client={client}>
            <Switch>
                <Match when={!isBirthday()}>
                    <div class="absolute top-0 left-0 w-screen h-full flex flex-col justify-center items-center">
                        <Title />
                        <Counter />
                        <WishButton />
                    </div>
                    <WishNotifier />
                    <WishModal />
                </Match>
                <Match when={isBirthday()}>
                    <div class="absolute top-0 left-0 w-screen h-full flex flex-col justify-center items-center">
                        <ReceivedWishes />
                    </div>
                </Match>
            </Switch>
        </ClientProvider>
    );
};

export default App;
