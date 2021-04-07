import React, { Component, useState, useEffect } from 'react';
import Lists from './Lists.js'
import Datetime from './Datetime.js';
import Schedule from './Schedule.js';

const HomePage = (props) => {

    const [date, setDate] = useState('');

    useEffect(() => { }, [date])
        return (
            <div>
                <Datetime setDate={setDate} />
                <Schedule currentDate={date} />
                <Lists currentDate={date} />
        </div>
    );
  
}
export default HomePage
