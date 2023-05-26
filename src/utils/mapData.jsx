export const mapData = (data, valueMap) => data.map((row) => row.reduce((obj, value, index) => {
    if (valueMap[index]) {
        obj[valueMap[index]] = `${value}`;
        return obj;
    }
    return obj;
}, {}));
