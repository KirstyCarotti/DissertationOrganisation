import React, { useEffect, useState } from 'react'
import {
    Input
} from 'reactstrap';
import ShowHabit from './ShowHabit.js';

const ShowHabits = (props) => {
    const { info } = props; 
    if (info.length == 0) {
        return (
            <p> </p>)
    }
    return (
        <div className= "showHabits">
            {info.map(habit => 
                <ShowHabit key={habit.id} habit={habit} />  
        )}   
        </div>
    )
}
export default ShowHabits