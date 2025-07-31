import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { getAuth } from "firebase/auth";

export const firebaseCdnConfig = {
  apiKey: process.env.NEXT_PUBLIC_CDN_AUTH_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_CDN_AUTH_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_CDN_AUTH_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_CDN_AUTH_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_CDN_AUTH_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_CDN_AUTH_APP_ID,
};

const firebaseApp =
  getApps().find((app) => app.name === "app2") ||
  initializeApp(firebaseCdnConfig, "app2");

export const cdnAuth = getAuth(firebaseApp);
export const cdnDb = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const uploadFile = async (file, path) => {
  // const  = `${folder}/${file.name}`;
  const storageRef = ref(storage, path);
  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(ref(storage, path));
    return url;
  } catch (err) {
    throw new Error(err);
  }
};

export const deletFile = async (folder, fileName) => {
  try {
    const path = `${folder}/${fileName}`;
    const deleteRef = ref(storage, path);

    await deleteObject(deleteRef);
    return true;
  } catch (err) {
    throw new Error(err);
  }
};

async function listItemsInDirectory(directoryPath) {
  const storageRef = ref(storage, directoryPath);
  try {
    const items = await listAll(storageRef);
    //console.log(items);
    return items;
  } catch (error) {
    console.error("Error listing items in directory:", error);
    throw error;
  }
}

export const deleteFolder = async (path) => {
  const items = await listItemsInDirectory(path);
  const promises = items.items.map((itemRef) => deleteObject(itemRef));
  try {
    await Promise.all(promises);
  } catch (error) {
    throw error;
  }
};
