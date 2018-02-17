
module.exports = {
    tableName: 'archivo',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    attributes: {
        id: {
            type: 'integer',
            required: true,
            autoIncrement: true,
            primaryKey: true,
            size: 11
        },
        idPersona: {
            type: 'integer',
            required: false,
            index: true,
            size: 11,
            defaultsTo: null,
            model: 'persona'
        },
        direccion: {
            type: 'string',
            required: false,
            size: 250,
            defaultsTo: null
        }

    }

};