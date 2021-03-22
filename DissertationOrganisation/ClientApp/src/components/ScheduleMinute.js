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
        console.log(events)
        events.map(event => {
            console.log(event.startTime)
            console.log(event.endTime)
            if (event.startTime > block) {
                console.log("here")
                updateStringOut(stringOut.concat(" start"))
            }
            if (event.endTime < block + 1) {
                console.log("hiya")
                updateStringOut(stringOut.concat(" end"))
            }
        })

    }, [])

    return (
        <p>{stringOut}</p>
    )


}
export default ScheduleMinute