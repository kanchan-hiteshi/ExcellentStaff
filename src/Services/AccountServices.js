import { PostRequestOptions, BaseUrl } from "./Base";

export const LoginService = async (body) => {
    let requestOptions = PostRequestOptions(body,false);
    let url = BaseUrl()+"Account/Login";
    try {
        const response = await fetch(url, requestOptions);
        return await response.json();
    } catch (error) {
        return console.log('error', error);
    }
}

export const RegisterService = async (body) => {
    let requestOptions = PostRequestOptions(body,false);  
    let url = BaseUrl()+"Account/Register";
    try {
        const response = await fetch(url, requestOptions);
        return await response.json();
    } catch (error) {
        return console.log('error', error);
    }
}