 module.exports = (sequelize, dataTypes) => {
    let alias = "Products";
    let cols = {
        idproducts: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        img: {
            type: dataTypes.STRING,

        },
        price: {
            type: dataTypes.STRING
        },
        brand: {
            type: dataTypes.STRING
        },
        title: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.STRING
        },
        //clave foranea
        cliente_idcliente: {
           type: dataTypes.INTEGER 
        }
    };
    let config = {
        tableName: "products",
        timestamps: false
    };
    
    const Products = sequelize.define(alias, cols, config);
    
    
    return Product;
}