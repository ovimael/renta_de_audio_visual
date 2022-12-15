const modeloSalon = {

    quieryGetUsers: "SELECT * FROM eventos",
    quieryGetUsersByeID: `SELECT * FROM evento WHERE ID = ?`,
    quieryDeleteUsersByeID: `UPDATE eventos SET Activo = 'N' WHERE ID = ?`,
    quieryUsersExists: `SELECT evento FROM eventos WHERE evento = "?"`,
    
    quieryAddUser:`INSERT INTO eventos (
        evento,
        Presentador,
        nota,
        hrInicio,
        hrSalida,
        capacidad,
        TotaldeAsistente,
        Activo
        ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
        )`,
        quieryGetUsersInfo: `
    SELECT evento, Presentador, nota, hrInicio, hrSalida, capacidad, TotaldeAsistente
    FROM eventos
    WHERE evento =?`
    }
    const updateInfor= (
        evento,
        Presentador,
        nota,
        hrInicio,
        hrSalida,
    ) => {
        return `
        UPDATE eventos SET
        Presentador ='${Presentador}',
        nota = '${nota}',
        hrInicio='${hrInicio}',
        hrSalida='${hrSalida}',
        WHERE evento ='${evento}'
        `
    }
    module.exports = {modeloSalon, updateInfor}