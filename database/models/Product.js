 module.exports = (sequelize, DataTypes) => {
    let alias = "Products";
    let cols = {
        idproducts: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        img: {
            type: DataTypes.STRING,

        },
        price: {
            type: DataTypes.STRING
        },
        brand: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        //clave foranea
        cliente_idcliente: {
           type: DataTypes.INTEGER 
        }
    };
    let config = {
        tableName: "products",
        timestamps: false
    };
    
    const Products = sequelize.define(alias, cols, config);
    
    
    return Product;
}