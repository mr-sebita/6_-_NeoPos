let UserModel = require('./User');

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
        timestamps: false,
     
    };

    const Shop = sequelize.define(alias, cols, config);

//    Shop.associate = function () {
//        Shop.hasOne({
//            as: "user",
//            foreignKey: "user_iduser"
//        })
//    };
//
//
//        Shop.belongTo({
//            as: "user",
//            foreignKey: "shop_idshop"
//        })
//    };
//


    return Shop;
}