import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap';
import Day from './Day.js';
import './Habit.css';

 const HabitCalendar = (props) => {
     const { update, setUpdate } = props;
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



     }, [update])


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
                     <thead>
                         <tr>
                             <th>Monday</th>
                             <th>Tuesday</th>
                             <th>Wednesday</th>
                             <th>Thursday</th>
                             <th>Friday</th>
                             <th>Saturday</th>
                             <th>Sunday</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr>
                             <Day id={0} info={habitDateInformation}   />
                             <Day id={1} info={habitDateInformation}   />
                             <Day id={2} info={habitDateInformation}   />
                             <Day id={3} info={habitDateInformation}   />
                             <Day id={4} info={habitDateInformation}   />
                             <Day id={5} info={habitDateInformation}   />
                             <Day id={6} info={habitDateInformation}   />
                         </tr>
                         <tr>
                             <Day id={7} info={habitDateInformation}   />
                             <Day id={8} info={habitDateInformation}   />
                             <Day id={9} info={habitDateInformation}   />
                             <Day id={10} info={habitDateInformation}   />
                             <Day id={11} info={habitDateInformation}   />
                             <Day id={12} info={habitDateInformation}   />
                             <Day id={13} info={habitDateInformation}   />
                         </tr>
                         <tr>
                             <Day id={14} info={habitDateInformation}   />
                             <Day id={15} info={habitDateInformation}   />
                             <Day id={16} info={habitDateInformation}   />
                             <Day id={17} info={habitDateInformation}   />
                             <Day id={18} info={habitDateInformation}   />
                             <Day id={19} info={habitDateInformation}   />
                             <Day id={20} info={habitDateInformation}   />
                         </tr>
                         <tr>
                             <Day id={21} info={habitDateInformation}   />
                             <Day id={22} info={habitDateInformation}   />
                             <Day id={23} info={habitDateInformation}   />
                             <Day id={24} info={habitDateInformation}   />
                             <Day id={25} info={habitDateInformation}   />
                             <Day id={26} info={habitDateInformation}   />
                             <Day id={27} info={habitDateInformation}   />
                         </tr>
                         <tr>
                             <Day id={28} info={habitDateInformation}   />
                             <Day id={29} info={habitDateInformation}   />
                             <Day id={30} info={habitDateInformation}   />
                             <Day id={31} info={habitDateInformation}   />
                             <Day id={32} info={habitDateInformation}   />
                             <Day id={33} info={habitDateInformation}   />
                             <Day id={34} info={habitDateInformation}   />
                         </tr>
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