import admin from "firebase-admin";
import { getApps, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import service from "./service.json";

const handler = async (req, res) => {

  service.type = process.env.NEXT_PUBLIC_TYPE;
  service.project_id = process.env.NEXT_PUBLIC_PROJECT_ID;
  service.private_key_id = process.env.NEXT_PUBLIC_PRIVATE_KEY_ID;
  service.private_key = process.env.NEXT_PUBLIC_PRIVATE_KEY;
  service.client_email = process.env.NEXT_PUBLIC_CLIENT_EMAIL;
  service.client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
  service.auth_uri = process.env.NEXT_PUBLIC_AUTH_URI;
  service.token_uri = process.env.NEXT_PUBLIC_TOKEN_URI;
  service.auth_provider_x509_cert_url =
  process.env.NEXT_PUBLIC_AUTH_PROVIDER__CERT_URL;
  service.client_x509_cert_url = process.env.NEXT_PUBLIC_CLIENT_CERT_URL;
  service.universe_domain = process.env.NEXT_PUBLIC_UNIVERSAL_DOMAIN;

  try {
    const firebaseAdmin = !getApps().length
      ? admin.initializeApp({
          credential: admin.credential.cert(
            service
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
