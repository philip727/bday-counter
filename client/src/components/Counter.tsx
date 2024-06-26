import { For, createSignal, type Component } from 'solid-js';
import { setIsBirthday } from '../scripts/wished';

// The actual total in that unit of time
type AbsoluteTime = {
    seconds: number,
    minutes: number,
    hours: number,
    days: number,
}

type TimeUntil = {
    seconds: number,
    minutes: number,
    hours: number,
    days: number,
}

const Counter: Component = () => {
    const now = new Date();
    const targetYear = now.getFullYear();
    const targetDate = new Date(`${targetYear.toString()}-05-11`)
    const [timeUntil, setTimeUntil] = createSignal<TimeUntil>(getTimeUntil(targetDate).until);

    setInterval(() => {
        const timeLeft = getTimeUntil(targetDate);
        setTimeUntil(timeLeft.until);
    }, 1000);

    return (
        <div class="w-96 flex flex-row justify-center items-center text-center text-white gap-8">
            <div>
                <p class="text-7xl font-bold tracking-widest">
                    {timeUntil().days.toString().padStart(2, "0")}
                </p>
                <p class="font-semibold text-xl poppins">days</p>
            </div>
            <h1 class="poppins text-7xl">:</h1>
            <div>
                <p class="text-7xl font-bold tracking-widest">
                    {timeUntil().hours.toString().padStart(2, "0")}
                </p>
                <p class="font-semibold text-xl poppins">hours</p>
            </div>
            <h1 class="poppins text-7xl">:</h1>
            <div>
                <p class="text-7xl font-bold tracking-widest">
                    {timeUntil().minutes.toString().padStart(2, "0")}
                </p>
                <p class="font-semibold text-xl poppins">minutes</p>
            </div>
            <h1 class="poppins text-7xl">:</h1>
            <div>
                <p class="text-7xl font-bold tracking-widest">
                    {timeUntil().seconds.toString().padStart(2, "0")}
                </p>
                <p class="font-semibold text-xl poppins">seconds</p>
            </div>
        </div>
    )
}

// gets the time until x date
const getTimeUntil = (targetDate: Date): { absolute: AbsoluteTime, until: TimeUntil } => {
    const now = new Date();
    // tell us its the birthday
    if (now.getDate() == targetDate.getDate()
        && now.getMonth() == targetDate.getMonth()) {
        setIsBirthday(true);
    }

    const timeResult: { absolute: AbsoluteTime, until: TimeUntil }
        =
    {
        absolute: {
            seconds: 0,
            minutes: 0,
            hours: 0,
            days: 0
        },
        until: {
            seconds: 0,
            minutes: 0,
            hours: 0,
            days: 0
        }
    };

    const difference = targetDate.getTime() - now.getTime();

    const totalSeconds = Math.floor(difference / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    timeResult.absolute.seconds = totalSeconds;
    timeResult.absolute.minutes = totalMinutes;
    timeResult.absolute.hours = totalHours;
    timeResult.absolute.days = totalDays;

    timeResult.until.days = totalDays;
    timeResult.until.hours = totalHours % 24;
    timeResult.until.minutes = totalMinutes % 60;
    timeResult.until.seconds = totalSeconds % 60;

    return timeResult;
}


export default Counter;
