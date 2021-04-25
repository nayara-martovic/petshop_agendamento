
exports.objIsEmpty = (obj) => {
    return Object.keys(obj).length == 0;
};

exports.throwErrorAsPromise = (error) => {
    return new Promise((res, rej) => rej(error));
};