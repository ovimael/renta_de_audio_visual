const { request, response } = require("express");
const pool = require("../db/connection")
const {modeloSalon, updateInfor} = require("../models/salon");


const getUsers = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        const users = await conn.query(modeloSalon.quieryGetUsers, (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados
        if (!users) {
            res.status(404).json({msg:"no se encontraron registros"})
            return
        }
        res.json({users})
        //lo del cath y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const getUserByID = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const {id} = req.params

    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        const [user] = await conn.query(modeloSalon.quieryGetUsersByeID, [id], (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados
        if (!user) {
            res.status(404).json({msg:`no se encontro registro con el id ${id}`})
            return
        }
        res.json({user})
        //lo del cath y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const deleteUserByID = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const {id} = req.query
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas EN ESTA SE ACTUALIZARA EL evento
        const {affectedRows} = await conn.query(modeloSalon.quieryDeleteUsersByeID, [id], (error) => {throw new Error(error) })
        
        //siempre validar que no se obtuvieron resultados
        if (affectedRows === 0) {
            res.status(404).json({msg:`no se pudo eliminar el registro con el id ${id}`})
            return
        }
        res.json({msg: `El evento con id ${id} se elimino correctamente.`})
        //lo del cath y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const addUser = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const{
        evento,
        Presentador,
        nota,
        hrInicio,
        hrSalida,
        capacidad,
        TotaldeAsistente,
        Activo
       
    } = req.body

    if (
        !evento||
        !Presentador||
        !nota||
        !hrInicio||
        !hrSalida||
        !capacidad||
        !TotaldeAsistente||
        !Activo
       
    ){
        res.status(400).json({msg:"Falta informacion del evento"})
        return
    }
  
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        
        //tarea aqui que el evento no se duplique
       const [user] = await conn.query(modeloSalon.quieryUsersExists,[evento],)
       
        if(user){
            res.status(403).json({msg: `El evento ${evento} ya se encuentra registrado`})
            return
        }
             //esta es la consulta mas basica, se pueden hacer mas complejas EN ESTA SE ACTUALIZARA EL evento
        const {affectedRows} = await conn.query(modeloSalon.quieryAddUser, [
            evento,
            Presentador,
            nota,
            hrInicio,
            hrSalida,
            capacidad,
            TotaldeAsistente,
            ,
            Activo
        ], (error) => {throw new Error(error)})
            //'${Genero || ''}',
        //siempre validar que no se obtuvieron resultados
       
        if (affectedRows === 0) {
            res.status(404).json({msg:`no se pudo agregar el registro del evento ${evento}`})
            return
        }
        res.json({msg: `El evento ${evento} se agrego correctamente.`})
        //lo del cath y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
        conn.end()
        }
    }
}

const updateUserBySalon = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const {
        evento,
        Presentador,
        nota,
        hrInicio,
        hrSalida
        
        

    } = req.body

    if (
        !evento||
        !Presentador||
        !nota||
        !hrInicio||
        !hrSalida
       
        

    ){
        res.status(400).json({msg:"Falta informacion del evento"})
        return
    }

    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //tarea aqui que el evento no se duplique
       const [user] = await conn.query(modeloSalon.quieryGetUsersInfo,[evento])

       if (!user){
        res.status(403).json({msg: `El evento ${evento} no se encuentra registrado`})
       }
        //esta es la consulta mas basica, se pueden hacer mas complejas EN ESTA SE ACTUALIZARA EL evento
        //arreglar esta
        const {affectedRows} = await conn.query(updateInfor (
            evento,
            Presentador,
            nota,
            hrInicio,
            hrSalida,
            
            ) , (error) => {throw new Error(error) })
            
        //siempre validar que no se obtuvieron resultados
        if (affectedRows === 0) {

            res.status(404).json({msg:`no se pudo actualizar el registro del evento ${evento}`})
            return
        }
        res.json({msg: `El evento ${evento} se actualizo correctamente.`})
        //lo del cath y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

module.exports = {getUsers, getUserByID, deleteUserByID, addUser, updateUserBySalon}