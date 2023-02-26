import { useState } from "react";
import Books from "../components/Books";
import TopBar from "../components/TopBar";
import CartPanel from "../components/Cart/CartPanel";
import axios from "axios";
import { Snackbar } from "@mui/material";
import { getBooks } from "../utils/gsheets";

const initForm = {
  fullName: "",
  email: "",
  contact: "",
  address: "",
};

const Homepage = ({ books }) => {
  const [activeGenre, setActiveGenre] = useState("All");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [cart, setCart] = useState({});
  const [enterDetailsForm, setEnterDetailsForm] = useState(initForm);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  const genres = [...new Set(books.map((b) => b.genre))];

  const handleChangeForm = (event) =>
    setEnterDetailsForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));

  const handleIncreaseItemQty = (name) =>
    setCart((old) => ({
      ...old,
      [name]: !!old[name] ? old[name] + 1 : 1,
    }));

  const handleDecreaseItemQty = (name) => {
    if (cart[name] === 1) {
      let tCart = { ...cart };
      delete tCart[name];
      setCart(tCart);
    } else {
      setCart((old) => ({
        ...old,
        [name]: old[name] - 1,
      }));
    }
  };

  const handlePlaceNewOrder = async () => {
    try {
      setLoading(true);
      const resp = await axios.post("/api/new-order", {
        cart,
        ...enterDetailsForm,
      });
      setShowPanel(false);
      setOrderPlaced(true);
      setCart({});
      setEnterDetailsForm(initForm);
      setError({});
    } catch (err) {
      if (err.response.status === 400) {
        setError(err.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClosePanel = () => {
    setError({});
    setShowPanel(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={orderPlaced}
        autoHideDuration={7000}
        onClose={() => setOrderPlaced(false)}
        message="Order placed! A confirmation mail has been sent to you. The link is valid for the next 5 mins"
      />
      <TopBar
        openPanel={() => setShowPanel(true)}
        activeGenre={activeGenre}
        changeGenre={setActiveGenre}
        genres={genres}
      />
      <Books
        books={books}
        cart={cart}
        increaseItemQty={handleIncreaseItemQty}
        decreaseItemQty={handleDecreaseItemQty}
        activeGenre={activeGenre}
      />
      <CartPanel
        books={books}
        cart={cart}
        showPanel={showPanel}
        increaseItemQty={handleIncreaseItemQty}
        decreaseItemQty={handleDecreaseItemQty}
        closePanel={handleClosePanel}
        enterDetailsForm={enterDetailsForm}
        onFormChange={handleChangeForm}
        placeOrder={handlePlaceNewOrder}
        error={error}
        loading={loading}
        orderPlaced={orderPlaced}
      />
    </>
  );
};

export const getServerSideProps = async () => {
  const books = await getBooks();
  return {
    props: {
      books,
    },
  };
};

export default Homepage;
