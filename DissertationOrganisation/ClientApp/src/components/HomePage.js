import React, { Component, useState, useEffect } from 'react';
import Lists from './Lists.js'
import Datetime from './Datetime.js';

const HomePage = (props) => {

    const [date, setDate] = useState('');

        return (
            <div>
                <Datetime setDate={setDate} />
                <Lists currentDate={date}></Lists>
        </div>
    );
  
}
export default HomePage
