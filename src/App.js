import * as React from "react";

import NavBar from "./NavBar";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Hero from "./Hero";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import "./App.css";

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const drawerWidth = 240;
  const navItems = [
    { name: "소개", to: "intro", img: null },
    { name: "예배", to: "service", img: null },
    { name: "교육부", to: "education", img: null },
    { name: "사역과 섬김", to: "serving", img: null },
    { name: "주보", to: "jubo", img: null },
    { name: "시설 예약", to: "reserve", img: null },
  ];

  // Find the current page in navItems
  const currentPath = location.pathname.substring(1); // Remove leading slash
  const currentPage = navItems.find(item => item.to === currentPath);

  // Show Hero if we're on the home page (path is '/') or if the current page has an image
  const showHero = location.pathname === '/' || (currentPage && currentPage.img !== null);

  // Get the hero image from the current page, if available
  const heroImage = currentPage?.img || null;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        메뉴
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              component={Link}
              to={item.to}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="App">
      <NavBar handleDrawerToggle={handleDrawerToggle} />
      <nav>
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          anchor={"right"}
        >
          {drawer}
        </Drawer>
      </nav>
      {showHero && <Hero heroImage={heroImage} />}
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
