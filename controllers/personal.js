const { request, response } = require("express");
const pool = require("../db/connection")
const {modelopersonal, updatepersonal} = require("../models/personal");


const verUsers = async (req = request, res = response) =>{
    let conn;
    try {
        conn = await pool.getConnection()
        const users = await conn.query(modelopersonals.quieryverUsers, (error) => {throw new Error(error) })
        if (!users) {
            res.status(404).json({msg:"no se encontraron registros"})
            return
        }
        res.json({users})
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
        const [user] = await conn.query(modelopersonals.quieryGetUsersByeID, [id], (error) => {throw new Error(error) })
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
    const {id} = req.query
    let conn;
    try {
        conn = await pool.getConnection()
        const {affectedRows} = await conn.query(modelopersonals.quieryDeleteUsersByeID, [id], (error) => {throw new Error(error) })
        if (affectedRows === 0) {
            res.status(404).json({msg:`no se pudo eliminar el registro con el id ${id}`})
            return
        }
        res.json({msg: `El personal con id ${id} se elimino correctamente.`})
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
        personal,
        Nombre,
        Apellidos,
        Contraseña,
        Activo 
    } = req.body
    if (
        !personal||
        !Nombre||
        !Apellidos||
        !Contraseña||
        !Activo 
    ){
        res.status(400).json({msg:"Falta informacion del personal"})
        return
    }
    let conn;
    try {
        conn = await pool.getConnection()

       const [user] = await conn.query(modelopersonal.quieryUsersExists,[personal],)
       
        if(user){
            res.status(403).json({msg: `El personal ${personal} ya se encuentra registrado`})
            return
        }     
        //esta es la consulta mas basica, se pueden hacer mas complejas EN ESTA SE ACTUALIZARA EL personal
        const {affectedRows} = await conn.query(modelopersonal.quieryAddUser, [
            personal,
            Nombre,
            Apellidos,
            Activo
        ], (error) => {throw new Error(error)})
        if (affectedRows === 0) {
            res.status(404).json({msg:`no se pudo agregar el registro del personal ${personal}`})
            return
        }
        res.json({msg: `El personal ${personal} se agrego correctamente.`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
        conn.end()
        }
    }
}

const updateUserBypersonal = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const {
        personal,
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Contraseña,
        Fecha_nacimiento  
    } = req.body

    if (
        !personal||
        !Nombre||
        !Apellidos||
        !Genero||
        !Edad||
        !Contraseña   
    ){
        res.status(400).json({msg:"Falta informacion del personal"})
        return
    }
    let conn;
    try {
        conn = await pool.getConnection()
       const [user] = await conn.query(modelopersonal.quieryGetUsersInfo,[personal])
       if (!user){
        res.status(403).json({msg: `El personal ${personal} no se encuentra registrado`})
       }
        const {affectedRows} = await conn.query(updatepersonal(
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Fecha_nacimiento,
        personal              
        ),(error) => {throw new Error(error) })
        if (affectedRows === 0) {
            res.status(404).json({msg:`no se pudo actualizar el registro del personal ${personal}`})
            return
        }
        res.json({msg: `El personal ${personal} se actualizo correctamente.`})
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




module.exports = {verUsers, getUserByID, deleteUserByID, addUser, updateUserBypersonal,}