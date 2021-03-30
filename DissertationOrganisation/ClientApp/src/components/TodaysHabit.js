import React, { useEffect, useState } from 'react'
import './Habit.css';
import {
    Input,
} from 'reactstrap';

 const TodaysHabit = (props) => {
     const { id, name, isComplete } = props;
     const [isChecked, setIsChecked] = useState(isComplete);

     function handleChange(e) {
         var state = false;
             if (isChecked) {
                 state =false
             } else {
                 state = true; 
             }
         
         console.log(state)

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
             .then()
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