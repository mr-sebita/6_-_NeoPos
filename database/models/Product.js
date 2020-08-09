 module.exports = (sequelize, DataTypes) => {
    let alias = "Product";
    let cols = {
        idproducts: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        img: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.STRING
        },
        stock: {
            type: DataTypes.INTEGER
        },
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        shop_idshop: {
            type: DataTypes.INTEGER 
         }
    };
    let config = {
        tableName: "products",
        timestamps: false
    };
    
    const Product = sequelize.define(alias, cols, config);
    
    Product.associate = function(models){
        Product.belongsTo(models.Shop,{
            as: "shopProduct",
            foreignKey: "shop_idshop"
        })
    }
    
    return Product;
}