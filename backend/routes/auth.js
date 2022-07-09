const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_KEY = "MyFirstKey";

//Route 1 Create a user using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Name must contain atleast 3 characters").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must contain atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //return bad request for errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //check whether the user already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "This email already exists" });
      }
      const salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hashSync(req.body.password, salt);

      // create new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, JWT_KEY);
      success = true;
      res.json({ success, token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some internal error occured in the code");
    }
  }
);

//Route 2 User authentication POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Please enter a valid Password").exists(),
  ],
  async (req, res) => {
    //return bad request for errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Enter correct credentials" });
      }
      const compPass = await bcrypt.compare(password, user.password);
      if (!compPass) {
        return res
          .status(400)
          .json({ success, error: "Enter correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, JWT_KEY);
      success = true;
      res.json({ success, token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some internal error occured in the code");
    }
  }
);

// Route 3 Get user data using : POST "/api/auth/getuser". login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some internal error occured in the code");
  }
});
module.exports = router;
