const { getAuth } = require('../utils/firebase')
const { httpErrorFactory } = require('../utils/httpError')
const { loggerFactory } = require('../utils/logger')

const firebaseAuth = async (req, res, next) => {
    try {
        if (req.headers.authorization == null) {
            loggerFactory().errorLog(req.method, 400, req.url, 'firebaseAuthMiddleware', 'firebaseAuth', req.headers, req.body, apiErrorFactory().badRequest(400, 'invalid request headers'))
            return next(httpErrorFactory().badRequest(400, 'invalid request headers'))
        }
        
        const user = await getAuth.verifyIdToken(req.headers.authorization)
        if (user === null) {
            loggerFactory().errorLog(req.method, 401, req.url, 'firebaseAuthMiddleware', 'firebaseAuth', req.headers, req.body, apiErrorFactory().unAuthorized())
            return next(httpErrorFactory().unAuthorized())
        }

        if(req.method === 'POST'){
            res.body = Object.assign(req.body, { uid: user.uid , name: user.name, picture: user.picture, email: user.email })
            next()
        }

        if(req.method === 'PATCH'){
            res.body = Object.assign(req.body, { uid: user.uid})
            next()
        }

        if(req.method === 'GET'){
            req.query.uid = user.uid
            next()
        }
        
    } catch (e) {
        loggerFactory().errorLog(req.method, 400, req.url, 'firebaseAuthMiddleware', 'firebaseAuth', req.headers, req.body, e)
        return next(httpErrorFactory().unAuthorized(401, 'invalid access token'))
    }
}

module.exports = {
    firebaseAuth
}