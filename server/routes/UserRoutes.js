const { Router } = require("express");
const {
  GetallUsers,
  AddNewuser,
  UpdateUser,
  DeleteUser,
} = require("../controllers/UserController");

const router = Router();

router.get("/", GetallUsers);
router.post("/", AddNewuser);
router.patch("/", UpdateUser);
router.delete("/", DeleteUser);

module.exports = router;
