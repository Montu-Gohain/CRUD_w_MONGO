const { Router } = require("express");
const {
  GetallUsers,
  AddNewuser,
  UpdateUser,
  DeleteUser,
  LoginUser,
} = require("../controllers/UserController");

const router = Router();

router.get("/", GetallUsers);
router.post("/", AddNewuser);
router.patch("/", UpdateUser);
router.delete("/", DeleteUser);
router.post("/login", LoginUser);

module.exports = router;
