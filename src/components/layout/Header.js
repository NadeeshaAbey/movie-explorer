import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  InputBase,
  alpha,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  TextField,
} from "@mui/material";
import {
  Search as SearchIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Menu as MenuIcon,
  MovieFilter as MovieIcon,
  Favorite as FavoriteIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  AccountCircle,
  Close as CloseIcon,
} from "@mui/icons-material";
import { styled, useTheme } from "@mui/material/styles";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { MovieContext } from "../../context/MovieContext";

const SearchWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
  const { mode, colorMode } = useContext(ThemeContext);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { lastSearchedMovie } = useContext(MovieContext);

  // Check if we're on the login or signup page
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const toggleSearchDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSearchDrawerOpen(open);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchDrawerOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/");
  };

  const menuItems = [
    {
      text: "Home",
      icon: <MovieIcon />,
      onClick: () => {
        navigate("/");
        setDrawerOpen(false);
      },
    },
    {
      text: "Favorites",
      icon: <FavoriteIcon />,
      onClick: () => {
        navigate("/favorites");
        setDrawerOpen(false);
      },
    },
  ];

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={item.onClick}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <Divider />
        {isAuthenticated ? (
          <>
            <ListItem>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary={user?.username} />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <ListItem button onClick={() => navigate("/login")}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  const searchDrawer = (
    <Box
      sx={{
        width: "100%",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Typography variant="h6">Search Movies</Typography>
        <IconButton onClick={toggleSearchDrawer(false)} color="inherit">
          <CloseIcon />
        </IconButton>
      </Box>
      <form onSubmit={handleSearch}>
        <TextField
          fullWidth
          autoFocus
          placeholder={
            lastSearchedMovie
              ? `Last search: ${lastSearchedMovie}`
              : "Search movies..."
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton type="submit" color="primary">
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </form>
    </Box>
  );

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: isMobile ? 1 : 1,
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
            fontSize: isMobile ? "1rem" : "1.25rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: isMobile ? "none" : "none",
          }}>
          <MovieIcon sx={{ mr: 1, fontSize: isMobile ? "1.5rem" : "2rem" }} />
          Movie Explorer
        </Typography>

        {!isAuthPage && (
          <>
            {isMobile ? (
              <IconButton
                color="inherit"
                onClick={toggleSearchDrawer(true)}
                sx={{ ml: 1 }}>
                <SearchIcon />
              </IconButton>
            ) : (
              <form onSubmit={handleSearch} style={{ flexGrow: 0 }}>
                <SearchWrapper className="search-bar">
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder={
                      lastSearchedMovie
                        ? `Last search: ${lastSearchedMovie}`
                        : "Search…"
                    }
                    inputProps={{ "aria-label": "search" }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </SearchWrapper>
              </form>
            )}
          </>
        )}

        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
          aria-label="toggle dark mode">
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        {!isMobile && !isAuthPage && (
          <>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                startIcon={item.icon}
                onClick={item.onClick}
                sx={{ ml: 1 }}>
                {item.text}
              </Button>
            ))}

            {isAuthenticated ? (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit">
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {user?.username?.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}>
                  <MenuItem onClick={handleClose}>
                    <Typography variant="body2" sx={{ px: 1 }}>
                      {user?.username}
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                color="inherit"
                startIcon={<LoginIcon />}
                onClick={() => navigate("/login")}
                sx={{ ml: 1 }}>
                Login
              </Button>
            )}
          </>
        )}
      </Toolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>
      <Drawer
        anchor="top"
        open={searchDrawerOpen}
        onClose={toggleSearchDrawer(false)}
        PaperProps={{
          sx: {
            width: "100%",
            maxHeight: "200px",
          },
        }}>
        {searchDrawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
