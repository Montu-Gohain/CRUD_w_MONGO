const Employee = require("../models/EmployeeModel");
const CreateError = require("http-errors");

const GetAllEmployees = async (req, res, next) => {
  try {
    const people = await Employee.find();
    if (!people) {
      return next(
        CreateError.NotFound("Something went wrong, please try again later.")
      );
    }
    res.status(200).send(people);
  } catch (error) {
    next(error);
  }
};

const AddNewEmployee = async (req, res, next) => {
  const { name, gender, age, role } = req.body;

  if (!name || !gender || !age || !role) {
    return next(CreateError.BadRequest("Please provide all necessary fields."));
  }
  try {
    const newPerson = new Employee(req.body);

    const result = await newPerson.save();
    if (!result) {
      return next(
        CreateError.InternalServerError(
          "Something went wrong, please try again later."
        )
      );
    }
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

const UpdateEmployee = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(CreateError.BadRequest("Please provide all necessary fields."));
  }
  try {
    const updates = req.body;
    const options = { new: true };

    const person = await Employee.findByIdAndUpdate(id, updates, options);

    if (!person) {
      return next(CreateError.NotFound("Invalid ID.. No user found"));
    }
    res.status(200).send(person);
  } catch (error) {
    next(error);
  }
};
const DeleteEmployee = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(CreateError.BadRequest("Please provide all necessary fields."));
  }
  try {
    const DeletedPerson = await Employee.findByIdAndDelete(id);
    if (!DeletedPerson) {
      return next(
        CreateError.NotFound("Something went wrong..please try again later.")
      );
    }
    res.status(200).json({
      message: "Employee Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  GetAllEmployees,
  AddNewEmployee,
  UpdateEmployee,
  DeleteEmployee,
};
