import { google } from "googleapis";

export const getAuthGsheets = async () => {
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    credentials: {
      private_key: process.env.GCP_PVT_KEY,
      client_email: process.env.GCP_CLIENT_EMAIL,
    },
  });

  const sheets = google.sheets({
    version: "v4",
    auth,
  });

  return sheets;
};

export const getBooks = async () => {
  const sheets = await getAuthGsheets();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: "items",
  });

  const [titles, ...items] = response.data.values;

  const formattedItems = items.map((row) => {
    const obj = {};
    row.forEach((field, idx) => (obj[titles[idx]] = field));
    return obj;
  });

  return formattedItems;
};
