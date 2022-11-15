const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const {
  AuthenticationError,
  RepositoryError,
  DuplicatedUserEmailError,
} = require("../errors/errors");
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();

async function login(email, password) {
  let existingUser;
  try {
    existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  } catch (error) {
    throw RepositoryError;
  }
  if (!existingUser || existingUser.password !== password) {
    throw AuthenticationError;
  }
  return jwt.sign(
    { userId: existingUser.id, email: existingUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

async function signup(email, password) {
  try {
    return await prisma.user.create({
      data: {
        id: uuidv4(),
        email: email,
        password: password, // todo ENCRYPT PASSWORD !!!
      },
    });
  } catch (error) {
    if (error.code === "P2002") {
      throw DuplicatedUserEmailError;
    }
    throw RepositoryError;
  }
}

module.exports = { login, signup };
