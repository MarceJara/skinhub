import { Stack, Typography, IconButton } from "@mui/material";
import IncreaseIcon from "@mui/icons-material/AddCircleOutline";
import DecreaseIcon from "@mui/icons-material/RemoveCircleOutline";

const QtyManager = ({ qty, increaseQty, decreaseQty }) => {
  return (
    <Stack alignItems="center" direction="row" spacing={1}>
      <IconButton onClick={decreaseQty} size="small">
        <DecreaseIcon fontSize="18px" />
      </IconButton>
      <Typography className="lato">{qty}</Typography>
      <IconButton onClick={increaseQty} size="small">
        <IncreaseIcon fontSize="18px" />
      </IconButton>
    </Stack>
  );
};

export default QtyManager;
