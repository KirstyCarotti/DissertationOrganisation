import React, { useEffect, useState } from 'react'
import './Habit.css';
import {
    Label,
    Input,
    FormGroup
} from 'reactstrap';
import RepeatDayOption from './RepeatDayOption.js';

 const RepeatDays = (props) => {
     const {isVisible, repeatDays, setRepeatDays } = props; //TODO When editing sent in default select 
     const [repeatValues, setRepeatValues] = useState([]);

     useEffect(() => {
             fetch('https://localhost:44388/api/repeatDays/',
                 {
                     method: "Get",
                     headers: {
                         'Accept': 'application/json',
                         'Content-Type': 'application/json',
                     }
                 })
                 .then(res => res.json())
                 .then(response => {
                     setRepeatValues(response);
                 })
                 .catch(e => console.log(e));


     }, [])

     console.log(repeatDays)
     if (isVisible) {
         return (

             <div className="repeatDays">
                 {repeatValues.map(value =>
                     <RepeatDayOption key={value.id} id={value.id} text={value.repeat} repeatDays={repeatDays} setRepeatDays={setRepeatDays} />
                 )}
             </div>
         )
     }
     else {
         return(<div />)
     }


     }
export default RepeatDays