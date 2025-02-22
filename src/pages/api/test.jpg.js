import { addData } from "@/libs/firebase/firebase";
import { fsync } from "fs";
import path from "path";
import { v4 } from "uuid";
// import fs from "fs";

const handler = async (req, res) => {
  try {
    console.log("Tracking Image Loaded:");
    console.log(req.cookies);

    var id = v4();
    await addData("test", { ...req.cookies, id }, id);

    const imagePath = path.join(__dirname, "user.jpg"); // Use any image
    res.sendFile(imagePath);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      error: err,
    });
  }
};

export default handler;
