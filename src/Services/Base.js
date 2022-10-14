export const BaseUrl = () => {
    let baseurl = "https://localhost:7165/api/";
  return baseurl;
}

export const GetMyHeaders = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization","Bearer "+localStorage.getItem("token"));
    return myHeaders;
}

export const GetMyHeadersWithoutAuth = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    return myHeaders;
}

export const GetRequestOptions = () => {
    var headers = GetMyHeaders();
    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    }; 
    return requestOptions;
}

// raw => request body , withAuth (bool) -> call api with or without auth
export const PostRequestOptions = (raw,withAuth) => {
    var headers = withAuth ? GetMyHeaders() : GetMyHeadersWithoutAuth();
    var requestOptions = {
        method: 'POST',
        body: raw,
        headers: headers,
        redirect: 'follow'
    }
    return requestOptions;
}; 

export const DeleteRequestOptions = () => {
    var headers = GetMyHeaders();
    var requestOptions = {
        method: 'DELETE',
        headers: headers,
        redirect: 'follow'
    }
    return requestOptions;
}; 



