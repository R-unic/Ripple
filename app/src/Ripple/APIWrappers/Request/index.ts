import fetch, { HeaderInit } from "node-fetch";

export namespace Request {
    export async function Post(url: string, headers?: HeaderInit): Promise<string> {
        return Fetch<string>(url, headers, "POST", true);
    }

    export async function GetJSON<Res = any>(url: string, headers?: HeaderInit): Promise<Res> {
        return Fetch<Res>(url, headers, "GET");
    }

    export async function GetText(url: string, headers?: HeaderInit): Promise<string> {
        return Fetch<string>(url, headers, "GET", true);
    }

    export async function Fetch<Res = any>(url: string, headers?: HeaderInit, httpMethod?: string, text?: boolean): Promise<Res> {
        return await fetch(url, { headers: headers, method: httpMethod })
            .then(res => text ? res.text() : res.json());
    }
}