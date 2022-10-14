import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { auth,Database } from '../Database/firebase.js';
import {addDoc, collection,} from "firebase/firestore";

export const RegisterByFB = async(email, password,userType) => {
    let res = await createUserWithEmailAndPassword(auth,email,password);
    let data = await addDoc(collection(Database, "User"), {
            "Id" : res.user.uid,
            "UserName": email,
            "Password": password,
            "UserType" : userType
          });
    console.log('****',res);
    console.log('****',data);
    return data;
}

export const LoginByFB = async(email, password,userType) => {
    let res =  await signInWithEmailAndPassword(auth, email, password);
    console.log('****',res);
    return res;
}