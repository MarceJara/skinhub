import { Stack, Typography, Box } from "@mui/material";
import QtyManager from "./QtyManager";

const CartItem = ({ book, qty, increaseQty, decreaseQty }) => {
  return (
    <Stack alignItems="center" direction="row">
      <Stack
        sx={(theme) => ({
          background: `url(${book.image})`,
          ...theme.mixins.bookCover,
          width: 56,
          height: 83,
        })}
      />
      <Stack ml={2} spacing={1}>
        <Box maxWidth={120}>
          <Typography noWrap>{book.name}</Typography>
        </Box>
        <QtyManager
          qty={qty}
          decreaseQty={decreaseQty}
          increaseQty={increaseQty}
        />
      </Stack>
      <Typography className="lato" ml="auto">
        S/ {(book.price * qty).toFixed(2)}
      </Typography>
    </Stack>
  );
};

export default CartItem;
