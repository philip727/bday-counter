import { createSignal, type Component } from 'solid-js';

const Counter: Component = () => {
    const [timeUntil, setTimeUntil] = createSignal("");

    setInterval(() => {
        const now = new Date();
        const targetYear = now.getFullYear();
        const targetDate = `${targetYear.toString()}-05-11`
        const timeLeft = getTimeUntil(targetDate);

        setTimeUntil(timeLeft);
    }, 1000);

    return (
        <div>
            <h1>{timeUntil()}</h1>
        </div>
    )
}

/// Gets the formatted string until [date]
const getTimeUntil = (targetDate: string): string => {
    const now = new Date();

    const futureDate = new Date(targetDate);
    const difference = futureDate.getTime() - now.getTime();

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const absoluteDays = days > 0 ? days.toString() : "";
    const absoluteHours = hours % 24 > 0 ? (hours % 24).toString().padStart(2, "0") : "";
    const absoluteMinutes = minutes % 60 > 0 ? (minutes % 60).toString().padStart(2, "0") : "";
    const absoluteSeconds = seconds % 60 > 0 ? (seconds % 60).toString().padStart(2, "0") : "";

    // Format the time into strings
    const timeLeft = [absoluteDays, absoluteHours, absoluteMinutes, absoluteSeconds]
        .filter(part => part !== "")
        .join(":");

    return timeLeft
}


export default Counter;
