import { format, set } from "date-fns";

interface CalendarDayProps {
    day: Date;
    events: Array<any>;
    setEvents: Function;
}

function CalendarDay(props: CalendarDayProps) {
    const { day, events, setEvents } = props;

    function handleKeyPress(e: any) {
        if (e.key === 'Enter') {
            const newEvent = {
                id: Date.now(),
                title: e.target.value,
                date: day
            }
            setEvents([...events, newEvent])
            e.target.value = ''
        }
    }

    return (
        <div className='border border-gray-900 p-2 h-full overflow-hidden ' data-date={day}>
            {format(day, 'dd')}
            {/* <p contentEditable className="py-2">edit here</p> */}
            <input className="py-2 w-full rounded-sm" type="text" placeholder="edit here" data-date={day} onKeyUp={handleKeyPress} />
            <ul>
                {events.filter((event) => event.date.getTime() === day.getTime()).map((event, index) => (
                    <li key={index} className="shadow-md p-2 m-2 bg-gray-500  rounded-sm relative " data-date={day}>{event.title}
                        <button className="absolute top-0 right-0 bg-red-800 px-1 rounded-md pointer-events-auto"
                            onClick={() => { setEvents(events.filter((e) => e.id !== event.id)) }}
                            data-date={day}
                        >x</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CalendarDay;