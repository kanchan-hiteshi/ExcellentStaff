import { addDoc,collection, getDocs,query,where,getDoc,doc } from "firebase/firestore";
import { auth,Database } from '../Database/firebase.js';

export const GetAllDepartmentFB = async() => {
    let res = await getDocs(collection(Database, "Department"));
    return res;
}

export const AddNewDepartmentFB = async(name) => {
    let res =  await addDoc(collection(Database, "Department"), {
       "Name" : name
      });
      return res;
}

export const GetDepartmentFB = async(id) => {
    const q = doc(Database,"Department",id);
    const data = await getDoc(q);
    return data;
}