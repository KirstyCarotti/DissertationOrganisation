import React, { useEffect, useState } from 'react'
import {
    Input
} from 'reactstrap';

const Datetime = (props) => {
    const { setDate } = props;
    const [currentDate, setCurrentDate] = useState()


    useEffect(() => {
        fetch('https://localhost:44388/api/dateTime',
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .then(response => {
                setDate(response);
                setCurrentDate(response.split('T')[0]); 
            })
            .catch(e => console.log(e));

    }, [])

    function changeDate(event) {
        const target = event.target;
        const value = target.value;

        fetch('https://localhost:44388/api/datetime',
            {
                method: "Put",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date: value
                }),
            })
            .then(response => {
                setCurrentDate(value)
                setDate(value)
            })
            .catch(e => console.log(e));

    }

    return (
        <div>
            <Input
                className="date"
                type="date"
                name="date"
                id="exampleDate"
                value={currentDate}
                onChange ={changeDate}
            />
        </div>
    )


}
export default Datetime