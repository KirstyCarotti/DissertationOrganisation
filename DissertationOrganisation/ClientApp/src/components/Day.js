import React, { useEffect, useState } from 'react'
import './Habit.css';
import ShowHabits from './ShowHabits.js';


const Day = (props) => {

    const { id, info } = props; 
    const [todaysHabits, setTodaysHabits] = useState([]);
    const [day, setDay] = useState(id + 1 < info.startDayOfMonth? null :id + 1 == info.startDayOfMonth ? 1 : id + 2 - info.startDayOfMonth > 0 && id + 2 - info.startDayOfMonth <= info.daysInMonth ? (id + 2 - info.startDayOfMonth).toString() : null)

    const [month, setMonth] = useState(info.currentDate.split('-')[1].toString())
    const [year, setYear] = useState(info.currentDate.split('-')[0].toString())

    const [date, setDate] = useState(day!=null? year + "-" + month + "-" + day : null);
    useEffect(() => {
        if (date != null) {
            fetch('http://kistee/api/dateTimeHabit/',
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: 0,
                        date: date
                    })
                })
                .then(res => res.json())
                .then(response =>
                    setTodaysHabits(response)
                )
                .catch(e => console.log(e));
        }
    }, [info])

    const currentDay = id + 2 - info.startDayOfMonth == parseInt(info.currentDate.split('-')[2].split('T')[0]);
 
    if (id + 1 < info.startDayOfMonth) {
        return (
            <td className="noDate" />
        )
    }
    else if (id + 1 == info.startDayOfMonth) {
        return (
            <td className={currentDay ? "currentDay" : ""}>
                <ShowHabits info={todaysHabits} />
                1
            </td>
        )
    } else {
        if (id + 2 - info.startDayOfMonth <= info.daysInMonth && id + 2 - info.startDayOfMonth > 0 ) {
            return (
                <td className={currentDay ? "currentDay" : ""} >
                    <ShowHabits info={todaysHabits} />
                    {id + 2 - info.startDayOfMonth}
                </td>
            )
        } else {
            return <td className="noDate" />
        }
    }
    

    return (
            <p> ugefewgfiuwe </p>
        )
    


}
export default Day