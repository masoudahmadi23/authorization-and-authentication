import { sign } from "jsonwebtoken";
import User from "../../../models/User";
import { verifyPassword } from "../../../utils/auth";
import { serialize } from "cookie";
import connectDB from "../../../utils/connectDB";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "faild", message: "error in connecting to DB" });
  }

  const { email, password } = req.body;
  const secretkey = process.env.SECRET_KEY;
  const expiration = 24 * 60 * 60;

  if (!email || !password) {
    return res.status(422).json({ status: "faild", message: "Invalid Data" });
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(404).json({ status: "faild", message: "User doesn't exist!" });
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    res
      .status(422)
      .json({ status: "faild", message: "UserName or Password incorrect!" });
  }

  const token = sign({ email }, secretkey, { expiresIn: expiration });

  const serialized = serialize("token", token, {
    httpOnly: true,
    maxAge: expiration,
    path: "/",
  });

  res
    .status(200)
    .setHeader("Set-Cookie", serialized)
    .json({
      status: "success",
      message: "Logged in",
      data: { email: user.email },
    });
}
