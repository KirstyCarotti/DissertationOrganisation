import React, { useEffect, useState } from 'react'
import './Habit.css';
import HabitInKey from './HabitInKey.js';

 const HabitKey = (props) => {
     const { update, setUpdate } = props;
     const [habits, setHabits] = useState([]);
     const [success, setSuccess] = useState(false);

     useEffect(() => {
         fetch('https://localhost:44388/api/habits/',
             {
                 method: "Get",
                 headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                 }
             })
             .then(res => res.json())
             .then(response => {
                setHabits(response);
                 setSuccess(true);
             })
             .catch(e => console.log(e));
     }, [update])

     console.log(habits)
     if (success) {
         return (
             <div className="key">
                 <div className="titleSection">
                     <h3>Key</h3>
                 </div>
                 <div className="bodySection">
                     {habits.map(habit => <HabitInKey key={habit.id} habit={habit} update={update} setUpdate={setUpdate} />)}
                 </div>
             </div>
         )
     }
     else {
         return <p> Error loading Habits </p>
     }
     

}
export default HabitKey