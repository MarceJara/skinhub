//MAIN DEPENDENCIES
import {
  Button,
  IconButton,
  Grid,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import AddToCartIcon from "@mui/icons-material/AddShoppingCart";
import QtyManager from "../Cart/QtyManager";
import StarIcon from "@mui/icons-material/Star";

//ADD DEPENDENCIES
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';

//This function is a styled-component that customizes the padding 
//of the content and actions of a Material UI dialog based on the 
//provided theme.
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

//This code defines a custom BootstrapDialogTitle component that 
//renders a DialogTitle with additional close button functionality. 
//It destructures the onClose and children props, and applies custom 
//styles using sx property from Material-UI.
function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

//Main components
const BookItem = ({
  name,
  genre,
  image,
  price,
  stars,
  skinType,
  description,
  alreadyInCart,
  qty,
  increaseQty,
  decreaseQty,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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

          <Button variant="outlined" onClick={handleClickOpen}>
            Más detalle
          </Button>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
              {name}
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                {description}
              </Typography>
            </DialogContent>
          </BootstrapDialog>

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
          <Typography variant="body2" className="lato" fontStyle="bold">
            Tipo: {genre}
          </Typography>
          <Typography variant="body2" className="lato" fontStyle="bold">
            Piel: {skinType}
          </Typography>
          {/*<Stack color="#C99100" direction="row">
            <StarIcon /> <Typography className="lato">{stars}</Typography>
          </Stack>*/}
          <Stack height={38} direction="row" alignItems="center">
            <Typography mr={3} className="lato">
              S/ {price}
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
