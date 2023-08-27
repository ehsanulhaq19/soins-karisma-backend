class Serializer{
    model = null
    serializerGroups = []
    fields = {}

    constructor(model, fields, groups) {
        this.model = model
        this.fields = fields
        this.serializerGroups = groups;
    }

    getData = async(data, bulk = false) => {
        let ids = [];
        let queryFunction = "findOne"
        if (bulk) {
            try {
                ids = data.map(obj => obj.id)
            } catch (error) {
                ids = []
            }
            
            queryFunction = "findAll"
        } else {
            ids = [data.id]
        }

        const queryData = await this.model[queryFunction]({
            where: {
                id: ids
            }
        })

        return queryData
    }

    getSerializedObject = async(data) => {
        const serializedData = {}
        const fields = this.fields
        const fieldsArr = Object.keys(this.fields)
        for(let i = 0; i < fieldsArr.length; i++) {
            const field = fieldsArr[i]
            for(let j = 0; j < this.serializerGroups.length; j++) {
                const fieldObj = fields[field]
                if(fieldObj.groups.includes(this.serializerGroups[j])) {
                    const fieldName = fieldObj.propertyName ? fieldObj.propertyName : field
                    if (fieldObj.customFunction) {
                        serializedData[fieldName] = await fieldObj.customFunction(data, this.serializerGroups[j])
                    } else if (fieldObj.serializer) {
                        const relatedData = fieldObj.relation ? fieldObj.relation(data) : data[field]
                        serializedData[fieldName] = await fieldObj.serializer(relatedData, this.serializerGroups)
                    } else {
                        serializedData[fieldName] = data[field]
                    }
                    break
                }
            }
        }
        
        return serializedData
    }

    serialize = async (data, queryData = false) => {
        const serializedData = {}
        if (!data) {
            return serializedData
        }

        let modelData = data
        if (queryData) {
            modelData = await this.getData(data, false)
        }
        
        return this.getSerializedObject(modelData)
    }

    serializeBulk = async (data, queryData = false) => {
        const serialzedData = []
        if (!data) {
            return serialzedData
        }

        let modelData = data
        if (queryData) {
            modelData = await this.getData(data, true)
        }
        
        for (let i = 0; i < modelData.length; i++) {
            const obj = modelData[i]
            serialzedData.push(
                await this.getSerializedObject(obj)
            )
        }
        
        return serialzedData
    }
}

module.exports = Serializer