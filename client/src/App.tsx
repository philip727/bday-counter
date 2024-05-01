import type { Component } from 'solid-js';
import Counter from './components/Counter';
import WishButton from './components/WishButton';
import { createClient } from './scripts/client';
import { ClientProvider } from './components/Client';
import WishNotifier from './components/WishNotifier';
import WishModal from './components/WishModal';
import Title from './components/Title';

const App: Component = () => {
    const client = createClient("127.0.0.1:4000");

    return (
        <ClientProvider client={client}>
            <div class="absolute top-0 left-0 w-screen h-full flex flex-col justify-center items-center">
                <Title />
                <Counter />
                <WishButton />
            </div>
            <WishNotifier />
            <WishModal />
        </ClientProvider>
    );
};

export default App;
