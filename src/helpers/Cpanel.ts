import axios from "axios";
import {Agent} from "https";
//https://s3474.fra1.stableserver.net:2087/TPEVASUTMUI9I0I93JJCYMR9YNPEL65A/json-api/accountsummary?api.version=2&user=maarifte
export const getAllAccounts = async () => {
    try {
        return await axios.get('https://s3474.fra1.stableserver.net:2087/json-api/listaccts?api.version=1', {
            headers: {
                Authorization: `whm maarifte:TPEVASUTMUI9I0I93JJCYMR9YNPEL65A`
            },
            httpsAgent: new Agent({ rejectUnauthorized: false }) // فقط عند وجود مشاكل شهادة SSL
        });
    } catch (err) {
        console.error('Error fetching accounts:', err);
    }
};

export const getAccountDetail = async (username: string) => {
    try {
        return await axios.get(`https://s3474.fra1.stableserver.net:2087/json-api/accountsummary?api.version=1&domain=${username}`, {
            headers: {
                Authorization: `whm maarifte:TPEVASUTMUI9I0I93JJCYMR9YNPEL65A`
            },
            httpsAgent: new Agent({ rejectUnauthorized: false }) // فقط عند وجود مشاكل شهادة SSL
        });
    } catch (err) {
        console.error('Error fetching accounts:', err);
    }
};

export const getِCpanel = async (username: string) => {
    try {
        return await axios.get(`https://s3474.fra1.stableserver.net:2087/json-api/accountsummary?api.version=1&domain=${username}`, {
            headers: {
                Authorization: `whm maarifte:TPEVASUTMUI9I0I93JJCYMR9YNPEL65A`
            },
            httpsAgent: new Agent({ rejectUnauthorized: false }) // فقط عند وجود مشاكل شهادة SSL
        });
    } catch (err) {
        console.error('Error fetching accounts:', err);
    }
};