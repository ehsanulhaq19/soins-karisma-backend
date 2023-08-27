const DEFAULT_OTP_CODE_LENGTH = 4

const getOtpCode = (length = DEFAULT_OTP_CODE_LENGTH) => {
    const lowerLimit = Math.pow(10, length - 1)
    const upperLimit = Math.pow(10, length) - 1
    return Math.floor(Math.random() * (upperLimit - lowerLimit) ) + lowerLimit;
}

const getUrlRegex = () => {
    return '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$'
}

const isDuplicateObjectValues = (array, key) => {
    for(let i = 0; i < array.length; i++) {
        for(let j = i+1; j < array.length; j++) {
            if (array[i][key] === array[j][key]) {
                return true
            }
        }    
    }
    return false
}

/**
 * Check if placeholder url match with the requested url
 * @param {*} placeholderUrl 
 * @param {*} requestUrl 
 */
const isMatchingUrl = (placeholderUrl, requestUrl) => {
    const phUrlParts = placeholderUrl.split("/")
    const reqUrlParts = requestUrl.split("/")
    
    if (phUrlParts.length !== reqUrlParts.length) {
        return false
    }

    for(let i = 0; i < phUrlParts.length; i++) {
        const pHUrl = phUrlParts[i]
        if (
            (pHUrl[0] === '{' && pHUrl[pHUrl.length - 1] === '}') ||
            pHUrl[0] === ":"
        ) {
            continue
        }
        
        const reqUrl = reqUrlParts[i].split('?')[0] 
        if (pHUrl !== reqUrl) {
            return false
        }
    }

    return true
}

const getDayList = () => {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
}

const getUniqueArrayValues = (array) => {
    return array.reduce(function(a,b){
        if (a.indexOf(b) < 0 ) a.push(b);
        return a;
    },[]);
}

module.exports = {
    getOtpCode,
    getUrlRegex,
    isDuplicateObjectValues,
    isMatchingUrl,
    getDayList,
    getUniqueArrayValues
}