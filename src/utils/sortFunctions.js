export const compareDates = (a, b) => {
    console.log(a.endDate.valueAsNumber())
    console.log(b.endDate.valueAsNumber())
    if(a.endDate === 'Present' && b.endDate === 'Present') return 0
    else if (a.endDate === 'Present') return 1;
    else if (b.endDate === 'Present') return -1;

    else if ((a.endDate.valueAsNumber - b.endDate.valueAsNumber) < 0) return -1;
    else if ((a.endDate.valueAsNumber - b.endDate.valueAsNumber) > 0) return 1;
    else return 0;
}