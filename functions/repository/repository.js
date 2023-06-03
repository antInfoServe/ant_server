const repoFactory = (container) => new Repository(container)

class Repository {
    constructor(con) {
        this.db = con.db
        this.logger = con.logger
    }

    async getSetting(type, orgCode) {
        try {
            const snapshot = await this.db.collectionGroup('setting').where('orgCode', '==', orgCode).get()
            if (snapshot.empty) {
                this.logger().errorLog('orgRepo', 'getSetting', `setting for ${orgCode} does not exist`)
                return false
            }
            this.doc = await snapshot.docs.map(doc => {
                if (doc.id == type) {
                    console.log(doc.data())
                    return doc.data()
                }
                this.logger().errorLog('orgRepo', 'getSetting', `${type} for ${orgCode} does not exist`)
                return null
            })
            return this.doc
        } catch (e) {
            this.logger().errorLog('orgRepo', 'addNewOrg', e.message)
            throw new Error(e.message)
        }
    }

    async addNewOrg(data) {
        try {
            await this.db.collection('organisation').doc(data.orgCode).set({ ...data })
            this.logger().infoLog('orgRepo', 'addNewOrg', `added ${data.orgName} - ${data.orgCode}`)
            return data
        } catch (e) {
            this.logger().errorLog('orgRepo', 'addNewOrg', e.message)
            throw new Error(e.message)
        }
    }

    async addConfig(data) {
        try {
            await this.db.collection('organisation').doc(data.orgCode).collection('setting').doc('configuration').set({ ...data })
            this.logger().infoLog('orgRepo', 'addConfig', `added config for ${data.orgCode}`)
            return data
        } catch (e) {
            this.logger().errorLog('orgRepo', 'addConfig', e.message)
            throw new Error(e.message)
        }
    }
}

module.exports = {
    Repository,
    repoFactory
}