import React from 'react'

const DatePartition = props => {
    const { lastCreated, created } = props

    function getDate(date) {
        return date ? date.substr(0, 10) : null
    }

    const lastDate = getDate(lastCreated)
    const thisDate = getDate(created)

    if (lastCreated && lastDate === thisDate ) return <div />

    return (
        <div style={styles.dateText} className='ce-message-date-text'>
            { formatDateTime(getDateTime(created, props.offset)) }
        </div>
    )
}
export function getDateTime(date, offset) {
    if (!date) return ''
    
    date = date.replace(' ', 'T')
    offset = offset ? offset : 0

    const year = date.substr(0,4)
    const month = date.substr(5,2)
    const day = date.substr(8,2)
    const hour = date.substr(11,2)
    const minute = date.substr(14,2)
    const second = date.substr(17,2)
    
    var d = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`)
    d.setHours(d.getHours() + offset)
    return d
}

const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }

export function formatTime(dateTime) {
    var time = dateTime.toLocaleString('en-GB')
    return time.split(' ')[1].slice(0, -3) + ' ' + time.slice(-2)
}

export function formatDate(dateTime) {
    return dateTime.toLocaleString('en-GB', options)
}

export function formatDateTime(dateTime) {
    return formatTime(dateTime) + ', ' + formatDate(dateTime)
}
export default DatePartition

const styles = {
    dateText: { 
        width: '100%', 
        textAlign: 'center',
        paddingTop: '4px',
        paddingBottom: '10px',
        fontSize: '15px',
        color: 'rgba(0, 0, 0, .40)'
    }
}