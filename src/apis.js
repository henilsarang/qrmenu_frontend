import { toast } from "react-toastify";
export function SignIn(username, password) {
    return fetch("/auth/token/login", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({username,password})
    })
    .then((response) => {
        console.log(response);
        //If api call is successful
        if (response.ok) {
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
    .then((json) => {
        //Called API Sucessfully
        toast(JSON.stringify(json), { type: "success" });
    })
    .catch((e)=>{
        //Handle Errors 
        toast(e.message, {type:"error"})
    })
}