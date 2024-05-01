import type { Component } from 'solid-js'

type NotificationProps = {
    name: string
}

const WishNotification: Component<NotificationProps> = (props) => {
    return (
        <div class="w-72 h-14 flex items-center justify-start 
            bg-[var(--pastel-blue)] rounded-2xl shadow-two pl-4">
            <p class="text-white text-xl tracking-wide">
                {`${props.name} wished a happy birthday 🎉`}
            </p>
        </div>
    )
}

export default WishNotification;
