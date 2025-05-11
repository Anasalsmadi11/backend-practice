const checkRole = (...allowedRoles) => {
  // spread them cus the number of roles changes from user to another
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401); // extra protection
    const rolesArray = [...allowedRoles];
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val == true);
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = checkRole;
