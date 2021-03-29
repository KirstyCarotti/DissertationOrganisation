import React, { useEffect, useState } from 'react'
import './Habit.css';
import {
    Label,
    Input,
    FormGroup
} from 'reactstrap';

 const RepeatDayOption = (props) => {
     const { id, text, repeatDays, setRepeatDays} = props;
     const [isChecked, setIsChecked] = useState(false);

     useEffect(() => {
         for (var i = 0; i < repeatDays.length; i++) {
             if (repeatDays[i].id == id) {
                 setIsChecked(true);
             }
         }

     }, [])

     function handleChange(e) {
         var newState = 0;
         if (e.target.name == "complete") {
             if (!isChecked) {
                 setIsChecked(true)
                 setRepeatDays(repeatDays.concat(id))
             } else {
                 setIsChecked(false)
                 for (var i = 0; i < repeatDays.length; i++) {

                     if (repeatDays[i] === id) {

                         repeatDays.splice(i, 1);
                     }

                 }
             }
         }
     }

         return (
             <div>
                <Input type="checkbox" name="complete" checked={isChecked} onChange={handleChange} id={id} />
                <p className="day">
                    {text}
                </p>
             </div>
         )


     }
export default RepeatDayOption