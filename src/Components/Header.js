import React from 'react';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Button, useMediaQuery } from '@material-ui/core';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import logo from '../Assets/images/bow-and-arrow-256x256.png';

import { green, purple } from '@material-ui/core/colors';
import Sidebar from './Sidebar';
const drawerWidth = 240;

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: 'black',
        '&:hover': {
            color: 'black !important',
            backgroundColor: 'white',
            boxShadow: '0px 0px 10px white',
            border: 'none'
        },
    },
}))(Button);


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    title: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
}));

const Header = (props) => {

    const menuItems = [
        {
            menuTitle: 'Ticket Gen',
            PageURL: '/ins-trans-ticket-generation'
        },
    ];

    const classes = useStyles();
    const { history } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [Open, setOpen] = React.useState(Boolean(anchorEl));
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const isTablet = useMediaQuery(theme.breakpoints.down('sm'));

    const handleMenu = (event) => {
        setOpen(true);
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClick = (PageURL) => {
        history.push(PageURL);
        setAnchorEl(null);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="sticky"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: Open,
                })}
                style={{ backgroundColor: '#db4437' }}
            >
                <Toolbar>
                    <Button disableRipple disableFocusRipple style={{
                        color: 'white',
                        marginLeft: -24,
                        borderRadius: 0,
                        textTransform: 'lowercase',
                        fontSize: 'xx-large',
                        fontStyle: 'italic'
                    }}
                        onClick={e => { history.push('/'); }}>
                        <img src={logo} width={50} style={{ transform: '10px' }} />
                        NAN TECH
                        </Button>
                    <Typography variant="h6" className={classes.title}
                        style={{ fontFamily: 'raleway', fontWeight: 400, fontStyle: 'normal' }}
                    >
                    </Typography>
                    {isMobile || isTablet ?
                        <div>
                            <Sidebar />
                            {/* <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={() => setAnchorEl(null)}
                            >
                                <MenuItem onClick={() => handleMenuClick('/Login')}>Login</MenuItem>
                                <MenuItem onClick={() => handleMenuClick('/Social')}>Social</MenuItem>
                                <MenuItem onClick={() => handleMenuClick('/Literature')}>Literature</MenuItem>
                                <MenuItem onClick={() => handleMenuClick('/Nature')}>Nature</MenuItem>
                                <MenuItem onClick={() => handleMenuClick('/Politics')}>Politics</MenuItem>
                            </Menu> */}
                        </div>
                        : <>
                            {menuItems.map(MenuItem => {
                                return (
                                    <Button disableRipple className={classes.margin} onClick={() => handleMenuClick(MenuItem.PageURL)} >
                                        <Typography style={{ color: 'white', fontSize: '14px', fontFamily: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif' }} > {MenuItem.menuTitle}</Typography>
                                    </Button>
                                )
                            })}

                        </>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(Header);