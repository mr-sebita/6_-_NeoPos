module.exports = (sequelize, DataTypes) => {
    let alias = "Shop";
    let cols = {
        idshop: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        shop_name: {
            type: DataTypes.STRING 
        },
        shop_logo: {
            type: DataTypes.STRING
        },
        shop_banner: {
            type: DataTypes.STRING
        },
    };
    let config = {
        tableName: "shop",
        timestamps: false
    };
    
    const Shop = sequelize.define(alias, cols, config);
    Shop.associate =  ( models ) => {
        Shop.hasMany( models.User , {
            as:'users',
            foreignKey: 'shop_idshop'
        })
    }
    return Shop;
}