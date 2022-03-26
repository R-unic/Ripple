import { IconFinderRes } from "./IconFinderRes";
import fetch, { RequestInit } from "node-fetch";

export class IconFinderAPI {
    private readonly baseURL = "https://api.iconfinder.com/v4/";
    private readonly requestOptions: RequestInit;
    public constructor(
        private apiKey: string
    ) {
        this.requestOptions = {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${this.apiKey}`
            }
        }
    }

    public async QueryIcons(query: string): Promise<IconFinderRes> {
        return fetch(`${this.baseURL}icons/search?query=${encodeURIComponent(query)}&count=10`, this.requestOptions)
            .then(res => res.json());
    }
}