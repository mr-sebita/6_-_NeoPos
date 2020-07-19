module.exports = (sequelize, dataTypes) => {
    let alias = "CarritoProducto";
    let cols = {
        idcarrito_productos: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        carrito_idcarrito: {
            type: DataTypes.STRING 
        },
        productos_idproductos: {
            type: DataTypes.STRING
        },
        productos_idproducts: {
            type: DataTypes.STRING
        },
    };
    let config = {
        tableName: "carrito_productos",
        timestamps: false
    };
    
    const CarritoProducto = sequelize.define(alias, cols, config);
    
    
    return CarritoProducto;
}