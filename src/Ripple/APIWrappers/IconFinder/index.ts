import { IconFinderRes } from "./IconFinderRes";
import fetch from "node-fetch";

export class IconFinderAPI {
    private readonly baseURL = "https://api.iconfinder.com/v4/";
    private readonly requestOptions = {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this.apiKey}`
        }
    };

    public constructor(
        private apiKey: string
    ) {}

    public async QueryIcons(query: string): Promise<IconFinderRes> {
        return fetch(`${this.baseURL}icons/search?query=${encodeURIComponent(query)}&count=10`, this.requestOptions)
            .then(res => res.json());
    }
}