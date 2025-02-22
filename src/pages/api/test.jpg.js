import { fsync } from "fs";
import path from "path";
// import fs from "fs";

const handler = async (req, res) => {
  try {
    console.log("Tracking Image Loaded:");

  // Path to an actual image file in your project (public folder)
  const imagePath = path.join(process.cwd(), "public", "user.jpg");

  // Read and send the image file
  const imageBuffer = fsync.readFileSync("imagePath");
  res.setHeader("Content-Type", "image/jpeg");
  res.send(imageBuffer);
    
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      error: err,
    });
  }
};

export default handler;
