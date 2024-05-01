import { type Component } from 'solid-js';

const Title: Component = () => {
    return (
        <div class="mb-6 flex flex-col items-center">
            <h1 class="poppins w-[28rem] text-center text-4xl font-bold text-white">
                Shelley's birthday is just around the corner!
            </h1>
            <hr class="border-t-4 border-white w-80 mt-6"/>
        </div>
    )
}

export default Title;
