const { sendEmail } = require("../../utils/email");
const { getBooks } = require("../../utils/gsheets");
const { serverError } = require("./confirm-order");
const format = require("date-fns-tz/formatInTimeZone");

const { Deta } = require("deta");
const { v4: uuidv4 } = require("uuid");

function validateDate({ fullName, email, contact, address, cart }) {
  const emailRegex = new RegExp(
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
  );

  const error = {};

  // validations
  if (typeof fullName !== "string" || !fullName)
    error.fullName = "Full name is required";
  if (fullName.length > 200) error.fullName = "Please enter your nick name";
  if (typeof email !== "string" || !emailRegex.test(email))
    error.email = "Please enter a valid email";
  if (email.length > 200) error.email = "Max char limit 200";
  if (typeof contact !== "string" || !contact)
    error.contact = "Contact number is required";
  if (contact.length > 15) error.contact = "Should be less than 15";
  if (typeof address !== "string" || !address)
    error.address = "Address is required";
  if (address.length > 250) error.address = "Should be less than 250";
  if (typeof cart !== "object" || !Object.keys(cart).length)
    error.cart = "Cart cannot be empty";

  return error;
}

export default async function newOrder(req, res) {
  //return res.send("It's working");
  console.log(req);
  if (req.method === "POST") {
    const { fullName, email, contact, address, cart } = req.body;
    const error = validateDate({ fullName, email, contact, address, cart });
    if (!!Object.keys(error).length) return res.status(400).json(error);

    const deta = Deta(process.env.DETA_PROJECT_KEY);
    console.log(deta);
    const db = deta.Base("unconfirmed_orders");

    const books = await getBooks();
    const itemsInCart = Object.keys(cart);
    let totalAmt = 0;
    const formattedCart = itemsInCart.reduce((prev, next, idx) => {
      const price = books.find((b) => b.name === next).price;
      const amt = (cart[next] * Number(price)).toFixed(2);
      totalAmt = totalAmt + Number(amt);

      return (
        prev +
        `${next} x ${cart[next]} = $${amt}${idx + 1 === itemsInCart.length ? "" : ", "
        } `
      );
    }, "");
    const formattedTs = format(
      new Date(),
      "Asia/Calcutta",
      "dd MMM yyyy - hh:mm:ss aa"
    );

    //   adding a new entry to the temp DB
    const resp = await db.put(
      {
        fullName,
        email,
        contact,
        address,
        cart: formattedCart,
        totalAmt: `$${totalAmt.toFixed(2)}`,
        createdAt: formattedTs,
      },
      uuidv4(),
      {
        expireIn: 300,
      }
    );

    const confirmationLink = `${req.headers.host}/api/confirm-order?orderId=${resp.key}`;
    // sending email to the customer
    await sendEmail({
      email,
      subject: "Please confirm your order! SkinHub",
      html: `Click on the link to confirm your order on SkinHub <br/>
      <a href='${process.env.NODE_ENV === "development" ? "http://" : "https://"
        }${confirmationLink}'>Confirm order</a>
      <br/>
      <hr />
      ${formattedCart}
      <hr />
      <h3>
      Total Amt: ${totalAmt.toFixed(2)}
      </h3>
      `,
    });
    return res.json(resp);
  } else return serverError(res, 404, "Invalid API endpoint");
}
