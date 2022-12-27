const httpErrorFactory = (container) => new httpError(container)

class httpError {
    constructor() {
    }

    badRequest(code = 400, message = 'invalid request') {
        return { code, message }
    }

    unAuthorized(code=401, message='invalid access, please signIn/signup'){
        return {code, message}
    }

    paymentRequired(code=402, message='payment failed, please make the payment '){
        return{code, message}
    }

    forbidden(code=403, message='access denied, please contact the administrator'){
        return{code, message}
    }

    notFound(code=404, message='record doesnot exist'){
        return{code, message}
    }

    internalServerError(code=500, message="internal server error"){
        return{code, message}
    }
}

module.exports = {
    httpErrorFactory,
    httpError
}