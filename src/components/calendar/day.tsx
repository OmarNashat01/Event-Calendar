import { format } from "date-fns";

interface CalendarDayProps {
    day: Date;
}

function CalendarDay(props: CalendarDayProps) {
    const { day } = props;
    return (
        <div className='border border-gray-900 p-2 h-full overflow-hidden'>
            {format(day, 'dd')}
            <p contentEditable className="py-2">edit here</p>
        </div>
    )
}

export default CalendarDay;