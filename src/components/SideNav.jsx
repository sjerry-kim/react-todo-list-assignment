import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userAtom } from 'recoil/userAtom';
import { alertAtom } from 'recoil/alertAtom';
import { signOut } from 'api/auth';
import styles from 'components/SideNav.module.css';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useMediaQuery } from '@mui/material';
import WavingHandIcon from '@mui/icons-material/WavingHand';

export default function SideNav({ outlet }) {
  const navigate = useNavigate();
  const [userState, setUserState] = useRecoilState(userAtom);
  const setAlertState = useSetRecoilState(alertAtom);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSideNav = (route) => {
    navigate(route);
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      const result = await signOut();

      await setUserState(result.user);
      navigate('/', { replace: true });
    } catch (error) {
      // prettier-ignore
      setAlertState({
        open: true,
        message: error.message,
        severity: 'error'
      });
    }
  };

  return (
    <Box sx={isMobile ? {} : { display: 'flex' }}>
      <AppBar position="fixed" open={open} sx={{ backgroundColor: '#1F4529' }}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            Todo List Assignment
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={[open && { display: 'none', zIndex: 9999 }]}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {isMobile ? (
        <main className={styles.main}>
          <DrawerHeader />
          {outlet}
          <div className="css-fiov70"></div>
        </main>
      ) : (
        <Main className={styles.main} open={open}>
          <DrawerHeader />
          {outlet}
          <div className="css-fiov70"></div>
        </Main>
      )}

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton sx={{ color: '#1F4529' }} onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          <ListItem disablePadding className={styles.user_box}>
            <ListItemIcon sx={{ color: '#1F4529' }}>
              <WavingHandIcon />
            </ListItemIcon>
            <ListItemText primary={`반가워요, ${userState?.user_metadata?.display_name}님`} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding onClick={() => handleSideNav('/board')}>
            <ListItemButton>
              <ListItemIcon sx={{ color: '#1F4529' }}>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary="Todo List" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={handleLogout}>
            <ListItemButton>
              <ListItemIcon sx={{ color: '#1F4529' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="로그아웃" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  position: 'relative',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
      },
    },
  ],
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));
