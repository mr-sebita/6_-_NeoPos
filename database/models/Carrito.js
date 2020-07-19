module.exports = (sequelize, dataTypes) => {
    let alias = "Carrito";
    let cols = {
        idcarrito: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        date: {
            type: dataTypes.STRING
        },
        cost: {
            type: dataTypes.STRING
        },
        payment: {
            type: dataTypes.STRING
        },
        cliente_idcliente: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: "carrito",
        timestamps: false
    };
    
    const Carrito = sequelize.define(alias, cols, config);
    
    
    return Carrito;
}