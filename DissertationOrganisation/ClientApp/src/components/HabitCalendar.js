import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap';
import Day from './Day.js';
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
                             <Day id={0} info={habitDateInformation} isFirstRow={true} />
                             <Day id={1} info={habitDateInformation} isFirstRow={true} />
                             <Day id={2} info={habitDateInformation} isFirstRow={true} />
                             <Day id={3} info={habitDateInformation} isFirstRow={true} />
                             <Day id={4} info={habitDateInformation} isFirstRow={true} />
                             <Day id={5} info={habitDateInformation} isFirstRow={true} />
                             <Day id={6} info={habitDateInformation} isFirstRow={true} />
                         </tr>
                         <tr>
                             <Day id={7} info={habitDateInformation} isFirstRow={true} />
                             <Day id={8} info={habitDateInformation} isFirstRow={true} />
                             <Day id={9} info={habitDateInformation} isFirstRow={true} />
                             <Day id={10} info={habitDateInformation} isFirstRow={true} />
                             <Day id={11} info={habitDateInformation} isFirstRow={true} />
                             <Day id={12} info={habitDateInformation} isFirstRow={true} />
                             <Day id={13} info={habitDateInformation} isFirstRow={true} />
                         </tr>
                         <tr>
                             <Day id={14} info={habitDateInformation} isFirstRow={true} />
                             <Day id={15} info={habitDateInformation} isFirstRow={true} />
                             <Day id={16} info={habitDateInformation} isFirstRow={true} />
                             <Day id={17} info={habitDateInformation} isFirstRow={true} />
                             <Day id={18} info={habitDateInformation} isFirstRow={true} />
                             <Day id={19} info={habitDateInformation} isFirstRow={true} />
                             <Day id={20} info={habitDateInformation} isFirstRow={true} />
                         </tr>
                         <tr>
                             <Day id={21} info={habitDateInformation} isFirstRow={true} />
                             <Day id={22} info={habitDateInformation} isFirstRow={true} />
                             <Day id={23} info={habitDateInformation} isFirstRow={true} />
                             <Day id={24} info={habitDateInformation} isFirstRow={true} />
                             <Day id={25} info={habitDateInformation} isFirstRow={true} />
                             <Day id={26} info={habitDateInformation} isFirstRow={true} />
                             <Day id={27} info={habitDateInformation} isFirstRow={true} />
                         </tr>
                         <tr>
                             <Day id={28} info={habitDateInformation} isFirstRow={true} />
                             <Day id={29} info={habitDateInformation} isFirstRow={true} />
                             <Day id={30} info={habitDateInformation} isFirstRow={true} />
                             <Day id={31} info={habitDateInformation} isFirstRow={true} />
                             <Day id={32} info={habitDateInformation} isFirstRow={true} />
                             <Day id={33} info={habitDateInformation} isFirstRow={true} />
                             <Day id={34} info={habitDateInformation} isFirstRow={true} />
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