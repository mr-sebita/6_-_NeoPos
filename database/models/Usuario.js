module.exports = (sequelize, dataTypes) => {
    let alias = "Usuario";
    let cols = {
        idusuario: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        name: {
            type: DataTypes.STRING },
        surname: {
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
        }
    };
    let config = {
        tableName: "usuario",
        timestamps: false
    };
    
    const Usuario = sequelize.define(alias, cols, config);
    
    
    return Usuario;
}