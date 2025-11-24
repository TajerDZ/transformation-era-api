import {FilterQuery, Types} from "mongoose";
import {PermissionGroupI, User} from "../models/index.js";
import {createCustomer, getCustomer, registerDomain} from "./Domains.js";

export const checkPermission = async (requires: string[], permissionGroup: PermissionGroupI, ) => {
    try {
        if (!permissionGroup) {
            console.log("if01")
            return {
                status: false,
                msg: `You do not have access to: ${requires.join(", ")}`
            }
        }

        const permissionList = permissionGroup?.permissions

        if (!permissionGroup?.permissions || permissionGroup?.permissions?.length === 0) {
            console.log("if02")
            return {
                status: false,
                msg: `You do not have access to: ${requires.join(", ")}`
            }
        }

        const requiredPermission = await Promise.all(permissionList?.filter(row => requires.includes(row.table)));

        if (requiredPermission === undefined || requiredPermission?.length === 0) {
            console.log("if03")
            return {
                status: false,
                msg: `You do not have access to: ${requires.join(", ")}`
            }
        }

        const blockedPermission = await Promise.all(requiredPermission?.filter(row => row.allowedAll == false ));

        if (blockedPermission?.length > 0) {
            console.log("if04")
            return {
                status: false,
                msg: `You do not have access to: ${requires.join(", ")}`
            }
        }

        return true
    } catch (error) {
        console.error(error)
        return {
            status: false,
            msg: `You do not have access to: ${requires.join(", ")}`
        }
    }
}

export const buildFilter = async (conditions: any[]) => {
    try {
        const query: FilterQuery<any>[] = [];

        for (let i = 0; i < conditions.length; i++) {
            const { field, operator, value } = conditions[i];

            const parsedValue = operator === '$in'
                ? JSON.parse(value)
                : Types.ObjectId.isValid(value) ? new Types.ObjectId(value) : value;

            const conditionQuery = { [field]: { [operator]: parsedValue } };

            if (field === "createdAt" && value.includes(",")) {
                const [start, end] = value.split(",").map((v) => new Date(v.trim()));

                query.push({[field]: {$gte: start, $lte: end}});
            } else {
                query.push(conditionQuery); // Default to AND
            }
        }

        return { $and: [...query] };
    } catch (error) {
        console.log("Error buildFilter:", error)
        throw new Error(error)
    }
}

export const createDomainInOpenProvider = async (idUser: string, domain: string, ) => {
    try {
        const client = await User.findById(idUser)
        let customer = null
        if (client?.idCustomerOpenProvider === undefined || client?.idCustomerOpenProvider === null || client?.idCustomerOpenProvider === "") {
            const customerCreated = await createCustomer({
                "company_name": "",
                "name": {
                    "first_name": client?.firstname,
                    "last_name": client?.lastname,
                    "full_name": client.firstname + " " + client.lastname,
                    "initials": client.firstname[0] + client.lastname[0],
                    "prefix": "",
                },
                "address": {
                    "street": "",
                    "number": "",
                    "city": "",
                    "zipcode": "",
                    "state": "",
                    "country": ""
                },
                "phone": parsePhone(client?.phone),
                "email": client?.email,
                "vat": ""
            })

            if (customerCreated !== null && customerCreated?.handle !== undefined) {
                customer = customerCreated?.handle
                await User.findByIdAndUpdate(idUser, {
                    idCustomerOpenProvider: customerCreated?.handle
                })
            }
        }

        const data = await registerDomain({
            "domain": parseDomain(domain),
            "customer": customer,
            "name_servers": [],
            "autorenew": "on"
        })
        return data
    } catch (error) {
        console.error(error)
        return null
    }
}

interface Phone {
    area_code: string;
    country_code: string;
    subscriber_number: string;
}

export function parsePhone(input: string, defaultCountryCode: string = "+966"): Phone {
    let phone = input.trim().replace(/[^0-9+]/g, "");

    // 1) إذا يبدأ بـ +
    if (phone.startsWith("+")) {
        const countryCodeMatch = phone.match(/^\+\d{1,3}/);
        const country_code = countryCodeMatch ? countryCodeMatch[0] : defaultCountryCode;

        const rest = phone.replace(country_code, "");
        const area_code = rest.slice(0, 2);
        const subscriber_number = rest.slice(2);

        return { country_code, area_code, subscriber_number };
    }

    // 2) إذا يبدأ بـ 00
    if (phone.startsWith("00")) {
        phone = "+" + phone.slice(2);
        return parsePhone(phone, defaultCountryCode);
    }

    // 3) إذا يبدأ برمز دولة بدون +
    if (/^966\d+/.test(phone)) {
        phone = "+" + phone;
        return parsePhone(phone, defaultCountryCode);
    }

    // 4) رقم محلي سعودي يبدأ بـ 05
    if (/^05\d{8}$/.test(phone)) {
        const subscriber_number = phone.slice(3); // بعد 05X → نأخذ آخر 7 أرقام
        return {
            country_code: defaultCountryCode,
            area_code: phone.slice(1, 3), // 5X
            subscriber_number,
        };
    }

    // 5) رقم محلي يبدأ بـ 0
    if (/^0\d+/.test(phone)) {
        const area_code = phone.slice(1, 3);
        const subscriber_number = phone.slice(3);
        return {
            country_code: defaultCountryCode,
            area_code,
            subscriber_number,
        };
    }

    // 6) إذا دخل رقم بدون أي شيء (نفترض سعودي)
    if (/^\d{9}$/.test(phone)) {
        return {
            country_code: defaultCountryCode,
            area_code: phone.slice(0, 2),
            subscriber_number: phone.slice(2),
        };
    }

    return null
}

export function parseDomain(domain) {
    domain = domain.trim().toLowerCase();

    // إزالة البروتوكول إن وجد
    domain = domain.replace(/^https?:\/\//, "");

    // إزالة www.
    domain = domain.replace(/^www\./, "");

    const parts = domain.split(".");

    if (parts.length < 2) {
        throw new Error("Domain غير صالح");
    }

    // الامتدادات المركّبة مثل: co.uk – com.sa – gov.ma
    const commonMultiExtensions = [
        "co.uk", "co.jp", "com.sa", "com.eg", "com.ma", "com.tn", "co.ma", "co.za", "com.tr"
    ];

    const lastTwo = parts.slice(-2).join(".");

    let extension;
    let name;

    if (commonMultiExtensions.includes(lastTwo)) {
        extension = lastTwo;
        name = parts.slice(0, -2).join(".");
    } else {
        extension = parts.pop(); // آخر جزء
        name = parts.join(".");
    }

    return {
        name,
        extension
    };
}
