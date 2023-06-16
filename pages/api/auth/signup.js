import { hashPassword } from "../../../helpers/auth";
import { getUserByEmail, createUser } from "../../../helpers/api-util";
import validator from "validator";


async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { email, password } = data;

    if (
      !email ||
      !validator.isEmail(email) ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message:
          "Invalid input - password should be at least 7 characters long.",
      });
      return;
    }

    const existingUser = await getUserByEmail(email)

    if (!existingUser.length === 0) {
        res.status(422).json({message: 'User already exists.'});
        return;
    }
    const hashedPassword = await hashPassword(password);

    await createUser({email:email, password: hashedPassword})

    res.status(201).json({ message: "Created user!" });
  }
  // if req.method isn't POST, don't do anything
}

export default handler;
