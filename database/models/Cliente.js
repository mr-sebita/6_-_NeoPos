 module.exports = (sequelize, dataTypes) => {
    let alias = "Cliente";
    let cols = {
        idcliente: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        name: {
            type: type.dataTypes.STRING },
        cuit: {
            type: type.dataTypes.STRING
        },
        email: {
            type: type.dataTypes.STRING
        },
        password: {
            type: type.dataTypes.STRING
        },
        avatar: {
           type: type.dataTypes.STRING 
        }
    };
    let config = {
        tableName: "cliente",
        timestamps: false
    };
    
    const Cliente = sequelize.define(alias, cols, config);
    
    
    return Cliente;
}