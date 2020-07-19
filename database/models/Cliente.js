 module.exports = (sequelize, dataTypes) => {
    let alias = "Cliente";
    let cols = {
        idcliente: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        name: {
            type: DataTypes.STRING },
        cuit: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        avatar: {
           type: DataTypes.STRING 
        }
    };
    let config = {
        tableName: "cliente",
        timestamps: false
    };
    
    const Cliente = sequelize.define(alias, cols, config);
    
    
    return Cliente;
}