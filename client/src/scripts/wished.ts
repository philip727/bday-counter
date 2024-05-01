import { createSignal } from "solid-js";

const HAS_WISHED_KEY = "has_wished"

export const [isBirthday, setIsBirthday] = createSignal(false);
export const [hasWished, setHasWished] = createSignal(false);

export const checkIfAlreadyWished = () => {
    setHasWished(localStorage[HAS_WISHED_KEY]);
}

export const updateWished = (has: boolean) => {
    localStorage[HAS_WISHED_KEY] = has;
    setHasWished(has);
}
