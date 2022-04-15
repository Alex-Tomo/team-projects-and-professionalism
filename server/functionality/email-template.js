/**
 * Html template for the design of the recovery emails, this could be repurposed
 * for signup verification. Although probably isn't needed. token is the jwt that
 * is then added to an <a> tag to the users authenticated url. The username param is
 * simply to add the users name to the email so that it is a little bit more personalized.
 * 
 * @author Jordan Short
 * 
 */
exports.htmlTemplate = function (token, username) {
    return `<!DOCTYPE html>
 <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
 <head>
     <title></title>
     <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
     <style>
         * {
             box-sizing: border-box;
         }
         body {
             margin: 0;
             padding: 0;
         }
         a[x-apple-data-detectors] {
             color: inherit !important;
             text-decoration: inherit !important;
         }
         #MessageViewBody a {
             color: inherit;
             text-decoration: none;
         }
         p {
             line-height: inherit
         }
         @media (max-width:520px) {
             .icons-inner {
                 text-align: center;
             }
             .icons-inner td {
                 margin: 0 auto;
             }
             .row-content {
                 width: 100% !important;
             }
             .column .border {
                 display: none;
             }
             .stack .column {
                 width: 100%;
                 display: block;
             }
         }
     </style>
 </head>
 <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
     <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
         <tbody>
             <tr>
                 <td>
                     <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                         <tbody>
                             <tr>
                                 <td>
                                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5; color: #000000; width: 500px;" width="500">
                                         <tbody>
                                             <tr>
                                                 <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                     <table class="heading_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                         <tr>
                                                             <td style="text-align:center;width:100%;">
                                                                 <h1 style="margin: 0; color: #555555; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 23px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Password Reset</span></h1>
                                                             </td>
                                                         </tr>
                                                     </table>
                                                 </td>
                                             </tr>
                                         </tbody>
                                     </table>
                                 </td>
                             </tr>
                         </tbody>
                     </table>
                     <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                         <tbody>
                             <tr>
                                 <td>
                                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5; color: #000000; width: 500px;" width="500">
                                         <tbody>
                                             <tr>
                                                 <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                     <table class="text_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                         <tr>
                                                             <td>
                                                                 <div style="font-family: sans-serif">
                                                                     <div style="font-size: 14px; mso-line-height-alt: 16.8px; color: #555555; line-height: 1.2; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;">
                                                                         <p style="margin: 0; font-size: 14px; text-align: center;">Hi ${username},</p>
                                                                         <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;">&nbsp;</p>
                                                                         <p style="margin: 0; font-size: 14px; text-align: center;">We're sending you this email because you requested a password reset. Click on the link below to create a new password. If you didn't request a password reset, we recommend navigating to the site directly and resetting your password.</p>
                                                                     </div>
                                                                 </div>
                                                             </td>
                                                         </tr>
                                                     </table>
                                                 </td>
                                             </tr>
                                         </tbody>
                                     </table>
                                 </td>
                             </tr>
                         </tbody>
                     </table>
                     <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                         <tbody>
                             <tr>
                                 <td>
                                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5; color: #000000; width: 500px;" width="500">
                                         <tbody>
                                             <tr>
                                                 <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                     <table class="button_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                         <tr>
                                                             <td>
                                                                 <div align="center">
                                                                     <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://localhost:3000" style="height:42px;width:156px;v-text-anchor:middle;" arcsize="27%" stroke="false" fillcolor="#004888"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a href="http://localhost:3000/password-reset?token=${token}" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#004888;border-radius:11px;width:auto;border-top:1px solid #004888;border-right:1px solid #004888;border-bottom:1px solid #004888;border-left:1px solid #004888;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;">Reset Password</span></span></a>
                                                                     <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                 </div>
                                                             </td>
                                                         </tr>
                                                     </table>
                                                 </td>
                                             </tr>
                                         </tbody>
                                     </table>
                                 </td>
                             </tr>
                         </tbody>
                     </table>
                     <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                         <tbody>
                             <tr>
                                 <td>
                                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                                         <tbody>
                                             <tr>
                                                 <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                     <table class="icons_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                         <tr>
                                                             <td style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
                                                                 <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                     <tr>
                                                                         <td style="vertical-align: middle; text-align: center;">
                                                                             <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                                                             <!--[if !vml]><!-->
                                                                             <table class="icons-inner" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;" cellpadding="0" cellspacing="0" role="presentation">
                                                                                 <!--<![endif]-->
                                                                                 <tr>
                                                                                     <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 6px;"></td>
                                                                                     <td style="font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 15px; color: #9d9d9d; vertical-align: middle; letter-spacing: undefined; text-align: center;"></td>
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
                                         </tbody>
                                     </table>
                                 </td>
                             </tr>
                         </tbody>
                     </table>
                 </td>
             </tr>
         </tbody>
     </table><!-- End -->
 </body>
 </html>`
}