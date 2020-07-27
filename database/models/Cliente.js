 module.exports = (sequelize, DataTypes) => {
    let alias = "Cliente";
    let cols = {
        idcliente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        username: {
            type: DataTypes.STRING 
        },
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
        },
        category: {
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