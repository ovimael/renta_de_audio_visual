const {Router} = require("express")
const {verUsers, getUserByID, deleteUserByID, addUser, updateUserBypersonal} = require("../controllers/personal")
const router = Router()

//http://localhost:4000/api/v1/personal
//http://localhost:4000/api/v1/personal/id/2
//http://localhost:4000/api/v1/personal?id=1

//GET
router.get("/", verUsers)
//lo siguiente despues de //id es el identificador que esta declarado en controllers (la constante)
router.get("/id/:id", getUserByID)
//DELETE
router.delete("/", deleteUserByID)
//POST
router.post("/", addUser)
//put
router.put("/", updateUserBypersonal)


module.exports = router