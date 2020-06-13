/**
 * format the date based on time since the email
 * 
 * if it is on current date use time
 *    eg. 1:20
 * if the year is same use month and date
 *    eg. Jan 14
 * otherwise full format
 *    eg 1/27/2018
 */
export const formatDate = (date) => {
    const dateObj = new Date(Date.parse(date))
    const today = new Date()
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"]

    if (dateObj.getFullYear() !== today.getFullYear()) {
        return dateObj.toLocaleDateString("en-US")
    }
    if (dateObj.getDate() !== today.getDate()) {
        return `${months[dateObj.getMonth()]} ${dateObj.getDate()}`
    }
    return `${dateObj.getHours()}:${dateObj.getMinutes()}`
}