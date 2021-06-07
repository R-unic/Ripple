import { EndpointType } from "./EndpointType";

export class Endpoint {
    public static readonly BaseURL = "https://donatebot.io/api/v1/donations/846604279288168468";

    public constructor(
        public Path: string,
        public Type: EndpointType
    ) {}

    public URL(txnID?: string): string {
        return `${Endpoint.BaseURL}/${txnID ? `${txnID}/${this.Path}` : this.Path}`;
    }
}