const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");
const { Admin, Editor } = require("../../config/RolesList");
const checkRoles = require("../../middleware/checkRole");

router
  .route("/")
  .get(employeesController.getAllEmployees) // no need to add checkRole since i don't want to check the role to get the employees
  .post(checkRoles(Admin, Editor), employeesController.addNewEmpoloyee)
  .put(checkRoles(Admin, Editor), employeesController.updateEmployee)
  .delete(checkRoles(Admin), employeesController.deleteEmployee);
router.route("/:id").get(employeesController.getOneEmployee);
module.exports = router;
