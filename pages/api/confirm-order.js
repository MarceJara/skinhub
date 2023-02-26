import { sendEmail } from "../../utils/email";
import { getAuthGsheets } from "../../utils/gsheets";

const { Deta } = require("deta");

const { validate: validateUUID } = require("uuid");
const axios = require("axios");

export const serverError = (res, serverStatus, message) =>
  res.status(serverStatus).send(message);

export default async function handler(req, res) {
  if (req.method !== "GET")
    return serverError(res, 404, "Invalid API endpoint");
  const { orderId } = req.query;
  if (!orderId) return serverError(res, 400, "Order ID not found");
  if (!validateUUID(orderId))
    return serverError(res, 400, "Order ID is not valid");

  const deta = Deta(process.env.DETA_PROJECT_KEY);
  const db = deta.Base("unconfirmed_orders");

  // fetch the doc from the DB - [conditional check]
  const order = await db.get(orderId);

  if (!order)
    return serverError(
      res,
      400,
      "Link expired or the order is already confirmed"
    );

  // delete the doc
  await db.delete(orderId);

  const { createdAt, fullName, email, contact, address, cart, totalAmt } =
    order;

  // adding the entry in the Gsheet
  const sheets = await getAuthGsheets();

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: "orders",
    resource: {
      values: [[createdAt, fullName, email, contact, address, cart, totalAmt]],
    },
    valueInputOption: "RAW",
  });
  // send PN in slack
  await axios.post(process.env.SLACK_CHANNEL_WEBHOOK, {
    text: `Placed @: ${createdAt}
          Full name: ${fullName}
          Email: ${email}
          Contact: ${contact}
          Address: ${address}
          Cart: ${cart}
          Total Amount: ${totalAmt}`,
  });

  await sendEmail({
    email,
    subject: "Order confirmed! SkinHub",
    html: `
    <h1>Order confirmed<h1/>
    Thank you ${fullName}, for placing an order with us!`,
  });
  return res.send("Order successfully confirmed!");
}
