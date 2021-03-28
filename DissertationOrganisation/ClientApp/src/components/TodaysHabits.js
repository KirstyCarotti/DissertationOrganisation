import React, { useEffect, useState } from 'react'
import './Habit.css';

const TodaysHabits = (props) => {


    const [todaysHabits, setTodaysHabits] = useState([]);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetch('https://localhost:44388/api/todaysHabits/',
            {
                method: "Get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .then(response => {
                setTodaysHabits(response);
                setSuccess(true);
            })
            .catch(e => console.log(e));



    }, [])

    console.log(todaysHabits)

    if (success) {
        return (
            <div className="todaysHabits">
                <p> hi </p>
            </div>
        )
    }
    return (<p> loading </p>)


}
export default TodaysHabits