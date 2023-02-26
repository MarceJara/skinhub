import {
  Typography,
  Stack,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import BackArrowIcon from "@mui/icons-material/ArrowBack";

const EnterDetails = ({
  changePanel,
  onFormChange,
  enterDetailsForm,
  placeOrder,
  error,
  loading,
}) => {
  return (
    <>
      <Stack>
        {/* top bar */}
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => changePanel(0)} size="small">
            <BackArrowIcon />
          </IconButton>
          <Typography mb={4} variant="h5">
            Enter Details
          </Typography>
        </Stack>

        <Stack mt={3} spacing={4}>
          <TextField
            error={!!error.fullName}
            helperText={error.fullName}
            value={enterDetailsForm.fullName}
            name="fullName"
            onChange={onFormChange}
            label="Full name"
          />
          <TextField
            error={!!error.email}
            helperText={error.email}
            value={enterDetailsForm.email}
            name="email"
            onChange={onFormChange}
            label="Email address"
          />
          <TextField
            error={!!error.contact}
            helperText={error.contact}
            value={enterDetailsForm.contact}
            name="contact"
            onChange={onFormChange}
            label="Contact no."
          />
          <TextField
            error={!!error.address}
            helperText={error.address}
            value={enterDetailsForm.address}
            name="address"
            onChange={onFormChange}
            multiline
            rows={3}
            label="Address"
          />
        </Stack>
      </Stack>
      <Stack spacing={2}>
        <Typography className="lato" p={2} bgcolor="#F8F8F8">
          You'll receive a confirmation mail once you place the order
        </Typography>
        <Button
          disabled={loading}
          onClick={placeOrder}
          color="btn"
          size="large"
          disableElevation
          variant="contained"
        >
          PLACE ORDER
        </Button>
      </Stack>
    </>
  );
};

export default EnterDetails;
