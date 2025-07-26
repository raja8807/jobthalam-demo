import admin from "firebase-admin";
import { getApps, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import service from "./service.json";

const handler = async (req, res) => {
  // Setup credentials from environment variables
  service.type = process.env.NEXT_PUBLIC_TYPE;
  service.project_id = process.env.NEXT_PUBLIC_PROJECT_ID;
  service.private_key_id = process.env.NEXT_PUBLIC_PRIVATE_KEY_ID;
  service.private_key = process.env.NEXT_PUBLIC_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  ); // Important fix
  service.client_email = process.env.NEXT_PUBLIC_CLIENT_EMAIL;
  service.client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
  service.auth_uri = process.env.NEXT_PUBLIC_AUTH_URI;
  service.token_uri = process.env.NEXT_PUBLIC_TOKEN_URI;
  service.auth_provider_x509_cert_url =
    process.env.NEXT_PUBLIC_AUTH_PROVIDER__CERT_URL;
  service.client_x509_cert_url = process.env.NEXT_PUBLIC_CLIENT_CERT_URL;
  service.universe_domain = process.env.NEXT_PUBLIC_UNIVERSAL_DOMAIN;

  try {
    const { mobile, otp } = req.body;
    if (!mobile || !otp) {
      return res.status(400).json({ message: "Mobile and OTP are required" });
    }

    const firebaseAdmin = !getApps().length
      ? admin.initializeApp({
          credential: admin.credential.cert(service),
        })
      : getApp();

    const db = admin.firestore();
    const otpDoc = await db.collection("otps").doc(mobile).get();

    if (!otpDoc.exists) {
      return res.status(400).json({ message: "OTP not found or expired" });
    }

    const data = otpDoc.data();

    // Allow test OTP
    if (otp === "123456") {
      data.otp = "123456";
    }

    if (data.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (data.expiresAt.toDate() < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    const token = await getAuth(firebaseAdmin).createCustomToken(mobile, {
      role: "employer",
    });

    await db.collection("otps").doc(mobile).delete();

    return res.status(200).json({ token });
  } catch (err) {
    console.log("errr---->>>> , ", err.message);
    return res.status(500).json({ error: err.message });
  }
};

export default handler;
