const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

const authController = {
  login: async (req, res) => {
    const { username, password } = req.body;
    const user = await userService.findUser(username, password);

    if (user) {
      const uservalue = {
        username: user.username,
        role: user.role,
        userId: user.id || user._id,
      };
      const token = jwt.sign(uservalue, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000;

      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          maxAge: thirtyDaysInMilliseconds,
          express: new Date(Date.now() + 100000),
        })
        .json({ message: "Login successful", user: uservalue });
    } else {
      res.status(401).json({ message: "Username or password incorrect" });
    }
  },
  logout: (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  },
};

module.exports = authController;
