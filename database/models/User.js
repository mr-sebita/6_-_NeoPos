module.exports = (sequelize, DataTypes) => {
    let alias = "User";
    let cols = {
        idusuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
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
        grupo: {
            type: DataTypes.STRING
        },
        shop_idshop: {
            type: DataTypes.INTEGER
        },
        carrito_idcarrito: {
            type: DataTypes.STRING,
            allowNull: true
        }
    };
    let config = {
        tableName: "users",
        timestamps: false,
      
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.belongsTo(models.Shop,{
            as: "userShop",
            foreignKey: "shop_idshop"
        });
    };

    
    return User;
}