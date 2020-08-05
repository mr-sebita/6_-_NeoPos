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
        shop_idshop:{
            type: DataTypes.INTEGER
        },
        carrito_idcarrito: {
            type: DataTypes.STRING
        }
    };
    let config = {
        tableName: "users",
        timestamps: false
    };
    
    const Usuario = sequelize.define(alias, cols, config);
    return Usuario;
}