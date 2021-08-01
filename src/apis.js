import { toast } from "react-toastify";

function request(path, {data=null, token = null, method="GET"}) {
    return fetch(path, {
        method: method,
        headers: {
            Authorization: token ? `Token ${token}` : "",
            "Content-Type" : "application/json",
        },
        body: method  !== "GET" && method !== "DELETE" ? JSON.stringify(data) : null,
    })
    .then((response) => {
        //If api call is successful
        if (response.ok) {
            if (method === "DELETE") {
                //If object gets deleted, return nothing
                return true;
            }
            return response.json();
        }
        //Otherwise, if there are errors
        return response.json().then((json) => {
            //Error handling JSON, response from the server
            if (response.status === 400) {
                const errors = Object.keys(json).map(
                    (k) => `[${k}]: ${(json[k].join(" "))}`
                );
                throw new Error(errors.join(" "));
            }
            throw new Error(JSON.stringify(json))
        })
        .catch((e) => {
            //instead if showing actual error it will display only status text
            if (e.name === "SyntaxError") {
                throw new Error(response.statusText);
            }
            if (e.name === "badrequest") {
                throw new Error(response.statusText);
            }
            throw new Error(e);
        })
    })
    .catch((e)=>{
        //Handle Errors 
        toast(e.message, {type:"error"})
    })
}

export function SignIn(username, password) {
    return request("/auth/token/login/", {
        data: { username, password },
        method : "POST"
    })
}

export function register(username, password) {
    return request("/auth/users/", {
        data: { username, password },
        method : "POST"
    })
}

export function fetchPlaces(token) {
    return request("/api/places/", { token });
}


export function addPlace(data,token) {
    return request("/api/places/", { data,token, method:"POST" });
}

export function uploadImage(image) {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "qrmenu_photos");
    return fetch("http://api.cloudinary.com/v1_1/djlg6osvi/image/upload", {
        method: "POST",
        body: formData
    }).then((response) => {
        return response.json(); 
    }) ;

}

export function fetchPlace(id,token) {
    return request(`/api/places/${id}`, { token });
}

export function addCategory(data, token) {
    return request("/api/categories/", { data, token, method: "POST" });
}

export function addMenuItems(data, token) {
    return request("/api/menu_items/", { data, token, method: "POST" });
}