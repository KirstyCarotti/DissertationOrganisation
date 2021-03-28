import React, { useEffect, useState } from 'react'
import './Habit.css';

const HabitInKey = (props) => {

    const { id, habit } = props;

    console.log(habit)
    //https://eager.io/blog/communicating-between-javascript-and-css-with-css-variables/
    //talk about this in write up 

    return (
        <div>
            <span className="habitCol" style={{ backgroundColor: habit.colour }}>&nbsp;&nbsp;&nbsp;</span>
            <div className ="habitName">{habit.name}</div>
        </div>
        )
    


}
export default HabitInKey