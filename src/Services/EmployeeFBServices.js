import { addDoc,collection, getDocs,getDoc,doc,setDoc,deleteDoc,deleteDocs } from "firebase/firestore";
import { auth,Database } from '../Database/firebase.js';

export const GetAllEmployeeFB = async() => {
    let res = await getDocs(collection(Database, "Employee"));
    return res;
}

export const AddNewEmployeeFB = async(name,salary) => {
    let res =  await addDoc(collection(Database, "Employee"), {
       "Name" : name,
       "Salary":salary
      });
      return res;
}

export const UpdateEmployeeFB = async(name,salary,id) => {
    let res =  await setDoc(doc(Database, "Employee",id), {
       "Name" : name,
       "Salary":salary
      });
}

export const GetEmployeeFB = async(id) => {
    const ref = doc(Database,"Employee",id);
    const data = await getDoc(ref);
    return data;
}

export const DeleteEmployeeFB = async(id) => {
    const ref = doc(Database,"Employee",id);
    const data = await deleteDoc(ref);
}

export const DeleteAllEmployeeFB = async() => {
    let res = await getDocs(collection(Database, "Employee"));
    if(res !== null && res !== undefined){
        res.forEach((ele)=>{
             deleteDoc( doc(Database,"Employee",ele.id));
        })
    }
}