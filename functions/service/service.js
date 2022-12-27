const serviceFactory = (container) => new Service(container)

class Service {
    constructor(con) {
        this.logger = con.logger
        this.orgRepo = con.orgRepo
        this.Timestamp = con.Timestamp
        this.apiError = con.apiError
    }

    async getSetting(type, orgCode) {
        try {
            const result = await this.orgRepo().getSetting(type, orgCode)
            if (result === false) {
                this.logger().errorLog('orgService', 'getSettings', `setting for ${orgCode} does not exist`)
                return this.apiError().notFound(404, `setting for ${orgCode} does not exist`)
            }
            if (result[0] == null) {
                this.logger().errorLog('orgService', 'getSettings', `${type} for ${orgCode} does not exist`)
                return this.apiError().notFound(404, `${type} for ${orgCode} does not exist`)
            }
            this.logger().infoLog('orgService', 'getSettings', `success: fetched ${type} for ${orgCode} `)
            return result[0]
        } catch (e) {
            this.logger().errorLog('orgService', 'getSettings', e.message)
            throw new Error(e.message)
        }
    }

    async addNewOrg(data) {
        try {
            const check = await this.orgRepo().getOrgByName(data)
            if (!check) {
                data.orgId = Buffer.from(data.orgName, 'utf-8').toString('hex')
                data.orgCode = data.orgName.split(' ')[0] + Math.floor(Math.random() * 10000)
                data.timestamp = this.Timestamp.now()
                delete data.uid
                const result = await this.orgRepo().addNewOrg(data)
                this.logger().infoLog('orgService', 'addNewOrg', `success: onboarded ${data.orgName}`)
                return result
            }
            this.logger().errorLog('orgService', 'addNewOrg', 'error: orgName already exist!')
            return this.apiError().badRequest(400, 'organization name already exist.')
        } catch (e) {
            this.logger().errorLog('orgService', 'addNewOrg', e.message)
            throw new Error(e.message)
        }
    }
}

module.exports = {
    Service,
    serviceFactory
}