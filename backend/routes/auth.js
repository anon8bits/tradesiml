import { Router } from 'express';
const router = Router();
import User from '../models/Users.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fetchuser from '../middlewares/fetchuser.js';

const { genSalt, hash, compare } = bcrypt;
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;

const generateAccessToken = (user) => {
  return jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

router.post('/createuser', [
  body('fname').notEmpty().withMessage('First name cannot be blank').isString().withMessage('Please enter a valid name'),
  body('lname').notEmpty().withMessage('Last name cannot be blank').isString().withMessage('Please enter a valid name'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 8 })
    .matches(passwordRegex)
    .withMessage('Password must contain at least one uppercase letter, one number, and one symbol')
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

    const user = await User.create({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
    });
    res.status(200).json("User added");

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

    const accessToken = generateAccessToken(user);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});

router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

export default router;