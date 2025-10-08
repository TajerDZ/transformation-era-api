import axios from "axios";

const MOYASAR_KEY = "pk_test_cxGD5io7sai4hXrY6tFuxawCBwCd839YN6uQrFjh";
const MOYASAR_SECRET = "sk_test_u5cqDbMjuifK5kt7maFs96EQ28T4WwfgYwQ34Q1j";
// const MOYASAR_CALLBACK_URL = "http://localhost:4000/payment/callback";
const MOYASAR_CALLBACK_URL = "https://transformation-era-api.bi3li.shop/payment/callback";

export const createPaymentsMoyasar = async (data: any) => {
    try {
        const {amount, description, source} = data;

        let dataPayment = JSON.stringify({
            "amount": amount,
            "currency": "SAR",
            "description": description,
            "callback_url": MOYASAR_CALLBACK_URL,
            "publishable_api_key": MOYASAR_KEY,
            "source": {
                "type": "creditcard",
                "name": source.name,
                "number": source.number,
                "month": source.month,
                "year": source.year,
                "cvc": source.cvc
            }
        })

        const response = await axios.post(`https://api.moyasar.com/v1/payments`, dataPayment, {
            headers: {
                'Content-Type': 'application/json'
            },
            auth: {
                username: MOYASAR_SECRET,
                password: ""
            }
        });

        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const verifyPaymentsMoyasar = async (paymentId: string) => {
    try {
        const response = await axios.get(`https://api.moyasar.com/v1/payments/${paymentId}`, {
            auth: {
                username: MOYASAR_SECRET,
                password: "",
            },
        });

        return response.data;
    } catch (error) {
        console.error(error.data);
        throw error;
    }
}

export const createInvoiceMoyasar = async (data: any) => {
    try {
        const {amount, description, idInvoice} = data;

        let dataPayment = JSON.stringify({
            "amount": amount,
            "currency": "SAR",
            "description": description,
            "callback_url": `${MOYASAR_CALLBACK_URL}/${idInvoice}`,
            "success_url": null,
            "back_url": null,
            "expired_at": null
        })

        const response = await axios.post(`https://api.moyasar.com/v1/invoices`, dataPayment, {
            headers: {
                'Content-Type': 'application/json'
            },
            auth: {
                username: MOYASAR_SECRET,
                password: ""
            }
        });

        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

