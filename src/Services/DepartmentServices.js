import { BaseUrl, DeleteRequestOptions, GetRequestOptions, PostRequestOptions } from "./Base";

export const GetAllDepartment = () => {   
    let requestOptions = GetRequestOptions();
    let url = BaseUrl()+"Department/GetAll";
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

export const GetDepartment = (id) => {   
    let requestOptions = GetRequestOptions();
    let url = BaseUrl()+"Department/Get?id="+id;
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

export const CreateNewDepartment = async (body) => {
    let requestOptions = PostRequestOptions(body,true);
    let url = BaseUrl()+"Department/Save";
    try {
        const response = await fetch(url, requestOptions);
        return await response.json();
    } catch (error) {
        return console.log('error', error);
    }
}

export const DeleteDepartment = async (id) => {
    let requestOptions = DeleteRequestOptions();
    let url = BaseUrl()+"Department/DeleteById?id="+id;
    try {
        const response = await fetch(url, requestOptions);
        return await response.json();
    } catch (error) {
        return console.log('error', error);
    }
}

export const DeleteAll = async (id) => {
    let requestOptions = DeleteRequestOptions();
    let url = BaseUrl()+"Department/DeleteAll";
    try {
        const response = await fetch(url, requestOptions);
        return await response.json();
    } catch (error) {
        return console.log('error', error);
    }
}