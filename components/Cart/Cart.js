import { IconButton, Typography, Stack, Divider, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/CancelOutlined";
import CartItem from "./CartItem";

const Cart = ({
  books,
  cart,
  increaseItemQty,
  decreaseItemQty,
  changePanel,
  closePanel,
}) => {
  const booksInCart = Object.keys(cart);

  const totalAmt = booksInCart.reduce((acc, next) => {
    const book = books.find((b) => b.name === next);
    const price = book.price * cart[next];
    return acc + price;
  }, 0);

  return (
    <>
      <Stack height="70%">
        <Stack
          mb={4}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">Cart</Typography>
          <IconButton
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
            onClick={closePanel}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        {/* Cart items container */}
        <Stack
          sx={{
            overflowY: "scroll",
          }}
          spacing={3}
        >
          {!booksInCart.length ? (
            <Typography align="center">Cart is empty</Typography>
          ) : (
            booksInCart.map((bookName) => (
              <CartItem
                key={bookName}
                book={books.find((b) => b.name === bookName)}
                qty={cart[bookName]}
                increaseQty={() => increaseItemQty(bookName)}
                decreaseQty={() => decreaseItemQty(bookName)}
              />
            ))
          )}
        </Stack>
      </Stack>
      {/* Bottom part */}
      <Stack mt={3} spacing={3}>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Typography className="lato">Total</Typography>
          <Typography className="lato">${totalAmt.toFixed(2)}</Typography>
        </Stack>
        <Button
          disabled={!booksInCart.length}
          onClick={() => changePanel(1)}
          color="btn"
          size="large"
          disableElevation
          variant="contained"
        >
          CONTINUE
        </Button>
      </Stack>
    </>
  );
};

export default Cart;
