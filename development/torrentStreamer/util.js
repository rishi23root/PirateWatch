const sizeArray = ['b', 'Kb', 'Mb', 'Gb', 'Tb'];

const bytesToSize = (bytes, depth = 1) => {
    if (bytes < (1024 ** (depth)))
        return `${(bytes / (1024 ** (depth - 1))).toFixed(2)} ${sizeArray[depth - 1]}`
    else
        return bytesToSize(bytes, depth = depth + 1)
}

const sizeTobytes = (size) => {
    let splited = size.split(' ');
    return parseInt(splited[0]) * (
        1024 ** (sizeArray.findIndex(e => e == splited[1])))
}

const isNumberAroundBy = (bytes1, bytes2ToCompair, moreOrLessPercentage = 0.3) => {
    return bytes1 < bytes2ToCompair ?
        true :
        (+(bytes1 / bytes2ToCompair) - 1).toFixed(1) <= moreOrLessPercentage ? 
            true :
            false
}


module.exports = {
    bytesToSize,
    sizeTobytes,
    isNumberAroundBy,
}