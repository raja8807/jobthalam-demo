import { addData } from "@/libs/firebase/firebase";
import { fsync } from "fs";
import path from "path";
import { v4 } from "uuid";
// import fs from "fs";

const handler = async (req, res) => {
  try {
    console.log("Tracking Image Loaded:");
    console.log(req.cookies);

    const reqObject = {
      method: req.method,
      url: req.url,
      headers: req.headers,
      cookies: req.cookies,
      query: req.query,
    };

    // const reqString = JSON.stringify(reqObject, null, 2);

    var id = v4();
    await addData("test", { reqObject, id }, id);

    res.send("hello");
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      error: err,
    });
  }
};

export default handler;
