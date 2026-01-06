
import worksheet from '../utils/googleAuth.js';

const loadWorksheet = async (sheetname: string) => {
    await worksheet.loadInfo();
    const sheet = worksheet.sheetsByTitle[sheetname];

    if (!sheet) throw new Error('Worksheet not found.');

    return sheet;
}

export const findRows = async (sheetname: string) => {
    const sheet = await loadWorksheet(sheetname);
    return await sheet.getRows();
}

export const findRowsAndConvertToObject = async (sheetname: string) => {
    const rows = await findRows(sheetname);
    return rows.map(row => row.toObject());
}

export const findByEmail = async (sheetname: string, email: string) => {
    const data = await findRowsAndConvertToObject(sheetname);
    return data.some(user => user.email === email);
}

export const findOrCreate = async (sheetname: string, email: string, user: {}) => {

    const response = await findByEmail(sheetname, email);

    if (!response) {
        const sheet = await loadWorksheet(sheetname);
        await sheet.addRow(user);
    }

    return true;
}
