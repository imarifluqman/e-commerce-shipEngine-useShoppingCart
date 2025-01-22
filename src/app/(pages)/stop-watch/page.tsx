"use client"
import React, { useState, useRef } from 'react';
function Page() {
    const [time, setTime] = useState({
        sec: 0,
        min: 0,
        hour: 0
    })

    const intervalRef = useRef<NodeJS.Timeout | null>(null);


    function timer() {
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                setTime((t) => {
                    if (t.sec === 59) {
                        if (t.min === 59) {
                            return { sec:t.sec,min:0, hour: t.hour + 1 }
                        } else {
                            return { sec:0, min: t.min + 1,hour:t.hour}
                        }
                    } else {
                        return { sec: t.sec + 1,min:t.min,hour:t.hour}
                    }
                })
            }, 1000);
        }

    }

    function stopTimer() {

        clearInterval(intervalRef.current as NodeJS.Timeout);
        intervalRef.current = null;
    }

    function resetTimer() {
        stopTimer(); // Clear the interval
        setTime({ min: 0, sec: 0, hour: 0 })

    }

    return (
        <div className="w-full h-[100vh] flex flex-col justify-center items-center">
            <h1 className='my-10 text-3xl'>Stop Watch</h1>
            <div className="flex justify-center items-center my-10">
                <p className='text-2xl mx-2'>H : {time.hour}</p>
                <p className='text-2xl mx-2'>M : {time.min}</p>
                <p className='text-2xl mx-2'>S : {time.sec}</p>
            </div>
            <div className="flex justify-center items-center my-10">
                <button
                    className='border border-green-600 px-5 py-2 mx-5'
                    onClick={timer}
                >
                    Start
                </button>
                <button
                    className='border border-green-600 px-5 py-2 mx-5'
                    onClick={stopTimer}
                >
                    Stop
                </button>
                <button
                    className='border border-green-600 px-5 py-2 mx-5'
                    onClick={resetTimer}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default Page;
