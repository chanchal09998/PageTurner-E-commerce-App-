const signupValidation = (req, res, next) => {
  const { name, email, password, security } = req.body;

  if (!name || name.length < 3) {
    return res.status(400).json({
      message: "Name is required and should be more than 3 characters",
    });
  }
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!password || password.length < 3) {
    return res.status(400).json({
      message: "Password is required and should be more than 3 characters",
    });
  }
  if (!security) {
    return res.status(400).json({
      message: "security question must be answered",
    });
  }

  next();
};

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!password || password.length < 3) {
    return res.status(400).json({
      message: "Password is required and should be more than 3 characters",
    });
  }

  next();
};

export { loginValidation, signupValidation };
