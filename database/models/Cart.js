module.exports = (sequelize, DataTypes) => {
    let alias = "Carrito";
    let cols = {
        idcarrito: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        date: {
            type: DataTypes.STRING
        },
        cost: {
            type: DataTypes.STRING
        },
        payment: {
            type: DataTypes.STRING
        },
        cliente_idcliente: {
            type: DataTypes.INTEGER
        }
    };
    let config = {
        tableName: "carrito",
        timestamps: false
    };
    
    const Carrito = sequelize.define(alias, cols, config);
    
    
    return Carrito;
}