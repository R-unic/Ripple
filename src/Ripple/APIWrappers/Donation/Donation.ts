export interface Donation {
    txn_id: string;
    status: string;
    buyer_email: string;
    buyer_id: string;
    recurring: boolean;
    price: string;
    currency: string;
    timestamp: string;
}