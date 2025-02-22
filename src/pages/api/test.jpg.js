import { addData } from "@/libs/firebase/firebase";
import { v4 } from "uuid";
// import fs from "fs";

const handler = async (req, res) => {
  try {
    // console.log("Tracking Image Loaded:");
    const referer = req.headers.referer || "";

    // console.log(referer);
    // console.log(req.headers);

    
    

    // res.setHeader("Access-Control-Allow-Origin", "https://dashboard.privy.io/"); // Allow frontend origin
    // res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow cookies
    // res.setHeader('Set-Cookie', `referer=${encodeURIComponent(referer)}; Path=/; HttpOnly; SameSite=Lax`);

    // res.status(200).json({ message: 'Referer cookie set', referer });
    // console.log(req.cookies);

    const reqObject = {
      method: req.method,
      url: req.url,
      headers: req.headers,
      cookies: req.cookies,
      query: req.query,
    };

    // console.log(req.cookies);

     var id = v4();
    await addData("test", { reqObject, id }, id);

    res.setHeader("Content-Type", "image/jpeg");
    res.send(Buffer.from([]));

    // console.log(encodeURIComponent(referer));

    // // const reqString = JSON.stringify(reqObject, null, 2);

   
    // res.send("hello");
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      error: err,
    });
  }
};

export default handler;
