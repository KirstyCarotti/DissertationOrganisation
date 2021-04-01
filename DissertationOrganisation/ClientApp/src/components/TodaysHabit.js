import React, { useEffect, useState } from 'react'
import './Habit.css';
import {
    Input,
} from 'reactstrap';

 const TodaysHabit = (props) => {
     const { id, name, isComplete, needUpdate, currentUpdate} = props;
     const [isChecked, setIsChecked] = useState(isComplete);

     const [habit, setHabit] = useState([])





     function handleChange(e) {
         var state = false;
             if (isChecked) {
                 state =false
             } else {
                 state = true; 
             }       

         fetch('https://localhost:44388/api/todaysHabits/',
             {
                 method: "Post",
                 headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({
                     id: id,
                     name: name,
                     isComplete: state
                 }),
             })
             .then(setIsChecked(!isChecked))
             .catch(e => console.log(e));
     }

    

 


         return (
             <div>
                 <Input type="checkbox" name="complete" checked={isChecked} onChange={handleChange} id={id} />
                 <p className="day">
                     {name}

                 </p>
             </div>
         )
     }
export default TodaysHabit