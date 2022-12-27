const schema = {
    type: 'object',
    properties: {
        uid: { type: 'string' },
        orgId: { type: ['string', 'null'] },
        orgCode: { type: ['string', 'null'] },
        orgName: { type: 'string' },
        email: { type: 'array', format: 'email' },
        logo: { type: ['string', 'null'] },
        billingAddress: {
            type: 'object',
            properties: {
                address: { type: ['string', 'null'] },
                city: { type: ['string', 'null'] },
                state: { type: ['string', 'null'] },
                gst: { type: ['string', 'null'] }
            },
            required: ['address', 'city', 'state', 'gst'],
            additionalProperties: false,
            errorMessage: {
                type: 'invalid data type, billing address should be a JSON object',
                required: {
                    address: 'address is empty, should be string or null',
                    city: 'city is empty, should be string or null',
                    state: 'state is empty, should be string or null',
                    gst: 'gst is empty, should be string or null'
                },
                properties: {
                    address: "invalid address type, should be a string",
                    city: 'invalid city type, should be a string',
                    state: 'invalid state type, should be a string',
                    gst: 'invalid gst type, should be a string'
                }
            }
        }
    },
    required: ['orgId', 'orgCode', 'orgName', 'email', 'logo'],
    additionalProperties: false,
    errorMessage: {
        type: 'invalid data type, should be a JSON object',
        required: {
            orgId: 'org id is empty, should be string or null',
            orgCode: 'org code is empty, should be string or null',
            orgName: "org name is empty, should be string",
            email: "email is empty, should be array",
            logo: "logo is empty, should be base 64 encoded string or null"
        },
        properties: {
            orgName: "invalid org names, should be string",
            email: "invalid email, should be array",
            logo: "invalid logo, should be base64 encoded string"
        }
    }
}

module.exports = {
    schema
}