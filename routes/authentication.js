const express = require("express");
const {PrismaClient} = require("@prisma/client");

const router = express.Router()

const prisma = new PrismaClient()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const jwt = require("jsonwebtoken");

router.post("/login", jsonParser, async (req, res, next) => {
    let {email, password} = req.body;
    const existingUser = await prisma.user.findFirst({
        where: {
            email: email,
        }
    });
    if (!existingUser || existingUser.password !== password) {
        const error = Error("Unable to authenticate you, incorrect username or password.");
        return next(error);
    }
    let token = jwt.sign(
        {userId: existingUser.id, email: existingUser.email},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    );

    res.send(token);
})

router.post("/signup", jsonParser, async (req, res, next) => {
    const {email, password } = req.body;
    await prisma.user.create({
        data: {
            email: email,
            password: password
        }
    })
    res.send("Signup successful.")
});

module.exports = router;