const ControllerFactory = (container) => new Controller(container)

class Controller {
    constructor(con) {
        this.orgService = con.orgService
        this.orgModel = con.orgModel
        this.logger = con.logger
        this.httpError = con.httpError
        this.orgSchema = con.orgSchema
        this.configSchema = con.configSchema
        this.schemaValidator = con.schemaValidator
        this.templateSchema = con.templateSchema
    }

    async getData(req, res, next) {
        this.logger().reqInfoLog(req.method, req.url, 'controller', 'getData', req.headers, req.body)
        try {
            if (req.query.type == undefined || req.query.orgCode == undefined) {
                this.logger().resErrorLog(req.method, 400, req.url, 'controller', 'getData', req.headers, req.body, this.httpError().badRequest(400, 'query params are not defined'))
                return next(this.httpError().badRequest(400, 'query params are not defined'))
            }

            const enums = ['configuration', 'organisation', 'role']
            if (!enums.includes(req.query.type)) {
                this.logger().resErrorLog(req.method, 400, req.url, 'controller', 'getData', req.headers, req.body, this.httpError().badRequest(400, `${req.query.type} is an invalid type value, should be configuration, organisation or role`))
                return next(this.httpError().badRequest(400, `${req.query.type} is an invalid type value, should be configuration, organisation or role`))
            }

            const result = await this.orgService().getData(req.query.type, req.query.orgCode)
            if (result.code) {
                next(this.httpError().badRequest(result.code, result.message))
                return this.logger().resErrorLog(req.method, result.code, req.url, 'controller', 'getData', req.headers, req.body, this.httpError().badRequest(result.code, result.message))
            }

            res.status(200).send(result)
            return this.logger().resInfoLog(req.method, 200, req.url, 'controller', 'getData', res.headers, result)
        } catch (e) {
            this.logger().resErrorLog(req.method, 500, req.url, 'controller', 'getData', req.headers, req.body, e.message)
            return next(this.httpError().internalServerError())
        }
    }

    async addNew(req, res, next) {
        this.logger().reqInfoLog(req.method, req.url, 'controller', 'addNew', req.headers, req.body)
        try {
            const valid = await this.schemaValidator().validate(this.orgSchema, req.body)
            if (valid != true) {
                this.logger().resErrorLog(req.method, 400, req.url, 'controller', 'addNew', req.headers, req.body, this.httpError().badRequest(400, valid))
                return next(this.httpError().badRequest(400, valid))
            }

            const result = await this.orgService().addNew(req.body)
            if (result.code) {
                next(this.httpError().badRequest(result.code, result.message))
                return this.logger().resErrorLog(req.method, result.code, req.url, 'controller', 'addNew', req.headers, req.body, this.httpError().badRequest(result.code, result.message))
            }

            res.status(200).send(result)
            return this.logger().resInfoLog(req.method, 200, req.url, 'controller', 'addNew', res.headers, result)
        } catch (e) {
            this.logger().resErrorLog(req.method, 500, req.url, 'controller', 'addNew', req.headers, req.body, e.message)
            return next(this.httpError().internalServerError())
        }
    }
}

module.exports = {
    Controller, ControllerFactory
}