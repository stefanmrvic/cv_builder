export function dateToInt(date) {
    if (typeof date !== 'string') throw new Error('Date string expected!');

    const dateArr = date.split('-') 

    const year = parseInt(dateArr[0]) * 365 * 24 * 60 * 60;
    const month = parseInt(dateArr[1]) * 24;
    const day = parseInt(dateArr[2]) * 24 * 60 * 60;

    return
}