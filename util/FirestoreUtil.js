import {
  getFirestore,
  collection,
  onSnapshot,
  where,
  getDocs,
  getDoc,
  query,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  increment,
  writeBatch,
} from "firebase/firestore";
import { app } from "../config/firebase-config";

const db = getFirestore(app);

export async function getData(paymentId) {
  try {
    if (paymentId.length === 12) {
      const docRef = doc(db, "order", paymentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) {
        const userData = {
          paymentId: docSnap.data().payment_id,
          status: docSnap.data().status,
          userId: docSnap.data().user_uid,
        };
        return { userData };
      } else {
        return null;
      }
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
