import { useState } from 'react';
import {
    format,
    startOfMonth,
    startOfWeek,
    endOfMonth,
    endOfWeek,
    addMonths,
    addWeeks,
    subWeeks,
    eachDayOfInterval,
    eachWeekOfInterval,
    set,
} from 'date-fns';
import CalendarDay from './day';
import { ca } from 'date-fns/locale';



function EventCalendar() {
    const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(new Date()));
    const [activeWeek, setActiveWeek] = useState<number>(0);
    const [events, setEvents] = useState<Array<any>>([]);

    function incrementMonth() {
        setCurrentMonth(addMonths(currentMonth, 1));
    }

    function decrementMonth() {
        setCurrentMonth(addMonths(currentMonth, -1));
    }

    function onDrop(callingDay: string | null, droppedDay: Date) {

        if (!droppedDay || !callingDay) return;

        let r = confirm("are you sure ?")
        if (!r) return;

        let droppedWeek = startOfWeek(new Date(droppedDay))
        let callingWeek = startOfWeek(new Date(callingDay))
        let diffWeeks = -callingWeek.getTime() + droppedWeek.getTime();
        diffWeeks = diffWeeks / (1000 * 3600 * 24 * 7);

        let newEvents = [...events];
        for (let event = 0; event < events.length; event++) {
            const element = newEvents[event];
            console.log(startOfWeek(element.date), callingWeek);
            console.log(startOfWeek(element.date).getTime() === callingWeek.getTime());
            // console.log(startOfWeek(element.date))
            // console.log(callingWeek);
            if (startOfWeek(element.date).getTime() === callingWeek.getTime()) {
                console.log(element);
                element.date = addWeeks(element.date, diffWeeks)
            }
        }
        setEvents(newEvents);
    }

    return (
        <div className='bg-gray-400 w-full'>
            {/* <h1>Event Calendar</h1> */}
            <div className='grid grid-flow-row w-full p-8 '>
                <div className='grid grid-cols-7 h-10 text-center mr-10 '>
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
                        <div key={index} draggable onDragOver={(e) => { e.preventDefault() }} onDragStart={(e) => e.dataTransfer.setData('day', day.toDateString())} onDrop={(e) => { onDrop(e.dataTransfer.getData('day'), day) }} onDragEnd={(e) => { e.preventDefault(); }}
                            className={`grid grid-cols-1 sm:grid-cols-4 md:grid-cols-7 min-h-[9rem] relative mr-10 z-10 ${index === activeWeek ? 'h-fit' : 'h-36'} transition-all duration-700`}
                            onClick={() => setActiveWeek(index)} data-date={day}>

                            {eachDayOfInterval({ start: startOfWeek(day), end: endOfWeek(day) }).map((day, ind) => {
                                return (
                                    <CalendarDay key={ind} day={day} events={events} setEvents={setEvents} />
                                )
                            })}
                            {/* copy button */}
                            <button className='bg-slate-900 text-white p-2 m-2 rounded-lg absolute left-[100%]' onClick={() => {
                                navigator.clipboard.writeText(JSON.stringify(events.filter((event) => startOfWeek(event.date).getTime() === startOfWeek(day).getTime())))
                                console.log(events.filter((event) => startOfWeek(event.date).getTime() === startOfWeek(day).getTime()));
                            }}>copy</button>
                            <button className='bg-slate-900 text-white p-2 m-2 rounded-lg absolute left-[100%] bottom-0' onClick={() => {
                                setEvents(events.filter((event) => startOfWeek(event.date).getTime() !== startOfWeek(day).getTime()))
                            }}>delete</button>
                        </div>
                    )
                })}
            </div>
            <button className='bg-slate-900 text-white p-2 m-2 rounded-lg' onClick={decrementMonth}>prev month</button>
            <button className='bg-slate-900 text-white p-2 m-2 rounded-lg' onClick={incrementMonth}>next month</button>
        </div >
    )
}

export default EventCalendar;