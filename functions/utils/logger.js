const loggerFactory = (container) => new Logger(container)

class Logger {
    constructor(con) {
    }

    reqInfoLog(reqMethod, reqUrl, className, methodName, reqHeaders, reqBody) {
        console.info(`[${Date(Date.now())}] INFO request_received ${reqMethod} ${reqUrl} [${className} ${methodName}] headers=${JSON.stringify(reqHeaders)} payload=${JSON.stringify(reqBody)}`)
        return
    }

    resInfoLog(reqMethod, httpCode, reqUrl, className, methodName, resHeaders, resBody) {
        console.info(`[${Date(Date.now())}] INFO request_completed ${reqMethod} ${httpCode} ${reqUrl} [${className} ${methodName}] headers=${JSON.stringify(resHeaders)} payload=${JSON.stringify(resBody)}`)
        return
    }

    resErrorLog(reqMethod, httpCode, reqUrl, className, methodName, reqHeaders, reqBody, error) {
        console.error(`[${Date(Date.now())}] ERROR request_completed ${reqMethod} ${httpCode} ${reqUrl} [${className} ${methodName}] headers=${JSON.stringify(reqHeaders)} payload=${JSON.stringify(reqBody)} error=${JSON.stringify(error)}`)
        return
    }

    infoLog(className, methodName, message){
        console.info(`[${Date(Date.now())}] INFO [${className} ${methodName}] message=${JSON.stringify(message)}`)
    }

    errorLog(className, methodName, message){
        console.error(`[${Date(Date.now())}] ERROR [${className} ${methodName}] error=${JSON.stringify(message)}`)
    }
}

module.exports = {
    Logger,
    loggerFactory
}