export const getGridPosition = (address) => {
    const addressStr = address.toCoords().toString();
    const xCoor = addressStr.split(',')[0].substring(1);
    const yCoor = addressStr.split(',')[1].slice(0, -1);
    return {
        x: xCoor,
        y: yCoor,
    };
};

export const findClosestBin = (distancesArray) => {
    let closestDistance = distancesArray[0];

    for (let i = 1; i < distancesArray.length; i++) {
        if (distancesArray[i] < closestDistance) {
            closestDistance = distancesArray[i];
        }
    }
    return closestDistance;
};
