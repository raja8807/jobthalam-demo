import admin from "firebase-admin";
import { getApps, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
const fs = require("fs");
const path = require("path");

const handler = async (req, res) => {
  try {
    // Define the JSON object
    const data = {
      type: process.env.NEXT_PUBLIC_TYPE,
      project_id: process.env.NEXT_PUBLIC_PROJECT_ID,
      private_key_id: process.env.NEXT_PUBLIC_PRIVATE_KEY_ID,
      private_key: process.env.NEXT_PUBLIC_PRIVATE_KEY,
      client_email: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      auth_uri: process.env.NEXT_PUBLIC_AUTH_URI,
      token_uri: process.env.NEXT_PUBLIC_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.NEXT_PUBLIC_AUTH_PROVIDER__CERT_URL,
      client_x509_cert_url: process.env.NEXT_PUBLIC_CLIENT_CERT_URL,
      universe_domain: process.env.NEXT_PUBLIC_UNIVERSAL_DOMAIN,
    };

    // Convert JSON object to string
    const jsonData = JSON.stringify(data, null, 2);

    // Define the file path
    const filePath = path.join(__dirname, "data.json");

    console.log(filePath);

    // Write JSON string to a file
    fs.writeFile(filePath, jsonData, (err) => {
      if (err) {
        console.error("Error writing file", err);
      } else {
        console.log("File written successfully at:", filePath);
      }
    });

    const firebaseAdmin = !getApps().length
      ? admin.initializeApp({
          credential: admin.credential.cert(
            filePath
          ),
        })
      : getApp();

    const token = await getAuth(firebaseAdmin).createCustomToken(
      req?.body?.mobile,
      {
        role: "employer",
      }
    );

    return res.status(200).json({
      token: token,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      error: err.message,
    });
  }
};

export default handler;
