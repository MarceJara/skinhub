import {
  Stack,
  Typography,
  IconButton,
  Tabs,
  Tab,
  tabClasses,
  tabsClasses,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const TopBar = ({ genres, activeGenre, changeGenre, openPanel }) => {
  return (
    <Stack
      mb={{
        xs: 10,
        lg: 15,
      }}
      pt={{
        xs: 2,
        lg: 6,
      }}
      px={{
        xs: 2,
        lg: 6,
      }}
      bgcolor="#DCF5FF"
    >
      <Stack
        mb={6}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h3">SkinHub</Typography>
        <IconButton onClick={openPanel}>
          <ShoppingCartIcon />
        </IconButton>
      </Stack>

      <Tabs
        variant="scrollable"
        visibleScrollbar
        onChange={(_, value) => changeGenre(value)}
        value={activeGenre}
        sx={{
          [`& .${tabClasses.root}`]: {
            fontWeight: 600,
            fontFamily: "Lato, sans-serif",
            textTransform: "capitalize",
            fontSize: 17,
          },
          [`& .${tabsClasses.indicator}`]: {
            height: 4,
          },
        }}
      >
        <Tab value="All" label="All" />
        {genres.map((genre) => (
          <Tab key={genre} value={genre} label={genre} />
        ))}
      </Tabs>
    </Stack>
  );
};

export default TopBar;
