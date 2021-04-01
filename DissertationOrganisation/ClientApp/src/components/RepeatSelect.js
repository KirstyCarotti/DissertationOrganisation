import React, { useEffect, useState } from 'react'
import './Habit.css';
import {
    Label,
    Input
} from 'reactstrap';

 const RepeatSelect = (props) => {
     const { setIsVisible, repeat, setRepeat } = props; 
     const [repeatValues, setRepeatValues] = useState([]);

     useEffect(() => {
             fetch('https://localhost:44388/api/repeat/',
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

         if (repeat == 2) {
             setIsVisible(true)
         }

     }, [])

     function onChange(event) {
         const target = event.target;
         setRepeat(target.options.selectedIndex);

         if (target.options.selectedIndex == 2) {
             setIsVisible(true)
         } else {
             setIsVisible(false)
         }
     }

         return (
             <Input type="select" name="reapeatSelect" onChange={onChange}>
                 {repeatValues.map(value =>
                     <option selected={ value.id == repeat? true : false} key={value.id} id={value.id}>{value.repeat}</option>
                     )}; 
                 </Input>
         )
     

}
export default RepeatSelect