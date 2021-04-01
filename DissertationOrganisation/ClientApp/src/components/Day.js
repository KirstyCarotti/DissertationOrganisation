import React, { useEffect, useState } from 'react'
import './Habit.css';

const Day = (props) => {

    const { id, info, isFirstRow } = props; 

    const currentDay = id + 1 == info.startDayOfMonth; 
 
    if (id + 1 < info.startDayOfMonth) {
        return (
            <td className="noDate" />
        )
    }
    else if (id + 1 == info.startDayOfMonth) {
        return (
            <td className={currentDay ? "currentDay" : ""}>1</td>
        )
    } else {
        if (id + 2 - info.startDayOfMonth <= info.daysInMonth && id + 2 - info.startDayOfMonth > 0 ) {
            return (
                <td className={currentDay ? "currentDay" : ""} >{id + 2 - info.startDayOfMonth} </td>
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