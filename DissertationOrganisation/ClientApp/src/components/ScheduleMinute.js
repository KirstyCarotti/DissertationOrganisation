import React, { useEffect, useState } from 'react'
import {
    Input
} from 'reactstrap';

const ScheduleMinute = (props) => {
    const { timeBlock, events } = props;
    const [stringOut, updateStringOut] = useState("")
    var eventsInBlock = []





    useEffect(() => {
        var block = timeBlock.split(':')[0];
        events.map(event => {

            if (event.startTime > block) {
                updateStringOut(stringOut.concat(" start"))
            }
            if (event.endTime < block + 1) {
                updateStringOut(stringOut.concat(" end"))
            }
        })

    }, [])

    return (
        <p>{stringOut}</p>
    )


}
export default ScheduleMinute