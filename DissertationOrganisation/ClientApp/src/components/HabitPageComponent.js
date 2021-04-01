import React, { useEffect, useState } from 'react'
import './Habit.css';
import HabitCalendar from './HabitCalendar.js';
import HabitKey from './HabitKey.js';
import TodaysHabits from './TodaysHabits.js';

const HabitPageComponent = (props) => {

    const [update, setUpdate] = useState(false);
    return (
        <span>
            <div className="habitContainer">
                <HabitCalendar update={update} setUpdate={setUpdate}/>
                <TodaysHabits currentUpdate={update} needUpdate={setUpdate} />
            </div>
            <HabitKey update={update} setUpdate={setUpdate}/>
        </span>
    );
    


}
export default HabitPageComponent