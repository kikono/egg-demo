
function merge(dest, src) {
    let slice = [].slice;
    console.info('dest:'+JSON.stringify(dest));
    console.info('src:'+JSON.stringify(src));
    src = slice.call(arguments, 1);
    let j, key, len, object, value;
    for (j = 0, len = src.length; j < len; j++) {
      	object = src[j];
      	for (key in object) {
        	value = object[key];
        	dest[key] = value;
      	}
    }
    console.info('merge:'+JSON.stringify(dest));
    return dest;
};


// function merge(dest, src) {
//     let key, object;
//     for (key in src) {
//         object = src[key];
//         dest[key] = object;
//     }
//     return dest;
// };
exports.merge = merge;