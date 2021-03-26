import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap';
import './Habit.css';

 const HabitCalendar = (props) => {

     const [habitDateInformation, setHabitDateInformation] = useState(null);
     const [success, setSuccess] = useState(false);

     useEffect(() => {
         fetch('https://localhost:44388/api/dateTimehabit/',
             {
                 method: "Get",
                 headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                 }
             })
             .then(res => res.json())
             .then(response => {
                 setHabitDateInformation(response);
                 setSuccess(true);
             })
             .catch(e => console.log(e));



     }, [])

     console.log(habitDateInformation)

     if (success) {
         return (
             <div className="calendar">
                 <Table>
                     <thead>
                         <tr>
                             <th />
                             <th />
                             <th />
                             <th >{habitDateInformation.month}</th>
                             <th />
                             <th />
                             <th />
                         </tr>
                     </thead>
                 </Table>
                 <Table>
                     <tbody>
                         
                     </tbody>
                 </Table>
             </div>
         )
     }
     else {
         return <p> Error loading Habits </p>
     }
     

}
export default HabitCalendar