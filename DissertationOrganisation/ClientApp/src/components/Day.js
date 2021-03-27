import React, { useEffect, useState } from 'react'
import './Habit.css';

const Day = (props) => {

    const { id, info, isFirstRow } = props; 
    console.log(id, info, isFirstRow)

    const currentDay = id + 1 == info.currentDate.split('T')[0].split('-')[2]; 

    if (isFirstRow) {
        if (id + 1 < info.startDay) {
            return (
                <td className="noDate" />
            )
        }
        else if (id + 1 == info.startDayOfMonth) {
            return (
                <td className={currentDay ? "currentDay" : ""}>1</td>
            )
        } else {
            if (id + 2 - info.startDayOfMonth <= info.daysInMonth) {
                return (
                    <td className={currentDay ? "currentDay" : ""} >{id + 2 - info.startDayOfMonth} </td>
                )
            } else {
                return <td className="noDate" />
            }
        }
    } 

    return (
            <p> ugefewgfiuwe </p>
        )
    


}
export default Day