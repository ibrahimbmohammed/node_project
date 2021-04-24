const express = require("express");
const bcrypt = require("bcrypt");
const jwt1 = require("../../lib/jwt");
var jwt = require("jsonwebtoken");
const yup = require("yup");
const cookie = require("cookie");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const router = express.Router();
//const queries = require('./state.queries')
const Customers = require("../customers/customer.model");
const Reset = require("../resetPassword/resetPassword.model");

const schema = yup.object().shape({
  first_name: yup.string().trim().min(2).required(),
  last_name: yup.string().trim().min(2).required(),
  email: yup.string().trim().email().required(),
  password: yup
    .string()
    .min(8)
    .matches(/[^A-Za-z0-9]/, "password must contain a special character")
    .matches(/[A-Z]/, "password must contain an uppercase letter")
    .matches(/[a-z]/, "password must contain a lowercase letter")
    .matches(/[0-9]/, "password must contain a number")
    .required(),
});

router.post("/signup", async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const createUser = { first_name, last_name, email, password };
    await schema.validate(createUser, {
      abortEarly: false,
    });
    const existingUser = await Customers.query().where({ email }).first();
    if (existingUser) {
      const error = new Error("Email already in use");
      res.status(409);
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const insertedCustomer = await Customers.query().insert({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });
    delete insertedCustomer.password;
    res.json(insertedCustomer);
  } catch (error) {
    next(error);
  }
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await Customers.query().where({ email }).first();
    if (!user) {
      const error = new Error("No existing user");
      res.status(409);
      throw error;
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      const error = new Error("error in password or user name");
      res.status(403);
      throw error;
    }
    const payload = {
      id: user.id,
      first_name: user.first_name,
      email,
    };
    const token = await jwt1.sign(payload);

    res.cookie("auth", "token", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 900000,
      path: "/",
    });
    var oldCookie = req.cookies.test;
    var newCookie = (oldCookie | 0) + 1;
    res.cookie("test", token, { maxAge: 900000 });

    const auth = req.cookies.auth;
    if (auth) {
      console.log(auth);
    }

    res.json({
      user: payload,
      token,
      newCookie: newCookie,
      oldCookie: oldCookie,
      reqCookie: req.cookies.test,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/forgotPassword", async (req, res, next) => {
  const { email } = req.body;
  const existingUser = await Customers.query().where({ email }).first();

  if (!existingUser) {
    const error = new Error("Email does not exist");
    res.status(409);
    throw next(error);
  } else {
    const payload = {
      id: existingUser.id,
      first_name: existingUser.first_name,
    };
    const token = await jwt1.sign(payload);

    let mailTransporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "nonofyourbussiness@gmail.com",
        pass: "bananas",
      },
    });

    let mailDetails = {
      from: "nonofyourbussiness@gmail.com",
      to: "alsononofyourbussunessd@gmail.com", // email
      subject: "Test mail",
      text: "Node.js testing mail for GeeksforGeeks",
      html: `<h3> click the link to reset your password </h3>
    <p>http://localhost:5050/api/v1/auth/resetpassword/${token}</p>
    `,
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error Occurs");
      } else {
        console.log("Email sent successfully");
      }
    });
    /////////////////// Adds the token to the users database////////////////////
    try {
      const insertedReset = await Reset.query().insert({
        email,
        reset_token: token,
      });
      res.json({ message: "email sent successfully" });
    } catch (error) {
      next(error);
    }
  }
});

router.get("/resetpassword/:resetlink", async (req, res, next) => {
  const { password } = req.body;
  const { resetlink } = req.params;
  let customerId;

  if (resetlink ) {
    jwt.verify(
      resetlink,
      process.env.JWT_SECRET,
      function (error, decodedData) {
        if (error) {
          return res.status(401).json({
            error: "wrong token or expired",
          });
        }
        console.log(decodedData)
        customerId = decodedData.id;
       // return res.status(200).json({ message: "enter your new password" });
      }
    );
}

  if (password && resetlink) {
    console.log(password)
    try{
      
    
       const hashedPassword = await bcrypt.hash(password, 12);
       console.log(typeof hashedPassword)
    const user = await Customers.query()
      .findById(customerId)
      .patch({ password: hashedPassword });
    } catch(error){
      next(error);
    }
   
  }
});

module.exports = router;
