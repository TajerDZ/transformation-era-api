import axios from "axios";

const TOKEN_OPENPROVIDER = process.env.TOKEN_OPENPROVIDER;


export const listCustomers = async (limit?: number, offset?: number) => {
    try {

        let params = {limit: limit, offset: offset, order: "desc"};
        if (limit === undefined || limit === null || limit <= 0) delete params.limit;
        if (offset === undefined || offset === null || offset < 0) delete params.offset;

        const res = await axios.get(`https://api.openprovider.eu/v1beta/customers`, {
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': TOKEN_OPENPROVIDER
            },
            params: params
        })

        return res?.data?.data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            console.log("checkDomainAvailability err", err.response.data);
            return null
        } else {
            console.log("checkDomainAvailability err", err);
            return null
        }
    }
};

export const getCustomer = async (handle: string) => {
    try {
        const res = await axios.get(`https://api.openprovider.eu/v1beta/customers/${handle}`, {
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': TOKEN_OPENPROVIDER
            }
        })

        return res?.data?.data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            console.log("checkDomainAvailability err", err.response.data);
            return null
        } else {
            console.log("checkDomainAvailability err", err);
            return null
        }
    }
};


interface CreateCustomerI {
    "company_name"?: string;
    "name": {
        "first_name": string;
        "last_name": string;
        "full_name": string;
        "initials": string;
        "prefix": string;
    }
    "address": {
        "street": string;
        "number": string;
        "city": string;
        "zipcode": string;
        "state": string;
        "country": string;
    };
    "phone": {
        "area_code": string;
        "country_code": string;
        "subscriber_number": string;
    };
    "fax"?: {
        "area_code": string;
        "country_code": string;
        "subscriber_number": string;
    }
    "email": string;
    "tags"?: {
        "key": string;
        "value": string;
    }[];
    "vat": string;
}
export const createCustomer = async ({company_name, name, address, phone, fax, email, tags, vat }: CreateCustomerI) => {
    try {

        const res = await axios.post(`https://api.openprovider.eu/v1beta/customers`, JSON.stringify({
            "company_name": company_name,
            "name": name,
            "email": email,
            "address": address,
            "fax": fax,
            "phone": phone,
            "tags": tags,
            "vat": vat || ""
        }), {
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': TOKEN_OPENPROVIDER
            },
        })

        return res?.data?.data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            console.log("checkDomainAvailability err", err.response.data);
            return null
        } else {
            console.log("checkDomainAvailability err", err);
            return null
        }
    }
};


interface UpdateCustomerI {
    "company_name"?: string;
    "name"?: {
        "first_name": string;
        "last_name": string;
        "full_name": string;
        "initials": string;
        "prefix": string;
    }
    "address"?: {
        "street": string;
        "number": string;
        "city": string;
        "zipcode": string;
        "state": string;
        "country": string;
    };
    "phone"?: {
        "area_code": string;
        "country_code": string;
        "subscriber_number": string;
    };
    "fax"?: {
        "area_code": string;
        "country_code": string;
        "subscriber_number": string;
    }
    "email"?: string;
    "tags"?: {
        "key": string;
        "value": string;
    }[];
    "vat"?: string;
}
export const updateCustomer = async (id: string, {company_name, name, address, phone, fax, email, tags, vat }: UpdateCustomerI) => {
    try {
        const res = await axios.put(`https://api.openprovider.eu/v1beta/customers/${id}`, JSON.stringify({
            "company_name": company_name,
            "name": name,
            "email": email,
            "address": address,
            "fax": fax,
            "phone": phone,
            "tags": tags,
            "vat": vat || ""
        }), {
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': TOKEN_OPENPROVIDER
            },
        })

        return res?.data?.data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            console.log("checkDomainAvailability err", err.response.data);
            return null
        } else {
            console.log("checkDomainAvailability err", err);
            return null
        }
    }
};


export const checkDomainAvailability = async ({name, extension}: {"name": string, "extension": string}) => {
    try {
        if (!name) return null
        if (!extension || extension == "") extension = "com"

        const res = await axios.post(`https://api.openprovider.eu/v1beta/domains/check`, JSON.stringify({
            "domains": [{
                "name": name,
                "extension": extension
            }],
            "with_price": true
        }), {
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': TOKEN_OPENPROVIDER
            },
        })


        return res?.data?.data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            console.log("checkDomainAvailability err", err.response.data);
            return null
        } else {
            console.log("checkDomainAvailability err", err);
            return null
        }
    }
};


interface RegisterDomainI {
    "domain": {
        "name": string,
        "extension": string
    },
    "customer": string,
    "name_servers": {
        "name": string
    }[],
    "autorenew"?: "on" | "off" | "default"
}
export const registerDomain = async ({domain, customer, name_servers, autorenew }: RegisterDomainI) => {
    try {

        const res = await axios.post(`https://api.openprovider.eu/v1beta/domains`, JSON.stringify({
            "admin_handle": customer ,
            "billing_handle": customer ,
            "owner_handle": customer ,
            "tech_handle": customer ,
            "domain": domain,
            "period": "1",
            "name_servers": name_servers,
            "autorenew": autorenew || "no"
        }), {
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': TOKEN_OPENPROVIDER
            },
        })


        return res?.data?.data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            console.log("checkDomainAvailability err", err.response.data);
            return null
        } else {
            console.log("checkDomainAvailability err", err);
            return null
        }
    }
};


interface UpdateDomainI {
    "customer": string,
    "name_servers": {
        "name": string
    }[],
    "autorenew"?: "on" | "off" | "default"
}
export const updateDomain = async (id: string, {customer, name_servers, autorenew }: UpdateDomainI) => {
    try {

        const res = await axios.put(`https://api.openprovider.eu/v1beta/domains/${id}`, JSON.stringify({
            "admin_handle": customer,
            "owner_handle": customer,
            "name_servers": name_servers,
            "autorenew": autorenew || "no"
        }), {
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': TOKEN_OPENPROVIDER
            },
        })


        return res?.data?.data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            console.log("checkDomainAvailability err", err.response.data);
            return null
        } else {
            console.log("checkDomainAvailability err", err);
            return null
        }
    }
};


interface RenewDomainI {
    "domain": {
        "name": string,
        "extension": string
    },
    "period": number
}
export const renewDomain = async (id: string, {domain, period }: RenewDomainI) => {
    try {

        const res = await axios.put(`https://api.openprovider.eu/v1beta/domains/${id}/renew`, JSON.stringify({
            "id": id ,
            "domain": domain ,
            "period": period || 1
        }), {
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': TOKEN_OPENPROVIDER
            },
        })


        return res?.data?.data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            console.log("checkDomainAvailability err", err.response.data);
            return null
        } else {
            console.log("checkDomainAvailability err", err);
            return null
        }
    }
};


export const listZone = async (limit?: number, offset?: number) => {
    try {

        let params = {
            limit: limit || 100, offset: offset || 0,
            "order_by.modification_date": "desc"
        };
        if (limit === undefined || limit === null || limit <= 0) delete params.limit;
        if (offset === undefined || offset === null || offset < 0) delete params.offset;

        const res = await axios.get(`https://api.openprovider.eu/v1beta/dns/zones`, {
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': TOKEN_OPENPROVIDER
            },
            params: params
        })

        return res?.data?.data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            console.log("checkDomainAvailability err", err.response.data);
            return null
        } else {
            console.log("checkDomainAvailability err", err);
            return null
        }
    }
};

interface RecordZoneI {
    "name": string
    "prio": number
    "ttl": number
    "type": "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS" | "SRV" | "CAA" | "PTR"
    "value": string
}

interface CreateZoneI {
    "domain": {
        "name": string,
        "extension": string
    },
    "records": RecordZoneI[],
    "type"?: "master" | "slave"
}
export const createZone = async ({domain, type, records }: CreateZoneI) => {
    try {

        const res = await axios.post(`https://api.openprovider.eu/v1beta/dns/zones`, JSON.stringify({
            "domain": domain,
            "type": type || "master",
            "is_spamexperts_enabled": "on",
            "records": records
        }), {
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': TOKEN_OPENPROVIDER
            },
        })


        return res?.data?.data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            console.log("checkDomainAvailability err", err.response.data);
            return null
        } else {
            console.log("checkDomainAvailability err", err);
            return null
        }
    }
};

interface UpdateZoneI {
    "domain": {
        "name": string,
        "extension": string
    },
    "records": {
        "add": RecordZoneI[]
        "remove": RecordZoneI[]
        "replace": RecordZoneI[]
        "update": {
            "original_record": RecordZoneI
            "record": RecordZoneI
        }[]
    },
    "type"?: "master" | "slave"
}
export const updateZone = async (name: string, {domain, type, records }: UpdateZoneI) => {
    try {

        const res = await axios.put(`https://api.openprovider.eu/v1beta/dns/zones/${name}`, JSON.stringify({
            "domain": domain,
            "type": type || "master",
            "is_spamexperts_enabled": "on",
            "records": records
        }), {
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': TOKEN_OPENPROVIDER
            },
        })


        return res?.data?.data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            console.log("checkDomainAvailability err", err.response.data);
            return null
        } else {
            console.log("checkDomainAvailability err", err);
            return null
        }
    }
};

