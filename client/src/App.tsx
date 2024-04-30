import type { Component } from 'solid-js';
import Counter from './components/Counter';
import WishButton from './components/WishButton';
import { createClient } from './scripts/client';
import { ClientProvider } from './components/Client';
import WishNotifier from './components/WishNotifier';
import WishModal from './components/WishModal';

const App: Component = () => {
    const client = createClient("127.0.0.1:4000");

    return (
        <ClientProvider client={client}>
            <div>
                <Counter />
                <WishButton />
                <WishNotifier />
            </div>
            <WishModal />
        </ClientProvider>
    );
};

export default App;
