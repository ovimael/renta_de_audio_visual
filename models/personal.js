const modelopersonal={

    quieryverUsers: "SELECT * FROM personal",
    quieryGetUsersByeID: `SELECT * FROM personals WHERE ID = ?`,
    quieryDeleteUsersByeID: `UPDATE personals SET Activo = 'N' WHERE ID = ?`,
    quieryUsersExists: `SELECT personal FROM personals WHERE personal = "?"`,
    
    quieryAddUser:`INSERT INTO personal (
        personal,
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Contraseña,
        Fecha_nacimiento,
        Activo
        ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?)
        `,
        quieryGetUsersInfo: `
    SELECT personal, Nombre, Apellidos, Edad, Genero, Fecha_nacimiento
     FROM personal 
     WHERE personal = ?`
    }
    
    const updatepersonal= (
    Nombre,
    Apellidos,
    Edad,
    Genero,
    Fecha_nacimiento,
    personal
    ) => {
        return `
        UPDATE personal SET
    
        Nombre = '${Nombre}',
        Apellidos = '${Apellidos}',
        Edad = ${Edad},
        Genero = '${Genero}',
        Fecha_nacimiento = '${Fecha_nacimiento}'
        WHERE personal = '${personal}'
        `
    }
    
    module.exports = {modelopersonal, updatepersonal}