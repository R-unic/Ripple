import fetch, { HeaderInit } from "node-fetch";

export async function Request<Res = any>(url: string, headers?: HeaderInit, httpMethod?: string, text?: boolean): Promise<Res> {
    return await fetch(url, { headers: headers, method: httpMethod })
        .then(res => text ? res.text() : res.json());
}