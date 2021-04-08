import React, { useEffect, useState } from 'react'
import './Habit.css';
import {
    Input, Label,
} from 'reactstrap';
import BlockInput  from './BlockInput.js';

 const TodaysHabit = (props) => {
     const { id, name, isComplete, isMeasurable, numberOfBlocks, numberOfBlocksCompleted, needUpdate, currentUpdate} = props;
     const [isChecked, setIsChecked] = useState(isComplete);

     const [blocks, setBlocks] = useState([])



     useEffect(() => {
         var blockTemp = [];
         var completed = numberOfBlocksCompleted;
         if (numberOfBlocksCompleted > numberOfBlocks) {
             completed = numberOfBlocks;
         }
         for (var i = 0; i < numberOfBlocks; i++) {
             if (i < completed) {
                 blockTemp.push({ completed: true , id: i});
             } else {
                 blockTemp.push({ completed: false, id: i})
             }
         }
         setBlocks(blockTemp)
     }, [numberOfBlocksCompleted])


     function handleChange(e) {


             var state = false;
             if (isChecked) {
                 state = false
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
                 .then(needUpdate(!currentUpdate))
                 .catch(e => console.log(e));
         
     
     }

     if (!isMeasurable) {
         return (
             <div>
                 <Input type="checkbox" name="complete" checked={isChecked} onChange={handleChange} id={id} />
                 <p className="day">
                     {name}

                 </p>
             </div>
         )
     } else {
         return (
             <div className="measurableHabit">
                 <p className="day">
                     {name}
                 </p>
                 
                 {blocks.map(block =>
                     <div key={block.id} >
                         <BlockInput name={name} numberOfBlocksCompleted={numberOfBlocksCompleted} completed={block.completed} id={id} needUpdate={needUpdate} currentUpdate={currentUpdate} />
                     </div>
                     )}
                </div>
         )
     }
     }
export default TodaysHabit