import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import config from '../config/index.js';

const email: string = config.email as string;
const key: string = config.key as string;
const sheetId: string = config.sheetId as string;

const serviceAccountAuth = new JWT({
    email, key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export default new GoogleSpreadsheet(sheetId, serviceAccountAuth);
