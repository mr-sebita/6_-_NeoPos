module.exports = (sequelize, dataTypes) => {
    let alias = "Usuario";
    let cols = {
        idusuario: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        name: {
            type: type.dataTypes.STRING },
        surname: {
            type: type.dataTypes.STRING
        },
        email: {
            type: type.dataTypes.STRING
        },
        password: {
            type: type.dataTypes.STRING
        },
        avatar: {
           type: type.dataTypes.STRING 
        }
    };
    let config = {
        tableName: "usuario",
        timestamps: false
    };
    
    const Usuario = sequelize.define(alias, cols, config);
    
    
    return Usuario;
}