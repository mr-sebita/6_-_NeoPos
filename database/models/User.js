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
        carrito_idcarrito: {
            type: DataTypes.STRING
        }
    };
    let config = {
        tableName: "users",
        timestamps: false
    };
    
    const Usuario = sequelize.define(alias, cols, config);
    Usuario.associate=  ( models ) =>{
        Usuario.belongsTo( models.Shop ,  {
            as: 'shops',
            foreignKey: 'shop_idshop'
        })
    }
    return Usuario;
}