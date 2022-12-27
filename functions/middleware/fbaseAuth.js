const { getAuth } = require('../utils/firebase')
const { apiErrorFactory } = require('../utils/apiError')
const { loggerFactory } = require('../utils/logger')

const fbaseAuth = async (req, res, next) => {
    try {
        if (req.headers.authorization == null) {
            loggerFactory().errorLog(req.method, 400, req.url, 'fbaseAuthMiddleware', 'fbaseAuth', req.headers, req.body, apiErrorFactory().badRequest(400, 'invalid request headers'))
            next(apiErrorFactory().badRequest(400, 'invalid request headers'))
            return
        }

        const user = await getAuth.verifyIdToken(req.headers.authorization)
        if (user === null) {
            loggerFactory().errorLog(req.method, 401, req.url, 'fbaseAuthMiddleware', 'fbaseAuth', req.headers, req.body, apiErrorFactory().unAuthorized())
            next(apiErrorFactory().unAuthorized())
            return
        }

        res.body = Object.assign(req.body, { uid: '2G8oLp1Zcxp2QxPfnFX1b2LJ18Sf' })
        next()
        return
        
    } catch (e) {
        res.status(400).send(e.message)
        loggerFactory().errorLog(req.method, 400, req.url, 'fbaseAuthMiddleware', 'fbaseAuth', req.headers, req.body, e)
        return
    }
}

module.exports = fbaseAuth