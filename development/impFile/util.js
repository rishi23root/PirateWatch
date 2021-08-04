const sizeArray = ['b','Kb','Mb','Gb','Tb'];
const bytesToSize = (bytes,depth=1) => {
    if (bytes < (1024**(depth)) )
        return `${(bytes / (1024**(depth-1))).toFixed(2)} ${sizeArray[depth-1]}` 
    else
        return bytesToSize(bytes,depth=depth+1)
}
const sizeTobytes = (size)=>{
    let splited = size.split(' ');
    return parseInt(splited[0])*(
        1024**(sizeArray.findIndex(e => e == splited[1])))
}

module.exports = {
    bytesToSize,
    sizeTobytes
}