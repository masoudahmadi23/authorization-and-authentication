import { verifyToken } from "../../utils/auth";

async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }

  const secretkey = process.env.SECRET_KEY;

  const { token } = req.cookies;

  if (!token) {
    return res
      .status(402)
      .json({ status: "Faild", message: "you are not logged in!" });
  }

  const result = verifyToken(token, secretkey);

  if (result) {
    res.status(200).json({ status: "success", data: result });
  } else {
    res.status(401).json({ status: "faild", message: "you are unauthorized!" });
  }
}

export default handler;
