class Container {
    constructor() {
        this.dependency = {}
    }

    setFactory(name, factory) {
        this[name] = () => factory(this)
    }

    setModule(name, module) {
        this[name] = module
    }
    setSchema(name, model){
        this[name] = model
    }

    getContainer() {
        return this
    }
}

module.exports = Container