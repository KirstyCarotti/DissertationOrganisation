import React, { useEffect, useState } from 'react'
import {
    Input
} from 'reactstrap';
import './Habit.css';


const ShowHabit = (props) => {
    const { habit } = props; 

    return (
        <div>
            <div className="circle" style={{ backgroundColor: habit.colour }}>
                <div className={habit.isComplete? "": "miniCircle"}/>
            </div>
        </div>
        
    )
}
export default ShowHabit