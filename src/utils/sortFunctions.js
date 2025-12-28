export const sortCompaniesByEmploymentDate = (a, b) => {
    if (a.positions.length === 0 || b.positions.length === 0) return null;

    const mostRecentPositionA = findMostRecentPosition(a.positions);
    if (!mostRecentPositionA) console.log('mostRecentPositionA not found!');

    const mostRecentPositionB = findMostRecentPosition(b.positions);
    if (!mostRecentPositionB) console.log('mostRecentPositionB not found!');

    const competingPositions = [mostRecentPositionA, mostRecentPositionB];
    const winningPosition = findMostRecentPosition(competingPositions);

    if (winningPosition === mostRecentPositionA) {
        return -1;
    } else if (winningPosition && mostRecentPositionB) {
        return 1;
    } else {
        return 0;
    }
}

const findMostRecentPosition = (positionsArr) => {
    // Early return if positionsArr is either empty, or it has only 1 item.
    if (positionsArr.length === 1) return positionsArr[0];
    if (positionsArr.length === 0) {
        console.log('positionsArr is empty');
        return;
    }

    const presentPositions = positionsArr.filter(position => position.currentlyEmployed);
    
    // If there are no positions with the status "currentlyEmployed", it will search for the position(s) with the most recent endDate(s).
    if (presentPositions.length === 0) {
        let mostRecentEndDatePosition = positionsArr[0];

        // This loop finds the most recent position by converting endDates into ints and then returning 
        // the biggest int (which indicates the most amount of time passed until now in ms).
        for (let i = 0; i < positionsArr.length; i++) {
            const mostRecentPositionInt = new Date(mostRecentEndDatePosition.endDate).getTime();
            // If endDate is not undefined, create the Date object with endDate time string, otherwise, set it as 0.
            const currentPositionInt = positionsArr[i].endDate ? new Date(positionsArr[i].endDate).getTime() : 0;

            // Checks if the current position is more recent than the currently most recent position
            if (currentPositionInt > mostRecentPositionInt) {
                mostRecentEndDatePosition = positionsArr[i];
            // If both positions have the same endDate, checks which one has more recent startDate
            } else if (currentPositionInt === mostRecentPositionInt) {
                const competingPositions = [mostRecentEndDatePosition, positionsArr[i]];
                mostRecentEndDatePosition = findMostRecentStartDate(competingPositions)
            }
        }
        return mostRecentEndDatePosition;
    } else {
        const mostRecentPosition = findMostRecentStartDate(presentPositions);
        return mostRecentPosition;
    }
}

// Finds most recent startDates and returns it.
const findMostRecentStartDate = (positionsArr) => {
    const currentEmployments = positionsArr;
    let mostRecentPosition = currentEmployments[0];

    // It iterates over the positions array and compares startDates to return the most recently started position.
    for (let i = 0; i < currentEmployments.length; i++) {
        // If startDate is not undefined, create the Date object with startDate time string, otherwise, set it as 0.
        const currPositionInt = currentEmployments[i].startDate ? new Date(currentEmployments[i].startDate).getTime() : 0;
        const mostRecentPositionInt = new Date(mostRecentPosition.startDate).getTime();

        if (currPositionInt > mostRecentPositionInt) mostRecentPosition = currentEmployments[i];
    }
    return mostRecentPosition;
}

export const sortPositionsByEmploymentDate = (a, b) => {
    const presentEmploymentA = a.currentlyEmployed;
    const presentEmploymentB = b.currentlyEmployed;

    // Converts both positions endDates to ints so it can compare which one is more recent.
    const mostRecentEmploymentA = presentEmploymentA ? new Date().getTime() : new Date(a.endDate).getTime();
    const mostRecentEmploymentB = presentEmploymentB ? new Date().getTime() : new Date(b.endDate).getTime();

    if (mostRecentEmploymentA > mostRecentEmploymentB) {
        return -1;
    } else if (mostRecentEmploymentA < mostRecentEmploymentB) {
        return 1;
    // If both positions have the same endDate, it checks which position has the more recent startDate.
    } else if (mostRecentEmploymentA === mostRecentEmploymentB) {
        const startDateA = new Date(a.startDate).getTime();
        const startDateB = new Date(b.startDate).getTime();

        // Checks if either (or both of) startDateA or startDateB are NaN which would indicate that their values are either empty or invalid.
        // In which case the other position should take precedence. Or none position should take precedence if they are both NaN.
        if (startDateA === NaN && startDateB === NaN) {
            return 0;
        } else if (startDateA < startDateB || startDateB === NaN) {
            return 1;
        } else if (startDateA > startDateB || startDateA === NaN) {
            return -1;
        }
    }
    // If both position ints are equal, leave the order as is.
    return 0;
}