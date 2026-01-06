import dotenv from 'dotenv';

dotenv.config();

export default ({
    port: process.env.PORT_SERVE,
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    sheetId: process.env.SPREADSHEET_ID,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
})
