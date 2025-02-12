/*
 backend do not "re-render" like React components. Instead:

When a request is made, the respective controller function (like getAllEmployees) is executed.
In the backend scenario, there is no automatic "re-render" concept.
The in-memory data.employees is updated directly using data.setEmployees().
*/

const data = {
  employees: require("../model/employees.json"), //data here are required once the server runs for the first time or when i directly make changes on the server.
  setEmployees: function (newData) {
    // the arrow function won't work here cus arrow functions doesn't have their own keyword "this" The value of this in an arrow function is fixed at the time the function is created, not at the time it is called. while in regular functions the "this" refers to the object on which the function was called, which is data. put the arrow then try the console commented
    this.employees = newData;
    // console.log(this.employees, "this value");
  },
};

console.log(
  "this message will appear only if i directly make changes to this file or restarted the server"
);

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const addNewEmpoloyee = (req, res) => {
  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  if (!newEmployee.firstName || !newEmployee.lastName) {
    return res
      .status(400)
      .json({ message: "First and Last names are required" });
  }
  data.setEmployees([...data.employees, newEmployee]);
  console.log(data.employees);
  res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
  let employee = data.employees.find((emp) => emp.id == parseInt(req.body.id));
  //   console.log(...employee);
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} doesn't exist` });
  }
  if (req.body.firstName) employee.firstName = req.body.firstName;
  if (req.body.lastName) employee.lastName = req.body.lastName;
  console.log(employee);
  const filteredArray = data.employees.filter(
    (emp) => emp.id != parseInt(req.body.id)
  );
  const unsortedData = [...filteredArray, employee];
  data.setEmployees(
    unsortedData.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );

  res.json(data.employees);
};
const deleteEmployee = (req, res) => {
  const employees = data.employees.filter(
    (emp) => emp.id != parseInt(req.body.id)
  );
  data.setEmployees(employees);
  res.json(data.employees);
};

const getOneEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id == parseInt(req.params.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `there is no ID match this id: ${req.params.id}` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  addNewEmpoloyee,
  updateEmployee,
  deleteEmployee,
  getOneEmployee,
};
