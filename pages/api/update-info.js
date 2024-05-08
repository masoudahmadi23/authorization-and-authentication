import User from "../../models/User";
import { verifyPassword, verifyToken } from "../../utils/auth";
import connectDB from "../../utils/connectDB";

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "faild", message: "error in connecting to DB" });
  }

  const { name, lastName, password } = req.body;
  const { token } = req.cookies;
  const secretkey = process.env.SECRET_KEY;

  if (!token) {
    return res
      .status(402)
      .json({ status: "Faild", message: "you are not logged in!" });
  }

  const result = verifyToken(token, secretkey);

  if (!result)
    res.status(401).json({ status: "faild", message: "you are unauthorized!" });

  const user = User.findOne({ email: result.email });

  if (!user) {
    return res
      .status(404)
      .json({ status: "Faild", message: "User dosen't Exist!" });
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    return res
      .status(422)
      .json({ status: "faild", message: "Password is Incorrect!" });
  }

  user.name = name;
  user.lastName = lastName;
  user.save();

  res
    .status(200)
    .json({ status: "success", data: { name, lastName, email: result.email } });
}
