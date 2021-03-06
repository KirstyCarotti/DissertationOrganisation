import React, { useEffect, useState} from 'react'
import  List  from './List.js'
import './List.css';

//Assumption: There is only one list (A to do list) for now 
//TODO: implement for multiple lists 
 const Lists = (props) => {
     const { currentDate } = props; 
     const [success, setSuccess] = useState(false);
     const [lists, setLists] = useState([]);
     const [update, setUpdate] = useState(false);
     useEffect(() => {

             fetch('https://localhost:44388/api/lists/',
                 {
                     method: "get",
                     headers: {
                         'Accept': 'application/json',
                         'Content-Type': 'application/json',
                     },
                 })
                 .then(res => res.json())
                 .then(response => {
                     setLists(response);
                     setSuccess(true);
                 })
                 .catch(e => console.log(e));
         

     }, [update, currentDate])

     if (success && lists.length>0) {
         return (
             <div>
                 {lists.map(list =>
                     <List key={list.id} id={list.id} name={list.listName} items={list.listItems} needUpdate={setUpdate} currentUpdate={update} currentDate={currentDate} />                            
                 )}
             </div>
         )
     }
     else {
         return (
             <p> Loading... </p>
         )
     }

}
export default Lists