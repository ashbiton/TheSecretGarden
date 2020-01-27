const Methods = {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE'
}
const HOST = 'http://localhost:5000/';

function sendRequestToServer(method, url, data) {
    let request = {
        method: method,
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    };
    if (data) {
        request.body = JSON.stringify(data);
        request.headers["Content-Type"] = "application/json"
    }
    const fullURL = HOST + url;
    return new Promise(function (resolve, _reject) {
        fetch(fullURL, request)
            .then(res =>
                res.json())
            .then(jsonResponse =>
                resolve([jsonResponse, undefined]))
            .catch(error =>
                resolve([undefined, error]))
    })
}
export async function login(userData) {
    let [body, error] = await sendRequestToServer(Methods.POST, "log-in", userData);
    return error;
}

export async function register(newUserData) {
    newUserData.position = "customer";
    newUserData.register = true;
    let [body, error] = await sendRequestToServer(Methods.POST, "user", newUserData);
    if (error){
        return error;
    }
    return null;
}

/* 
used to get all the objects of specific category
param categoryToGet can be 'users','branches' etc.
*/
export async function getAll(categoryToGet) {
    let [body, error] = await sendRequestToServer(Methods.GET, categoryToGet)
    if (error){
        return []
    }
    return body[categoryToGet];
}

export async function addUser(userToAddData) {
    let [body, error] = await sendRequestToServer(Methods.POST, "user", userToAddData);
    return error;
}

export async function updateUser(userToUpdateData) {
    let [body, error] = await sendRequestToServer(Methods.PUT, "user", userToUpdateData);
    return error;
}