import { Container, Grid } from "@mui/material";
import BookItem from "./BookItem";

const Books = ({
  books,
  activeGenre,
  cart,
  increaseItemQty,
  decreaseItemQty,
}) => {
  const booksToDisplay =
    activeGenre === "All"
      ? books
      : books.filter((b) => b.genre === activeGenre);
  return (
    <Container
      sx={{
        mb: 10,
      }}
      maxWidth="xl"
    >
      <Grid container spacing={4} rowSpacing={8}>
        {booksToDisplay.map((book) => (
          <BookItem
            key={book.name}
            {...book}
            qty={cart[book.name]}
            increaseQty={() => increaseItemQty(book.name)}
            decreaseQty={() => decreaseItemQty(book.name)}
            alreadyInCart={!!cart[book.name]}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default Books;
