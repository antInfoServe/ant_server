const schemaValidatorFactory = (container) => new SchemaValidator(container)

class SchemaValidator {
    constructor(con) {
        this.ajv = con.ajv
        this.logger = con.logger
    }

    async validate(schema, data) {
        try {
            const validate = this.ajv.compile(schema)
            if (validate(data)) {
                this.logger().infoLog('schemaValidator', 'validate', 'valid request body')
                return true
            }
            this.logger().errorLog('schemaValidator', `validate-${schema.$id}`, `invalid request body: ${validate.errors[0].message}`)
            console.log(JSON.stringify(validate.errors))
            return validate.errors[0].message
        } catch (e) {
            throw new Error(e.message)
        }
    }
}

module.exports = {
    SchemaValidator,
    schemaValidatorFactory
}