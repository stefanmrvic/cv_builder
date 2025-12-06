export const sortCompaniesByEmploymentDate = (a, b) => {
    // Checks which company has a position with checked "currentlyEmployed" to put it on the top of CV.
    const presentEmploymentsA = a.positions.filter(position => position.currentlyEmployed);
    const presentEmploymentsB = b.positions.filter(position => position.currentlyEmployed);

    const mostRecentPositionA = findMostRecentStartDate(presentEmploymentsA);
    if (!mostRecentPositionA) throw new Error('mostRecentPositionA not found!');

    const mostRecentPositionB = findMostRecentStartDate(presentEmploymentsB);
    if (!mostRecentPositionB) throw new Error('mostRecentPositionB not found!');

    // If there are two or more companies with positions endDate checked "currentlyEmployed", decide which company
    // will precede the other one, by looking which company has more recent startDate.
    if (mostRecentPositionA && mostRecentPositionB) {
        // Converting Date strings back to Date objects and then further converting them into ms int.
        const startDateA = new Date(mostRecentPositionA.startDate).getTime();
        const startDateB = new Date(mostRecentPositionB.startDate).getTime();

        // Checks if either (or both of) startDateA or startDateB are NaN which would indicate that their values are either empty or invalid.
        // In which case the other company should take precedence. Or none company should take precedence if they are both NaN.
        if (startDateA === NaN && startDateB === NaN) return 0;
        else if (startDateA < startDateB || startDateB === NaN) return 1;
        else if (startDateA > startDateB || startDateA === NaN) return -1;

        // If both Date ints are equal, leave the order as is.
        return 0;
    }
    else if (mostRecentPositionA && !mostRecentPositionB) return -1;
    else if (!mostRecentPositionA && mostRecentPositionB) return 1;
}

// Finds most recent startDates and returns it.
export const findMostRecentStartDate = (positionsArr) => {
    const presentEmployments = positionsArr;
    let mostRecentPosition = presentEmployments[0];

    // It iterates over the positions array and compares startDates to return the most recently started position.
    for (let i = 0; i < presentEmployments.length; i++) {
        const currPosDate = new Date(presentEmployments[i].startDate);
        const currPos = currPosDate.getTime();

        const mostRecentPosDate = new Date(mostRecentPosition.startDate)
        const mostRecentPos = mostRecentPosDate.getTime();

        if (currPos > mostRecentPos) mostRecentPosition = presentEmployments[i];
    }

    return mostRecentPosition;
}

export const sortPositionsByEmploymentDate = (a, b) => {
    const presentEmploymentA = a.currentlyEmployed;
    const presentEmploymentB = b.currentlyEmployed;

    // If there are two or more positions whose endDate is checked as "currentlyEmployed", decide which position
    // will precede the other one, by looking which position has the more recent startDate.
    if (presentEmploymentA && presentEmploymentB) {
        // Converting Date strings back to Date objects and then further converting them into ms int.
        const startDateA = new Date(a.startDate).getTime();
        const startDateB = new Date(b.startDate).getTime();

        // Checks if either (or both of) startDateA or startDateB are NaN which would indicate that their values are either empty or invalid.
        // In which case the other position should take precedence. Or none position should take precedence if they are both NaN.
        if (startDateA === NaN && startDateB === NaN) return 0;
        else if (startDateA < startDateB || startDateB === NaN) return 1;
        else if (startDateA > startDateB || startDateA === NaN) return -1;

        // If both Date ints are equal, leave the order as is.
        return 0;
    }
    else if (presentEmploymentA && !presentEmploymentB) return -1;
    else if (!presentEmploymentA && presentEmploymentB) return 1;
}