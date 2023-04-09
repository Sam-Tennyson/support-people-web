import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Images } from '../../../Shared/Images';
import { PROFILE_TIPPY, STRINGS } from '../../../Shared/Constants';
import { ROUTE_CONSTANTS } from '../../../Shared/Routes';
import { useNavigate } from 'react-router-dom';
import { STRING_NUMBER } from "../../../Shared/Constants"
import { useDispatch } from 'react-redux';
import { setUpdatedToken } from '../../../Redux/Actions/Auth';
import './style.scss'
import ReactModal from '../../Atoms/ReactModal';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function MUIHeader() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [comingSoon, setComingSoon] = useState(false)

    const openSoon = (data) => {

      setComingSoon(true)
    }
  
    const handleSoonClose = () => {
      setComingSoon(false)
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (e) => {
        console.log(e)
        switch (e.value) {

        case STRING_NUMBER.ZERO:
            navigate({pathname: ROUTE_CONSTANTS.DASHBOARD})
            break;
        case STRING_NUMBER.ONE:
              openSoon()
              // navigate({pathname: ROUTE_CONSTANTS.DASHBOARD})
              break;
  
        case STRING_NUMBER.TWO:
            navigate({pathname: ROUTE_CONSTANTS.ADD_CAUSE})
            break;

        case STRING_NUMBER.THREE:
            navigate({pathname: ROUTE_CONSTANTS.MY_CAUSE})
            break;
        case STRING_NUMBER.FOUR:
            dispatch(setUpdatedToken(null))
            break
        default:
            break;
        }
        setAnchorElUser(null);
    };

    return (
      <>
      <ReactModal 
        isOpen={comingSoon}
        handleToggle={handleSoonClose}
      >
        <div className="p-5">

        <h2 className='text-center'>Coming Soon</h2>  
        </div>
      </ReactModal>

    <AppBar position="fixed" sx={{backgroundColor:"grey"}} >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <IconButton onClick={()=>  navigate({pathname: ROUTE_CONSTANTS.DASHBOARD})}>

          <Avatar className='imageFun' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} alt="Remy Sharp" src={Images.testJoker} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mx: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {STRINGS.SUPPORT_PEOPLE}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Avatar className="imageFun" sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} alt="Remy Sharp" src={Images.testJoker} />
          <Typography
            variant="p"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            }}
          >
            {STRINGS.SUPPORT_PEOPLE}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={"../>>/khjkh"} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {PROFILE_TIPPY.map((item, ind) => (
                <MenuItem key={ind} onClick={()=>handleCloseUserMenu(item)}>
                  <Typography textAlign="center">{item?.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
    </>
  );
}
export default MUIHeader;
