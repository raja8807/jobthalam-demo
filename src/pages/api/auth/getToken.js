import admin from "firebase-admin";
import { getApps, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import x from './jt-test-26ac5-9db62a1858fb.json'

const handler = async (req, res) => {


  try {
    // console.log(x);
    const firebaseAdmin = !getApps().length
      ? admin.initializeApp({
          credential: admin.credential.cert(
            x
          ),
        })
      : getApp();

    const token = await getAuth(firebaseAdmin).createCustomToken(
      req?.body?.mobile,
      {
        role:'candidate'
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
