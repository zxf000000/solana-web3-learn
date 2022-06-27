import {FC, ReactNode, useState} from "react";
import {WalletMultiButton} from "@solana/wallet-adapter-material-ui";
import './main-container.sass';
import {
    AppBar,
    Box,
    Collapse,
    CssBaseline,
    Divider,
    Drawer, Icon,
    List,
    ListItem,
    ListItemButton, ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import { Outlet } from "react-router-dom";
import ListItemLink from "../components/ListItemLink";

function MainContainer() {
    const drawerWidth = 240;
    // nav open
    const [open, setOpen] = useState(false);
    const click = () => {
        setOpen(!open);
    }
    return (
        <Box className="app-container" sx={{
            display: 'flex',
        }}>
            <CssBaseline></CssBaseline>
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    marginLeft: `${drawerWidth}px`
                }}
            >
                <Toolbar>
                    <Typography component="h3">
                        SOLANA WEB3 LEARN
                    </Typography>
                    <Box flexGrow='1'></Box>
                    <WalletMultiButton></WalletMultiButton>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar>
                </Toolbar>
                <Divider></Divider>
                <List>
                    <ListItemLink to="/" primary="Home"></ListItemLink>
                    <ListItemLink to="/test" primary="TEST"></ListItemLink>
                    <ListItemButton onClick={click}>
                        <ListItemText primary="Wallet"></ListItemText>
                        {open ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
                    </ListItemButton>
                    <Collapse in={open}>
                        <List component="div">
                            <ListItemLink
                                sx={{
                                    pl: 4,
                                }}
                                primary="Account" to='/wallet'></ListItemLink>
                        </List>
                    </Collapse>
                </List>
            </Drawer>
            <Outlet></Outlet>
        </Box>
    )
}

export default MainContainer;
