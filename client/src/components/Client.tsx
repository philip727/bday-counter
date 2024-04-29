import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Accessor, JSXElement, createContext, createSignal, useContext } from "solid-js";

const ClientContext = createContext();

type ClientProviderProps = {
    client: Socket<DefaultEventsMap, DefaultEventsMap>,
    children: JSXElement
}

export type ClientProviderResponse = [
    Accessor<Socket<DefaultEventsMap, DefaultEventsMap>>
]


const ClientProvider = (props: ClientProviderProps) => {
    const [client, setClient] = createSignal(props.client || null),
        sock = [
            client
        ]

    return (
        <ClientContext.Provider value={sock}>
            {props.children}
        </ClientContext.Provider>
    );
}

export function useClient() { return useContext(ClientContext); };
export { ClientProvider };
