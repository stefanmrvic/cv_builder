export const sortByEmploymentDate = (a, b) => {
        // Checks which company has a position with checked "currentlyEmployed" to put it on the top of CV.
        const presentEmploymentsA = a.positions.filter(position => position.currentlyEmployed);
        const presentEmploymentsB = b.positions.filter(position => position.currentlyEmployed);

        let mostRecentPositionA = findMostRecentEmployment(presentEmploymentsA);
        if (!mostRecentPositionA) throw new Error('mostRecentPositionA not found!');

        let mostRecentPositionB = findMostRecentEmployment(presentEmploymentsB);
        if (!mostRecentPositionB) throw new Error('mostRecentPositionB not found!');

        // If there are two or more companies with positions endDate checked "currentlyEmployed", decide which company
        // will precede the other one, by looking which company has more recent startDate.
        if (mostRecentPositionA && mostRecentPositionB) {
            // Converting date strings back to Date objects and then further converting them into ms int.
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

export const findMostRecentEmployment = (positionsArr) => {
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