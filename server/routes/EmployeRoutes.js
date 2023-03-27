const { Router } = require("express");
const {
  AddNewEmployee,
  DeleteEmployee,
  GetAllEmployees,
  UpdateEmployee,
} = require("../controllers/EmployeeController");
const router = Router();

router.get("/", GetAllEmployees);
router.post("/", AddNewEmployee);
router.patch("/:id", UpdateEmployee);
router.delete("/:id", DeleteEmployee);

module.exports = router;
