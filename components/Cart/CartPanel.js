import { useState, useEffect } from "react";

import { Drawer, Stack } from "@mui/material";
import Cart from "./Cart";
import EnterDetails from "./EnterDetails";

const Panels = [Cart, EnterDetails];

const CartPanel = ({
  showPanel,
  closePanel,
  books,
  cart,
  increaseItemQty,
  decreaseItemQty,
  onFormChange,
  enterDetailsForm,
  placeOrder,
  error,
  loading,
  orderPlaced,
}) => {
  const [activePanel, setActivePanel] = useState(0);
  const Panel = Panels[activePanel];

  const handleClosePanel = () => {
    setActivePanel(0);
    closePanel();
  };

  useEffect(() => {
    if (orderPlaced) {
      setActivePanel(0);
    }
  }, [orderPlaced]);
  return (
    <Drawer open={showPanel} onClose={handleClosePanel} anchor="right">
      <Stack
        justifyContent="space-between"
        height="100%"
        width={360}
        py={4}
        px={2}
      >
        <Panel
          books={books}
          cart={cart}
          increaseItemQty={increaseItemQty}
          decreaseItemQty={decreaseItemQty}
          changePanel={setActivePanel}
          onFormChange={onFormChange}
          enterDetailsForm={enterDetailsForm}
          placeOrder={placeOrder}
          error={error}
          loading={loading}
          closePanel={handleClosePanel}
        />
      </Stack>
    </Drawer>
  );
};

export default CartPanel;
