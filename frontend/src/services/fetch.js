export default async function fetchService (route, method = "GET", params = null) {

    // Constitution de la requête
    const url = "http://localhost:8080/api/" + route;

    const headers = {
        "Content-Type": "application/json",
    }
    if (localStorage.getItem("userInfo")) {
        headers.Authorization = "Bearer " + JSON.parse(localStorage.getItem("userInfo")).token
    }

    const request = {
        headers,
        method,
        mode: "cors",
    };

    if (method !== "GET" && method !== "DELETE") {
        if (params instanceof(FormData)) {
            request.body = params
            delete headers["Content-Type"];
        } else {
            request.body = JSON.stringify(params)
        }
    } else {request.body = null}

    try {
        const res = await fetch(url, request);
        const data = await res.json();
        if (!res.ok) { console.log("RES : ", res); throw data}
        return data;
    }
    catch (error) {throw error;}
}
