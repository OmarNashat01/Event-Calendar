import { useState } from 'react';
import {
    format,
    startOfMonth,
    startOfWeek,
    endOfMonth,
    endOfWeek,
    addMonths,
    eachDayOfInterval,
    eachWeekOfInterval,
} from 'date-fns';
import CalendarDay from './day';



function EventCalendar() {
    const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(new Date()));
    const [activeWeek, setActiveWeek] = useState<number>(0);

    function incrementMonth() {
        setCurrentMonth(addMonths(currentMonth, 1));
    }

    function decrementMonth() {
        setCurrentMonth(addMonths(currentMonth, -1));
    }

    return (
        <div className='bg-gray-400 w-full'>
            {/* <h1>Event Calendar</h1> */}
            <div className='grid grid-flow-row w-full p-8 '>
                <div className='grid grid-cols-7 h-10 text-center '>
                    {eachDayOfInterval({ start: startOfWeek(currentMonth), end: endOfWeek(currentMonth) }).map((day, index) => {
                        return (
                            <div key={index} className='border border-gray-900 p-2'>
                                {format(day, 'EEEE')}
                            </div>
                        )
                    })}
                </div>
                {eachWeekOfInterval({ start: startOfWeek(currentMonth), end: endOfMonth(currentMonth) }).map((day, index) => {
                    return (
                        <div key={index} className={`grid grid-cols-4 md:grid-cols-7 min-h-[9rem] ${index === activeWeek ? 'h-fit' : 'h-36'} transition-all duration-700`} onClick={() => setActiveWeek(index)} >
                            {eachDayOfInterval({ start: startOfWeek(day), end: endOfWeek(day) }).map((day, index) => {
                                return (
                                    <CalendarDay key={index} day={day} />
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            <button className='bg-slate-900 text-white p-2 m-2 rounded-lg' onClick={incrementMonth}>next month</button>
            <button className='bg-slate-900 text-white p-2 m-2 rounded-lg' onClick={decrementMonth}>prev month</button>
        </div>
    )
}

export default EventCalendar;