import React, { useEffect, useState } from 'react'
import {
    Input
} from 'reactstrap';

const ScheduleMinute = (props) => {
    const { timeBlock, events } = props;
    var eventsInBlock = []

    console.log(events)



    useEffect(() => {
        var block = timeBlock.split(':')[0];
        events.map(event => {

            if (event.startTime > block) {
                if (event.endTime < block + 1) {
                    
                }
            }
        })

    }, [])

    return (
        <p>{stringOut}</p>
    )


}
export default ScheduleMinute