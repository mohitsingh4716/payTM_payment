const express = require("express");
const { User, Account } = require("../db");
const bcrypt = require("bcrypt");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const  { authMiddleware } = require("../middleware");

const router = express.Router();

const signUpSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

// signup
router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signUpSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: " Incorrect inputs",
    
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });
  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const user = await User.create({
    username: body.username,
    password: hashedPassword,
    firstName: body.firstName,
    lastName: body.lastName,
  });
  const userId = user._id;

//    Create a new account
  await Account.create({
    userId,
    balance: 1+ Math.random()*10000
  })

//   ------
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    mssg: "User created Successfully",
    token: token,
  });
});


// signin
const signInSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signInSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "Validation failed ",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
  });

  if(user){
    
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid username or password",
            });
        }

    const token=jwt.sign({userId:user._id},JWT_SECRET);    

    return res.json({
      message:"Login successfully",
      token: token,
    });
   
  }
 return res.status(401).json({
    message: "Invalid username or password",
  });
});





// other auth routes

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

		await User.updateOne({ _id: req.userId }, req.body);
	
    res.json({
        message: "Updated successfully"
    })
})



router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;
