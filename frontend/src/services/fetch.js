export default async function fetchService (route, method = "GET", params = null) {
    const url = "http://localhost:8080/api/" + route;
    const request = {
        headers: { "Content-Type": "application/json" },
        method,
        mode: "cors",
    };
    method === "POST" ? request.body = JSON.stringify(params) : null

    try {
        const res = await fetch(url, request);
        const data = await res.json();
        return data;
    }
    catch (error) {throw error;}
}
