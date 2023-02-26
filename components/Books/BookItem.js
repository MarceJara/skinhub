import {
  Button,
  IconButton,
  Grid,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import AddToCartIcon from "@mui/icons-material/AddShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import QtyManager from "../Cart/QtyManager";

const BookItem = ({
  name,
  genre,
  image,
  price,
  stars,
  alreadyInCart,
  qty,
  increaseQty,
  decreaseQty,
}) => {
  return (
    <Grid item xs={12} lg={4}>
      <Stack
        sx={{
          ":hover .book-cover": {
            top: -40,
          },
        }}
        direction="row"
        spacing={3}
        alignItems="flex-start"
      >
        {/* left stack */}
        <Stack position="relative" width={130}>
          <Stack
            className="book-cover"
            top={-25}
            position="relative"
            left={22.5}
            sx={(theme) => ({
              background: `url(${image})`,
              ...theme.mixins.bookCover,
            })}
          />
          <Stack
            zIndex={-1}
            position="absolute"
            bgcolor="#F3EEF0"
            width={130}
            height={120}
            borderRadius={2}
          />
        </Stack>
        {/* right stack */}
        <Stack position="relative" top={-25} spacing={1}>
          <Box
            maxWidth={{
              xs: 200,
              lg: 240,
            }}
          >
            <Typography noWrap variant="h5">
              {name}
            </Typography>
          </Box>
          <Typography variant="body2" className="lato" fontStyle="italic">
            Genre: {genre}
          </Typography>
          <Stack color="#C99100" direction="row">
            <StarIcon /> <Typography className="lato">{stars}</Typography>
          </Stack>
          <Stack height={38} direction="row" alignItems="center">
            <Typography mr={3} className="lato">
              ${price}
            </Typography>
            {alreadyInCart ? (
              <QtyManager
                qty={qty}
                decreaseQty={decreaseQty}
                increaseQty={increaseQty}
              />
            ) : (
              <IconButton
                onClick={increaseQty}
                sx={{
                  bgcolor: "black !important",
                  color: "#fff !important",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.08)",
                }}
              >
                <AddToCartIcon fontSize="small" />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default BookItem;
