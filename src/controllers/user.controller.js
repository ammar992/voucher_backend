import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    res
      .status(400)
      .json(new ApiResponse(400, 'Empty field is not allowed', ''));
    return;
  }
  const user = await User.findOne({ email });
  if (user) {
    res
      .status(400)
      .json(
        new ApiError(400, 'User already registered', 'User already registered')
      );
    return;
  }
  const hashPassword = await bcryptjs.hash(password, 10);
  // Create a new user with the provided name, email, and password
  const createUser = await User.create({
    name,
    email,
    password: hashPassword,
  });

  const saveUser = await User.findById(createUser._id).select('-password');
  // Return a 200 status with a success message and the created user object
  res
    .status(200)
    .json(new ApiResponse(200, 'User registered successfully', saveUser));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(403)
      .json(new ApiResponse(403, 'Please fill all the fields', ''));
    return;
  }
  const checkUser = await User.findOne({ email });
  if (!checkUser) {
    return res
      .status(404)
      .json(new ApiError(404, 'User not registered', 'User not registered'));
  }

  const checkPassword = await bcryptjs.compare(
    password,
    checkUser.password.toString()
  );
  if (!checkPassword) {
    return res
      .status(403)
      .json(new ApiError(403, 'Invalid credentials', 'Invalid credentials'));
  }

  try {
    const token = jwt.sign(
      { id: checkUser._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: process.env.EXPIRES_IN }
    );

    const user = await User.findById(checkUser._id).select('-password');
    const options = { httpOnly: true, secure: true };
    res
      .status(200)
      .cookie('token', token, options)
      .json(new ApiResponse(200, 'User login successfully', { user, token }));
  } catch (err) {
    console.error('Error setting cookie:', err);
    return res
      .status(500)
      .json(new ApiError(500, 'Internal Server Error', 'Failed to set cookie'));
  }
});

export { registerUser, loginUser };
