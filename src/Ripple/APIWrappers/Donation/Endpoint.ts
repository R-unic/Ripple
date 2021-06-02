import { log } from "console";
import { EndpointType } from "./EndpointType";

export class Endpoint {
    public static readonly BaseURL = "https://donatebot.io/api/v1/donations/846604279288168468";

    public constructor(
        public Path: string,
        public Type: EndpointType
    ) {}

    public URL(txnID?: string): string {
        const path = this.Path;
        if (path.includes("{txnID}"))
            if (!txnID)
                log("No transaction ID found when attempting to get ProcessTransaction endpoint URL");

            else
                path.replace(/{txnID}/, txnID);

        return `${Endpoint.BaseURL}/${path}`;
    }
}