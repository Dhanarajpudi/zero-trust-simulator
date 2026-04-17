module.exports = function (requiredRole) {
  return (req, res, next) => {

    // ROLE CHECK
    if (requiredRole && req.user.role !== requiredRole) {
      return res.status(403).json({ msg: "Access denied (role)" });
    }

    // SIMPLE ZERO TRUST (IP check)
    const ip = req.ip;

    if (ip !== "::1" && ip !== "127.0.0.1") {
      return res.status(403).json({ msg: "Untrusted IP" });
    }

    next();
  };
};
