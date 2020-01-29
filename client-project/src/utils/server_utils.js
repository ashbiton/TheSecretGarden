const Methods = {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE'
}
const HOST = 'http://127.0.0.1:5000/';

function sendRequestToServer(method, url, data, username, isJson) {
    isJson = isJson === undefined ? true : isJson;
    let request = {
        method: method,
        headers: {
            // "Access-Control-Allow-Origin":"*"
        },
    };
    if (data) {
        request.body = data;
        if (isJson) {
            request.headers["Content-Type"] = "application/json"
        }
    }
    if (username) {
        request.headers["X-User"] = username;
    }
    const fullURL = HOST + url;
    if (method == Methods.GET) {
        return new Promise(function (resolve, _reject) {
            fetch(fullURL, request)
                .then(res =>
                    res.json())
                .then(jsonResponse =>
                    resolve([jsonResponse, undefined]))
                .catch(error =>
                    resolve([undefined, error.message]))
        })
    } else {
        return new Promise(function (resolve, _reject) {
            fetch(fullURL, request)
                .then(res => {
                    console.log("res", res);
                    console.log("res.text", res.text);
                    return res.json()
                })
                .then(jsonResponse =>
                    resolve([jsonResponse, jsonResponse.code !== 200 ? jsonResponse.text : undefined]))
                .catch(error =>
                    resolve([undefined, error.message]))
        })
    }
}
export async function login(userData) {
    let [body, error] = await sendRequestToServer(Methods.POST, "log-in", userData);
    return error;
}

export async function register(newUserData) {
    newUserData.position = "customer";
    newUserData.register = true;
    let [body, error] = await sendRequestToServer(Methods.POST, "user", newUserData);
    if (error) {
        return error;
    }
    return null;
}

/* 
used to get all the objects of specific category
param categoryToGet can be 'users','branches' etc.
*/
export async function getAll(categoryToGet, username) {
    let [body, error] = await sendRequestToServer(Methods.GET, categoryToGet, undefined, username);
    if (error) {
        return []
    }
    return body[categoryToGet];
}

export async function getSingle(dataToGet, username) {
    let [body, error] = await sendRequestToServer(Methods.GET, dataToGet, undefined, username)
    if (error) {
        return {}
    }
    return body[dataToGet];
}

export async function addUser(userToAddData, username) {
    let [body, error] = await sendRequestToServer(Methods.POST, "user", userToAddData, username);
    return error;
}

export async function updateUser(userToUpdateData, username) {
    let [body, error] = await sendRequestToServer(Methods.PUT, "user", userToUpdateData, username);
    return error;
}

export async function deleteUser(userToDelete, username) {
    let [body, error] = await sendRequestToServer(Methods.DELETE, "user", userToDelete);
    return error;
}

export async function addFlower(flowerDataToAdd, username) {
    let [body, error] = await sendRequestToServer(Methods.POST, "flower", flowerDataToAdd, username, false);
    return error;
}