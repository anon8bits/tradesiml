import { Router } from 'express'
const router = Router()
import User from '../models/Users.js';
import { body, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import fetchuser from '../middlewares/fetchuser.js'

const JWT_secret = "395539685e5fe9ef44a24c1e9f25b811"
const { genSalt, hash, compare } = bcrypt;
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
router.post('/createuser', [
  body('fname', 'First name cannot be blank').exists(),
  body('lname', 'Last name cannot be blank').exists(),
  body('email', 'Please enter a valid email').isEmail(),
  body('password')
  .isLength({ min: 8 })
  .matches(passwordRegex)
  .withMessage('Password must contain at least one uppercase letter, one number, and one symbol'),
], async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "This email is already in use." });
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(req.body.password, salt);

    const user = await User.create({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: hashedPassword,
    });

    const data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(data, JWT_secret);
    res.json({ authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});


router.post('/login', [
  body('email', 'Please enter a valid email').isEmail(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }
    const passwordCompare = await compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_secret);
    res.json({ authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
})

router.post('/getuser', fetchuser, async (req, res) => {
  try {
    var userId = req.user.id;
    const user = await findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
})

export default router;