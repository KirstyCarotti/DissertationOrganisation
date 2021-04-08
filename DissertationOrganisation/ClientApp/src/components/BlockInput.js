import React, { useEffect, useState } from 'react'
import './Habit.css';
import {
    Input, Label,
} from 'reactstrap';

 const BlockInput = (props) => {
     const { name, numberOfBlocksCompleted, completed, id, needUpdate, currentUpdate } = props;
     const [isChecked, setIsChecked] = useState(completed);



     function handleChange(e) {

         const target = e.target;

         var newNumberOfBlocksCompl = 0;
         if (!isChecked) {
                 newNumberOfBlocksCompl = numberOfBlocksCompleted + 1;
             } else {
                 newNumberOfBlocksCompl = numberOfBlocksCompleted - 1;
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
                         isComplete: false,
                         isMeasurable: true,
                         numberOfBlocksCompleted: newNumberOfBlocksCompl

                     }),
                 })
                 .then(needUpdate(!currentUpdate))
                 .then(setIsChecked(!isChecked))
                 .catch(e => console.log(e));
         
     
     }

     return (
         <Input className="fixed" type="checkbox" name="blocks" checked={isChecked} onChange={handleChange} id={id} />
         )
     
     }
export default BlockInput