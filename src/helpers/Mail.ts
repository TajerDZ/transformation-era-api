import nodemailer from "nodemailer";
import 'dotenv/config'


const transporter = nodemailer.createTransport({
    host: "mail.sendibad.shop",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "noreply@sendibad.shop",
        pass: "+00B*sG-3@5x\\Xu",
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const bodyVerificationMail = (token: string) => {
    return `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
            <head>
                <title></title>
                <meta charset="UTF-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <!--[if !mso]>-->
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <!--<![endif]-->
                <meta name="x-apple-disable-message-reformatting" content="" />
                <meta content="target-densitydpi=device-dpi" name="viewport" />
                <meta content="true" name="HandheldFriendly" />
                <meta content="width=device-width" name="viewport" />
                <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
                <style type="text/css">
                    table {
                        border-collapse: separate;
                        table-layout: fixed;
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt
                    }
                    table td {
                        border-collapse: collapse
                    }
                    .ExternalClass {
                        width: 100%
                    }
                    .ExternalClass,
                    .ExternalClass p,
                    .ExternalClass span,
                    .ExternalClass font,
                    .ExternalClass td,
                    .ExternalClass div {
                        line-height: 100%
                    }
                    body, a, li, p, h1, h2, h3 {
                        -ms-text-size-adjust: 100%;
                        -webkit-text-size-adjust: 100%;
                    }
                    html {
                        -webkit-text-size-adjust: none !important
                    }
                    body, #innerTable {
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale
                    }
                    #innerTable img+div {
                        display: none;
                        display: none !important
                    }
                    img {
                        Margin: 0;
                        padding: 0;
                        -ms-interpolation-mode: bicubic
                    }
                    h1, h2, h3, p, a {
                        line-height: inherit;
                        overflow-wrap: normal;
                        white-space: normal;
                        word-break: break-word
                    }
                    a {
                        text-decoration: none
                    }
                    h1, h2, h3, p {
                        min-width: 100%!important;
                        width: 100%!important;
                        max-width: 100%!important;
                        display: inline-block!important;
                        border: 0;
                        padding: 0;
                        margin: 0
                    }
                    a[x-apple-data-detectors] {
                        color: inherit !important;
                        text-decoration: none !important;
                        font-size: inherit !important;
                        font-family: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important
                    }
                    u + #body a {
                        color: inherit;
                        text-decoration: none;
                        font-size: inherit;
                        font-family: inherit;
                        font-weight: inherit;
                        line-height: inherit;
                    }
                    a[href^="mailto"],
                    a[href^="tel"],
                    a[href^="sms"] {
                        color: inherit;
                        text-decoration: none
                    }
                </style>
                <style type="text/css">
                    @media (min-width: 481px) {
                        .hd { display: none!important }
                    }
                </style>
                <style type="text/css">
                    @media (max-width: 480px) {
                        .hm { display: none!important }
                    }
                </style>
                <style type="text/css">
                    @media (max-width: 480px) {
                        .t29,.t34{mso-line-height-alt:0px!important;line-height:0!important;display:none!important}.t30{padding-top:43px!important}.t32{border:0!important;border-radius:0!important}.t27,.t9{width:320px!important}.t21{text-align:left!important}.t20{vertical-align:top!important;width:600px!important}
                    }
                </style>
                <!--[if !mso]>-->
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600&amp;family=Inter+Tight:wght@700&amp;display=swap" rel="stylesheet" type="text/css" />
                <!--<![endif]-->
                <!--[if mso]>
                <xml>
                    <o:OfficeDocumentSettings>
                        <o:AllowPNG/>
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                </xml>
                <![endif]-->
            </head>
            <body id="body" class="t37" style="min-width:100%;Margin:0px;padding:0px;background-color:#F9F9F9;">
                <div class="t36" style="background-color:#F9F9F9;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center">
                        <tr>
                            <td class="t35" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#F9F9F9;background-image:none;background-repeat:repeat;background-size:auto;background-position:center top;" valign="top" align="center">
                                <!--[if mso]>
                                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
                                    <v:fill color="#F9F9F9"/>
                                </v:background>
                                <![endif]-->
                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable">
                                    <tr>
                                        <td>
                                            <div class="t29" style="mso-line-height-rule:exactly;mso-line-height-alt:70px;line-height:70px;font-size:1px;display:block;">&nbsp;&nbsp;</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center">
                                            <table class="t33" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
                                                <tr>
                                                    <!--[if mso]>
                                                    <td width="400" class="t32" style="background-color:#FFFFFF;border:1px solid #CECECE;overflow:hidden;width:400px;border-radius:20px 20px 20px 20px;">
                                                    <![endif]-->
                                                    <!--[if !mso]>-->
                                                    <td class="t32" style="background-color:#FFFFFF;border:1px solid #CECECE;overflow:hidden;width:400px;border-radius:20px 20px 20px 20px;">
                                                        <!--<![endif]-->
                                                        <table class="t31" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;">
                                                            <tr>
                                                                <td class="t30" style="padding:50px 40px 40px 40px;">
                                                                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;">
                                                                        <tr>
                                                                            <td align="center">
                                                                                <table class="t4" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
                                                                                    <tr>
                                                                                    <!--[if mso]>
                                                                                        <td width="60" class="t3" style="width:60px;">
                                                                                        <![endif]-->
                                                                                        <!--[if !mso]>-->
                                                                                        <td class="t3" style="width:60px;">
                                                                                            <!--<![endif]-->
                                                                                            <table class="t2" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;">
                                                                                                <tr>
                                                                                                    <td class="t1">
                                                                                                        <a href="#" style="font-size:0px;" target="_blank">
                                                                                                            <img class="t0" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="60" height="59.0625" alt="" src="https://7cadea54-6fc6-4d13-98fc-cf4a60a1b0af.b-cdn.net/e/157f4875-6459-483f-a6eb-3f74af0af82f/97773ff9-dac8-496d-9f0a-5524728406f6.png"/>
                                                                                                        </a>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div class="t5" style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="center">
                                                                                <table class="t10" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
                                                                                    <tr>
                                                                                        <!--[if mso]>
                                                                                        <td width="318" class="t9" style="width:318px;">
                                                                                        <![endif]-->
                                                                                        <!--[if !mso]>-->
                                                                                        <td class="t9" style="width:318px;">
                                                                                            <!--<![endif]-->
                                                                                            <table class="t8" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;">
                                                                                                <tr>
                                                                                                    <td class="t7">
                                                                                                        <h1 class="t6" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:28px;font-weight:600;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:-1.2px;direction:ltr;color:#111111;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px;">
                                                                                                            Please verify your email 😀
                                                                                                        </h1>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div class="t12" style="mso-line-height-rule:exactly;mso-line-height-alt:17px;line-height:17px;font-size:1px;display:block;">&nbsp;&nbsp;</div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="center">
                                                                                <table class="t16" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
                                                                                    <tr>
                                                                                        <!--[if mso]>
                                                                                        <td width="308" class="t15" style="width:308px;">
                                                                                        <![endif]-->
                                                                                        <!--[if !mso]>-->
                                                                                        <td class="t15" style="width:308px;">
                                                                                            <!--<![endif]-->
                                                                                            <table class="t14" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;">
                                                                                                <tr>
                                                                                                    <td class="t13">
                                                                                                        <p class="t11" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:15px;text-decoration:none;text-transform:none;letter-spacing:-0.6px;direction:ltr;color:#5E5E5E;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                                                            To use Sindbad, enter the verification code in the platform. This helps keep your account secure 🔒
                                                                                                        </p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="center">
                                                                                <table class="t28" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
                                                                                    <tr>
                                                                                        <!--[if mso]>
                                                                                        <td width="318" class="t27" style="width:318px;">
                                                                                        <![endif]-->
                                                                                        <!--[if !mso]>-->
                                                                                        <td class="t27" style="width:318px;">
                                                                                            <!--<![endif]-->
                                                                                            <table class="t26" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;">
                                                                                                <tr>
                                                                                                    <td class="t25" style="padding:20px 15px 20px 15px;">
                                                                                                        <div class="t24" style="width:100%;text-align:left;">
                                                                                                            <div class="t23" style="display:inline-block;">
                                                                                                                <table class="t22" role="presentation" cellpadding="0" cellspacing="0" align="left" valign="top">
                                                                                                                    <tr class="t21">
                                                                                                                        <td></td>
                                                                                                                        <td class="t20" width="288" valign="top">
                                                                                                                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t19" style="width:100%;">
                                                                                                                                <tr>
                                                                                                                                    <td class="t18">
                                                                                                                                        <h1 class="t17" style="margin:0;Margin:0;font-family:Inter Tight,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:700;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:6px;direction:ltr;color:#333333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                                                                                            ${token}
                                                                                                                                        </h1>
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                            </table>
                                                                                                                        </td>
                                                                                                                        <td></td>
                                                                                                                    </tr>
                                                                                                                </table>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="t34" style="mso-line-height-rule:exactly;mso-line-height-alt:70px;line-height:70px;font-size:1px;display:block;">&nbsp;&nbsp;</div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="gmail-fix" style="display: none; white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div>
            </body>
        </html>
    `
}
export const verificationMail = async (mail: {to: string; token: string;}) => {
    try {

        const info = await transporter.sendMail({
            from: '"Sendibad" <noreply@sendibad.shop>',
            to: mail.to,
            subject: "Verify email",
            html: bodyVerificationMail(mail.token),
            text: `Please verify your email 😀. To use Sindbad, enter the verification code in the platform. This helps keep your account secure 🔒. ${mail.token}.`
        });

        console.log("Message sent: %s", info.messageId);

        return info
    }  catch (error) {
        console.log('error =========> ')
        console.error(error)
        return false
    }
};

const bodyForgetPassword = (token: string) => {

    return `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
            <head>
                <title></title>
                <meta charset="UTF-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <!--[if !mso]>-->
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <!--<![endif]-->
                <meta name="x-apple-disable-message-reformatting" content="" />
                <meta content="target-densitydpi=device-dpi" name="viewport" />
                <meta content="true" name="HandheldFriendly" />
                <meta content="width=device-width" name="viewport" />
                <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
                <style type="text/css">
                    table {
                        border-collapse: separate;
                        table-layout: fixed;
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt
                    }
                    table td {
                        border-collapse: collapse
                    }
                    .ExternalClass {
                        width: 100%
                    }
                    .ExternalClass,
                    .ExternalClass p,
                    .ExternalClass span,
                    .ExternalClass font,
                    .ExternalClass td,
                    .ExternalClass div {
                        line-height: 100%
                    }
                    body, a, li, p, h1, h2, h3 {
                        -ms-text-size-adjust: 100%;
                        -webkit-text-size-adjust: 100%;
                    }
                    html {
                        -webkit-text-size-adjust: none !important
                    }
                    body, #innerTable {
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale
                    }
                    #innerTable img+div {
                        display: none;
                        display: none !important
                    }
                    img {
                        Margin: 0;
                        padding: 0;
                        -ms-interpolation-mode: bicubic
                    }
                    h1, h2, h3, p, a {
                        line-height: inherit;
                        overflow-wrap: normal;
                        white-space: normal;
                        word-break: break-word
                    }
                    a {
                        text-decoration: none
                    }
                    h1, h2, h3, p {
                        min-width: 100%!important;
                        width: 100%!important;
                        max-width: 100%!important;
                        display: inline-block!important;
                        border: 0;
                        padding: 0;
                        margin: 0
                    }
                    a[x-apple-data-detectors] {
                        color: inherit !important;
                        text-decoration: none !important;
                        font-size: inherit !important;
                        font-family: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important
                    }
                    u + #body a {
                        color: inherit;
                        text-decoration: none;
                        font-size: inherit;
                        font-family: inherit;
                        font-weight: inherit;
                        line-height: inherit;
                    }
                    a[href^="mailto"],
                    a[href^="tel"],
                    a[href^="sms"] {
                        color: inherit;
                        text-decoration: none
                    }
                </style>
                <style type="text/css">
                    @media (min-width: 481px) {
                        .hd { display: none!important }
                    }
                </style>
                <style type="text/css">
                    @media (max-width: 480px) {
                        .hm { display: none!important }
                    }
                </style>
                <style type="text/css">
                    @media (max-width: 480px) {
                        .t29,.t34{mso-line-height-alt:0px!important;line-height:0!important;display:none!important}.t30{padding-top:43px!important}.t32{border:0!important;border-radius:0!important}.t27,.t9{width:320px!important}.t21{text-align:left!important}.t20{vertical-align:top!important;width:600px!important}
                    }
                </style>
                <!--[if !mso]>-->
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600&amp;family=Inter+Tight:wght@700&amp;display=swap" rel="stylesheet" type="text/css" />
                <!--<![endif]-->
                <!--[if mso]>
                <xml>
                    <o:OfficeDocumentSettings>
                        <o:AllowPNG/>
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                </xml>
                <![endif]-->
            </head>
            <body id="body" class="t37" style="min-width:100%;Margin:0px;padding:0px;background-color:#F9F9F9;">
                <div class="t36" style="background-color:#F9F9F9;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center">
                        <tr>
                            <td class="t35" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#F9F9F9;background-image:none;background-repeat:repeat;background-size:auto;background-position:center top;" valign="top" align="center">
                                <!--[if mso]>
                                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
                                    <v:fill color="#F9F9F9"/>
                                </v:background>
                                <![endif]-->
                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable">
                                    <tr>
                                        <td>
                                            <div class="t29" style="mso-line-height-rule:exactly;mso-line-height-alt:70px;line-height:70px;font-size:1px;display:block;">&nbsp;&nbsp;</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center">
                                            <table class="t33" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
                                                <tr>
                                                    <!--[if mso]>
                                                    <td width="400" class="t32" style="background-color:#FFFFFF;border:1px solid #CECECE;overflow:hidden;width:400px;border-radius:20px 20px 20px 20px;">
                                                    <![endif]-->
                                                    <!--[if !mso]>-->
                                                    <td class="t32" style="background-color:#FFFFFF;border:1px solid #CECECE;overflow:hidden;width:400px;border-radius:20px 20px 20px 20px;">
                                                        <!--<![endif]-->
                                                        <table class="t31" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;">
                                                            <tr>
                                                                <td class="t30" style="padding:50px 40px 40px 40px;">
                                                                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;">
                                                                        <tr>
                                                                            <td align="center">
                                                                                <table class="t4" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
                                                                                    <tr>
                                                                                    <!--[if mso]>
                                                                                        <td width="60" class="t3" style="width:60px;">
                                                                                        <![endif]-->
                                                                                        <!--[if !mso]>-->
                                                                                        <td class="t3" style="width:60px;">
                                                                                            <!--<![endif]-->
                                                                                            <table class="t2" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;">
                                                                                                <tr>
                                                                                                    <td class="t1">
                                                                                                        <a href="#" style="font-size:0px;" target="_blank">
                                                                                                            <img class="t0" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="60" height="59.0625" alt="" src="https://7cadea54-6fc6-4d13-98fc-cf4a60a1b0af.b-cdn.net/e/157f4875-6459-483f-a6eb-3f74af0af82f/97773ff9-dac8-496d-9f0a-5524728406f6.png"/>
                                                                                                        </a>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div class="t5" style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="center">
                                                                                <table class="t10" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
                                                                                    <tr>
                                                                                        <!--[if mso]>
                                                                                        <td width="318" class="t9" style="width:318px;">
                                                                                        <![endif]-->
                                                                                        <!--[if !mso]>-->
                                                                                        <td class="t9" style="width:318px;">
                                                                                            <!--<![endif]-->
                                                                                            <table class="t8" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;">
                                                                                                <tr>
                                                                                                    <td class="t7">
                                                                                                        <h1 class="t6" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:28px;font-weight:600;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:-1.2px;direction:ltr;color:#111111;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px;">
                                                                                                            Please verify your email 😀
                                                                                                        </h1>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div class="t12" style="mso-line-height-rule:exactly;mso-line-height-alt:17px;line-height:17px;font-size:1px;display:block;">&nbsp;&nbsp;</div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="center">
                                                                                <table class="t16" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
                                                                                    <tr>
                                                                                        <!--[if mso]>
                                                                                        <td width="308" class="t15" style="width:308px;">
                                                                                        <![endif]-->
                                                                                        <!--[if !mso]>-->
                                                                                        <td class="t15" style="width:308px;">
                                                                                            <!--<![endif]-->
                                                                                            <table class="t14" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;">
                                                                                                <tr>
                                                                                                    <td class="t13">
                                                                                                        <p class="t11" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:15px;text-decoration:none;text-transform:none;letter-spacing:-0.6px;direction:ltr;color:#5E5E5E;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                                                            To reset your password on Sindbad, enter the verification code in the platform 🔒
                                                                                                        </p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td align="center">
                                                                                <table class="t28" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
                                                                                    <tr>
                                                                                        <!--[if mso]>
                                                                                        <td width="318" class="t27" style="width:318px;">
                                                                                        <![endif]-->
                                                                                        <!--[if !mso]>-->
                                                                                        <td class="t27" style="width:318px;">
                                                                                            <!--<![endif]-->
                                                                                            <table class="t26" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;">
                                                                                                <tr>
                                                                                                    <td class="t25" style="padding:20px 15px 20px 15px;">
                                                                                                        <div class="t24" style="width:100%;text-align:left;">
                                                                                                            <div class="t23" style="display:inline-block;">
                                                                                                                <table class="t22" role="presentation" cellpadding="0" cellspacing="0" align="left" valign="top">
                                                                                                                    <tr class="t21">
                                                                                                                        <td></td>
                                                                                                                        <td class="t20" width="288" valign="top">
                                                                                                                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t19" style="width:100%;">
                                                                                                                                <tr>
                                                                                                                                    <td class="t18">
                                                                                                                                        <h1 class="t17" style="margin:0;Margin:0;font-family:Inter Tight,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:700;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:6px;direction:ltr;color:#333333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                                                                                            ${token}
                                                                                                                                        </h1>
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                            </table>
                                                                                                                        </td>
                                                                                                                        <td></td>
                                                                                                                    </tr>
                                                                                                                </table>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="t34" style="mso-line-height-rule:exactly;mso-line-height-alt:70px;line-height:70px;font-size:1px;display:block;">&nbsp;&nbsp;</div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="gmail-fix" style="display: none; white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div>
            </body>
        </html>
    `
}
export const forgetPasswordMail = async (mail: {to: string; token: string;}) => {
    try {
        const info = await transporter.sendMail({
            from: '"Sendibad" <noreply@sendibad.shop>',
            to: mail.to,
            subject: "Recover password",
            html: bodyForgetPassword(mail.token),
            text: `Please verify your email 😀. To reset your password on Sindbad, enter the verification code in the platform 🔒. ${mail.token}.`
        });

        console.log("Message sent: %s", info.messageId);

        return info
    }  catch (error) {
        console.log('error =========> ')
        console.error(error)
        return false
    }
};

const bodyInviteUser = (email: string, name: string) => {

    return `
        <!--
        * This email was built using Tabular.
        * For more information, visit https://tabular.email
        -->
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html
                xmlns="http://www.w3.org/1999/xhtml"
                xmlns:v="urn:schemas-microsoft-com:vml"
                xmlns:o="urn:schemas-microsoft-com:office:office"
                lang="en"
        >
            <head>
                <title></title>
                <meta charset="UTF-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <!--[if !mso]>-->
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <!--<![endif]-->
                <meta name="x-apple-disable-message-reformatting" content="" />
                <meta content="target-densitydpi=device-dpi" name="viewport" />
                <meta content="true" name="HandheldFriendly" />
                <meta content="width=device-width" name="viewport" />
                <meta
                        name="format-detection"
                        content="telephone=no, date=no, address=no, email=no, url=no"
                />
                <style type="text/css">
                    table {
                        border-collapse: separate;
                        table-layout: fixed;
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                    }
                    table td {
                        border-collapse: collapse;
                    }
                    .ExternalClass {
                        width: 100%;
                    }
                    .ExternalClass,
                    .ExternalClass p,
                    .ExternalClass span,
                    .ExternalClass font,
                    .ExternalClass td,
                    .ExternalClass div {
                        line-height: 100%;
                    }
                    body,
                    a,
                    li,
                    p,
                    h1,
                    h2,
                    h3 {
                        -ms-text-size-adjust: 100%;
                        -webkit-text-size-adjust: 100%;
                    }
                    html {
                        -webkit-text-size-adjust: none !important;
                    }
                    body,
                    #innerTable {
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                    #innerTable img + div {
                        display: none;
                        display: none !important;
                    }
                    img {
                        margin: 0;
                        padding: 0;
                        -ms-interpolation-mode: bicubic;
                    }
                    h1,
                    h2,
                    h3,
                    p,
                    a {
                        line-height: inherit;
                        overflow-wrap: normal;
                        white-space: normal;
                        word-break: break-word;
                    }
                    a {
                        text-decoration: none;
                    }
                    h1,
                    h2,
                    h3,
                    p {
                        min-width: 100% !important;
                        width: 100% !important;
                        max-width: 100% !important;
                        display: inline-block !important;
                        border: 0;
                        padding: 0;
                        margin: 0;
                    }
                    a[x-apple-data-detectors] {
                        color: inherit !important;
                        text-decoration: none !important;
                        font-size: inherit !important;
                        font-family: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important;
                    }
                    u + #body a {
                        color: inherit;
                        text-decoration: none;
                        font-size: inherit;
                        font-family: inherit;
                        font-weight: inherit;
                        line-height: inherit;
                    }
                    a[href^="mailto"],
                    a[href^="tel"],
                    a[href^="sms"] {
                        color: inherit;
                        text-decoration: none;
                    }
                </style>
                <style type="text/css">
                    @media (min-width: 481px) {
                        .hd {
                            display: none !important;
                        }
                    }
                </style>
                <style type="text/css">
                    @media (max-width: 480px) {
                        .hm {
                            display: none !important;
                        }
                    }
                </style>
                <style type="text/css">
                    @media (max-width: 480px) {
                        .t29,
                        .t34 {
                            mso-line-height-alt: 0px !important;
                            line-height: 0 !important;
                            display: none !important;
                        }
                        .t30 {
                            padding-top: 43px !important;
                        }
                        .t32 {
                            border: 0 !important;
                            border-radius: 0 !important;
                        }
                        .t27,
                        .t9 {
                            width: 320px !important;
                        }
                        .t21 {
                            text-align: left !important;
                        }
                        .t20 {
                            vertical-align: top !important;
                            width: 600px !important;
                        }
                    }
                </style>
                <!--[if !mso]>-->
                <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600&amp;family=Lato:wght@700&amp;display=swap"
                        rel="stylesheet"
                        type="text/css"
                />
                <!--<![endif]-->
                <!--[if mso]>
                <xml>
                    <o:OfficeDocumentSettings>
                        <o:AllowPNG />
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                </xml>
                <![endif]-->
            </head>
            <body id="body" class="t37" style=" min-width: 100%; margin: 0px; padding: 0px; background-color: #f9f9f9; " >
            <div class="t36" style="background-color: #f9f9f9">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" >
                    <tr>
                        <td class="t35" style=" font-size: 0; line-height: 0; mso-line-height-rule: exactly; background-color: #f9f9f9; background-image: none; background-repeat: repeat; background-size: auto; background-position: center top;" valign="top" align="center">
                            <!--[if mso]>
                            <v:background
                                    xmlns:v="urn:schemas-microsoft-com:vml"
                                    fill="true"
                                    stroke="false"
                            >
                                <v:fill color="#F9F9F9" />
                            </v:background>
                            <![endif]-->
                            <table
                                    role="presentation"
                                    width="100%"
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    align="center"
                                    id="innerTable"
                            >
                                <tr>
                                    <td>
                                        <div class="t29" style=" mso-line-height-rule: exactly; mso-line-height-alt: 70px; line-height: 70px; font-size: 1px; display: block;">
                                            &nbsp;&nbsp;
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <table class="t33" role="presentation" cellpadding="0" cellspacing="0" style="margin-left: auto; margin-right: auto">
                                            <tr>
                                                <!--[if mso]>
                                                <td width="400" class="t32" style="background-color:#FFFFFF;border:1px solid #CECECE;overflow:hidden;width:400px;border-radius:20px 20px 20px 20px;">
                                                <![endif]-->
                                                <!--[if !mso]>-->
                                                <td class="t32" style=" background-color: #ffffff; border: 1px solid #cecece; overflow: hidden; width: 400px; border-radius: 20px 20px 20px 20px;">
                                                    <!--<![endif]-->
                                                    <table class="t31" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width: 100%">
                                                        <tr>
                                                            <td class="t30" style="padding: 50px 40px 40px 40px">
                                                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width: 100% !important">
                                                                    <tr>
                                                                        <td align="center">
                                                                            <table class="t4" role="presentation" cellpadding="0" cellspacing="0" style=" margin-left: auto; margin-right: auto;">
                                                                                <tr>
                                                                                    <!--[if mso]>
                                                                                    <td width="60" class="t3" style="width:60px;">
                                                                                    <![endif]-->
                                                                                    <!--[if !mso]>-->
                                                                                    <td class="t3" style="width: 60px">
                                                                                        <!--<![endif]-->
                                                                                        <table class="t2" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width: 100%">
                                                                                            <tr>
                                                                                                <td class="t1">
                                                                                                    <a href="#" style="font-size: 0px" target="_blank">
                                                                                                        <img class="t0" style=" display: block; border: 0; height: auto; width: 100%; margin: 0; max-width: 100%;" width="60" height="59.0625" alt="" src="https://7cadea54-6fc6-4d13-98fc-cf4a60a1b0af.b-cdn.net/e/157f4875-6459-483f-a6eb-3f74af0af82f/97773ff9-dac8-496d-9f0a-5524728406f6.png"/>
                                                                                                    </a>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td> class="t5" style=" mso-line-height-rule: exactly; mso-line-height-alt: 40px; line-height: 40px; font-size: 1px; display: block;">
                                                                            <div
                                                                                &nbsp;
                                                                                &nbsp;
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center">
                                                                            <table class="t10" role="presentation" cellpadding="0" cellspacing="0" style=" margin-left: auto; margin-right: auto;">
                                                                                <tr>
                                                                                    <!--[if mso]>
                                                                                    <td width="318" class="t9" style="width:318px;">
                                                                                    <![endif]-->
                                                                                    <!--[if !mso]>-->
                                                                                    <td class="t9" style="width: 318px">
                                                                                        <!--<![endif]-->
                                                                                        <table class="t8" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width: 100%">
                                                                                            <tr>
                                                                                                <td class="t7">
                                                                                                    <h1 class="t6" style=" margin: 0; margin: 0; margin-top: 20px; font-family: Inter, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif; line-height: 28px; font-weight: 600; font-style: normal; font-size: 24px; text-decoration: none; text-transform: none; letter-spacing: -1.2px; direction: ltr; color: #111111; text-align: center; mso-line-height-rule: exactly; mso-text-raise: 1px;">
                                                                                                        🎉 You&#39;ve Been Invited to Sindbad!
                                                                                                    </h1>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <div class="t12" style=" mso-line-height-rule: exactly; mso-line-height-alt: 17px; line-height: 17px; font-size: 1px; display: block;">
                                                                                &nbsp;&nbsp;
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center">
                                                                            <table class="t16" role="presentation" cellpadding="0" cellspacing="0" style=" margin-left: auto; margin-right: auto;">
                                                                                <tr>
                                                                                    <!--[if mso]>
                                                                                    <td width="308" class="t15" style="width:308px;">
                                                                                    <![endif]-->
                                                                                    <!--[if !mso]>-->
                                                                                    <td class="t15" style="width: 308px">
                                                                                        <!--<![endif]-->
                                                                                        <table class="t14" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width: 100%">
                                                                                            <tr>
                                                                                                <td class="t13">
                                                                                                    <p class="t11" style=" margin: 0; margin: 0; font-family: Inter, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif; line-height: 22px; font-weight: 500; font-style: normal; font-size: 15px; text-decoration: none; text-transform: none; letter-spacing: -0.6px; direction: ltr; color: #5e5e5e; text-align: center; mso-line-height-rule: exactly; mso-text-raise: 2px;">
                                                                                                        Hello ${name},&nbsp;
                                                                                                        You’ve been invited to join
                                                                                                        Sindbad. Get started now&nbsp;
                                                                                                    </p>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center">
                                                                            <table class="t28" role="presentation" cellpadding="0" cellspacing="0" style=" margin-left: auto; margin-right: auto;">
                                                                                <tr>
                                                                                    <!--[if mso]>
                                                                                    <td width="318" class="t27" style="width:318px;">
                                                                                    <![endif]-->
                                                                                    <!--[if !mso]>-->
                                                                                    <td class="t27" style="width: 318px">
                                                                                        <!--<![endif]-->
                                                                                        <table class="t26" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width: 100%">
                                                                                            <tr>
                                                                                                <td class="t25" style=" padding: 20px 15px 20px 15px;">
                                                                                                    <div class="t24" style=" width: 100%; text-align: left;">
                                                                                                        <div class="t23" style=" display: inline-block;">
                                                                                                            <table class="t22" role="presentation" cellpadding="0" cellspacing="0" align="left" valign="top">
                                                                                                                <tr class="t21">
                                                                                                                    <td></td>
                                                                                                                    <td class="t20" width="288" valign="top">
                                                                                                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t19" style="width: 100%">
                                                                                                                            <tr>
                                                                                                                                <td class="t18" style=" overflow: hidden; background-color: #fdcf08; text-align: center; line-height: 24px; mso-line-height-rule: exactly; mso-text-raise: 2px; padding: 10px 10px 10px 10px; border-radius: 8px 8px 8px 8px;">
                                                                                                                                    <a href="https://admin.sendibad.shop/join-workspace/?email=${email}" class="t17" style=" display: block; margin: 0; margin: 0; font-family: Lato, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif; line-height: 24px; font-weight: 700; font-style: normal; font-size: 16px; text-decoration: none; direction: ltr; color: #333; text-align: center; mso-line-height-rule: exactly; mso-text-raise: 2px;">Join theaccount</a>
                                                                                                                                </td>
                                                                                                                            </tr>
                                                                                                                        </table>
                                                                                                                    </td>
                                                                                                                    <td></td>
                                                                                                                </tr>
                                                                                                            </table>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="t34" style=" mso-line-height-rule: exactly; mso-line-height-alt: 70px; line-height: 70px; font-size: 1px; display: block;">
                                            &nbsp;&nbsp;
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        <div class="gmail-fix" style=" display: none; white-space: nowrap; font: 15px courier; line-height: 0;">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        </div>
    </body>
</html>
    `
}
export const inviteUserMail = async (mail: {to: string; name: string;}) => {
    try {
        const info = await transporter.sendMail({
            from: '"Sendibad" <noreply@sendibad.shop>',
            to: mail.to,
            subject: "Invite to company",
            html: bodyInviteUser(mail.to, mail.name)
        });

        console.log("Message sent: %s", info.messageId);

        return info
    }  catch (error) {
        console.log('error =========> ')
        console.error(error)
        return false
    }
};

