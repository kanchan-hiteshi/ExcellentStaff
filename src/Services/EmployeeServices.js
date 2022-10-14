
import { BaseUrl, DeleteRequestOptions, GetRequestOptions, PostRequestOptions } from "./Base";


export const GetAllEmployees = () => {   
    let requestOptions = GetRequestOptions();
    let url = BaseUrl()+"Employee/GetAll";
    return   fetch(url,requestOptions)
            .then(res => res.json())
            .then(
                (projects) => {
                    console.log(projects.data);
                    return projects.data;
                },
                (error) => {
                    alert(error);              
                }
            )
}

export const CreateNewEmployee = async (body) => {
    let requestOptions = PostRequestOptions(body,true);
    let url = BaseUrl()+"Employee/Save";
    try {
        const response = await fetch(url, requestOptions);
        return await response.json();
    } catch (error) {
        return console.log('error', error);
    }
}

export const UpdateEmployee = async (body) => {
    let requestOptions = PostRequestOptions(body,true);
    let url = BaseUrl()+"Employee/Update";
    try {
        const response = await fetch(url, requestOptions);
        return await response.json();
    } catch (error) {
        return console.log('error', error);
    }
}

export const DeleteEmployee = async (id) => {
    let requestOptions = DeleteRequestOptions();
    let url = BaseUrl()+"Employee/DeleteById?id="+id;
    try {
        const response = await fetch(url, requestOptions);
        return await response.json();
    } catch (error) {
        return console.log('error', error);
    }
}


export const DeleteAllEmployee = async (id) => {
    let requestOptions = DeleteRequestOptions();
    let url = BaseUrl()+"Employee/DeleteAll";
    try {
        const response = await fetch(url, requestOptions);
        return await response.json();
    } catch (error) {
        return console.log('error', error);
    }
}
