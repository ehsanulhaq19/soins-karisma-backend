const uuidService = require("../services/uuidService")

const arguments = process.argv

if (arguments.length == 4) {
    const operationId = arguments[2]
    const data = arguments[3]
    let output = ''
    if (operationId == 0) {//encode uuid
        output = uuidService.encodeUuid(data)
    } else if (operationId == 1) {//decode uuid
        output = uuidService.decodeUuid(data)
    }
    console.log(output)
}
