const { model, Schema } = require("mongoose");

const EmployeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [6, "Enter a valid name"],
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const Employee = model("employee", EmployeeSchema);
module.exports = Employee;
