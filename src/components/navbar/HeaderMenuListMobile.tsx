'use client';
import { useMediaQuery, Theme, IconButton } from '@mui/material';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { url } from 'inspector';
import CoverImage from '@/app/cover-image';
// import GetMenuItemsMobile from '@/app/content/GetMenuItemsMobile';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Link from 'next/link';
import { getMenuItemByEntryId } from '@/lib/api';
import GetMenuItems from '@/app/content/GetMenuItems';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

export default function HeaderMenuListMobile({
  topMenus,
}: {
  topMenus: any[];
}) {
  const isXsMobile = useMediaQuery('screen and (max-width: 724px)');
  const menus = topMenus;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const CustomSubMenuItem = ({ subMenu }: { subMenu: any }) => {
    const [showSubSubMenu, setShowSubSubMenu] = React.useState(false);
    const handleClickSub = () => {
      setShowSubSubMenu(!showSubSubMenu);
    };

    return (
      <>
        <ListItem key={subMenu.sys.id} disablePadding>
          <ListItemButton key={subMenu.sys.id} onClick={handleClickSub}>
            {subMenu.submenus && subMenu.submenus.length > 0 ? (
              <>
                <ListItemText
                  primary={subMenu.menuTitle}
                  sx={{
                    color: '#5f5f5f',
                    fontSize: '20px',
                    paddingLeft: '20px',
                  }}
                />
                {showSubSubMenu ? (
                  <ExpandLess sx={{ color: '#5f5f5f' }} />
                ) : (
                  <ExpandMore sx={{ color: '#5f5f5f' }} />
                )}
              </>
            ) : (
              <Link
                href={subMenu.menuLink}
                className="block md:px-4 transition hover:text-primary  dark:hover:text-main"
                style={{ color: '#5f5f5f' }}
                // on click show submenus
                onClick={toggleDrawer(false)}
              >
                <ListItemText
                  primary={subMenu.menuTitle}
                  sx={{
                    color: '#5f5f5f',
                    fontSize: '20px',
                    paddingLeft: '20px',
                  }}
                />
              </Link>
            )}
          </ListItemButton>
        </ListItem>
        <Collapse
          in={showSubSubMenu}
          timeout="auto"
          unmountOnExit
          sx={{ width: '100%' }}
        >
          <List component="div" disablePadding>
            {subMenu.submenus &&
              subMenu.submenus.map((subSubMenu: any) => (
                <>
                  <ListItem key={subSubMenu.sys.id} disablePadding>
                    <ListItemButton key={subSubMenu.sys.id}>
                      <Link
                        href={subSubMenu.menuLink}
                        style={{ paddingLeft: '40px' }}
                      >
                        <ListItemText
                          primary={subSubMenu.menuTitle}
                          sx={{
                            color: '#5f5f5f',
                            fontSize: '20px',
                            paddingLeft: '20px',
                          }}
                        />
                      </Link>
                    </ListItemButton>
                  </ListItem>
                </>
              ))}
          </List>
        </Collapse>
      </>
    );
  };
  const CustomMenuItem = ({ menu }: { menu: any }) => {
    const showSubSubMenuDefault = true;
    const [showSubMenu, setShowSubMenu] = React.useState(false);
    const handleClick = () => {
      setShowSubMenu(!showSubMenu);
    };

    return (
      <>
        <ListItem key={menu.sys.id} disablePadding sx={{ maxWidth: '100%' }}>
          <ListItemButton onClick={handleClick}>
            {menu.submenus && menu.submenus.length > 0 ? (
              <>
                <ListItemText
                  primary={menu.menuTitle}
                  sx={{ color: '#5f5f5f', fontSize: '20px' }}
                />
                {showSubMenu ? (
                  <ExpandLess sx={{ color: '#5f5f5f' }} />
                ) : (
                  <ExpandMore sx={{ color: '#5f5f5f' }} />
                )}
              </>
            ) : (
              <Link
                href={menu.menuLink}
                className="block md:px-4 transition hover:text-primary  dark:hover:text-main"
                style={{ color: '#5f5f5f' }}
                // on click show submenus
                onClick={toggleDrawer(false)}
              >
                <ListItemText
                  primary={menu.menuTitle}
                  sx={{ color: '#5f5f5f', fontSize: '20px' }}
                />
              </Link>
            )}
          </ListItemButton>
        </ListItem>

        <Collapse
          in={showSubMenu}
          timeout="auto"
          unmountOnExit
          sx={{ width: '100%' }}
        >
          <List component="div" disablePadding>
            {menu.submenus &&
              menu.submenus.map((subMenu: any) => (
                <>
                  {showSubSubMenuDefault && (
                    <>
                      <ListItem key={subMenu.sys.id} disablePadding>
                        <ListItemButton key={subMenu.sys.id}>
                          <Link
                            href={subMenu.menuLink}
                            style={{ paddingLeft: '20px' }}
                            onClick={toggleDrawer(false)}
                          >
                            <ListItemText
                              primary={subMenu.menuTitle}
                              sx={{ color: '#5f5f5f', fontSize: '20px' }}
                            />
                          </Link>
                        </ListItemButton>
                      </ListItem>
                      {subMenu.submenus &&
                        subMenu.submenus.map((subSubMenu: any) => (
                          <ListItem key={subSubMenu.sys.id} disablePadding>
                            <ListItemButton key={subSubMenu.sys.id}>
                              <Link
                                href={subSubMenu.menuLink}
                                style={{ paddingLeft: '40px' }}
                                onClick={toggleDrawer(false)}
                              >
                                <ListItemText
                                  primary={subSubMenu.menuTitle}
                                  sx={{ color: '#5f5f5f', fontSize: '20px' }}
                                />
                              </Link>
                            </ListItemButton>
                          </ListItem>
                        ))}
                    </>
                  )}
                  {!showSubSubMenuDefault && (
                    <CustomSubMenuItem subMenu={subMenu} />
                  )}
                </>
              ))}
          </List>
        </Collapse>
      </>
    );
  };

  const DrawerList = (
    <Box
      sx={{ width: isXsMobile ? '100vw' : 250 }}
      role="presentation"
      // onClick={toggleDrawer(false)}
    >
      <IconButton>
        <CloseIcon
          onClick={() => {
            setOpen(false);
          }}
          sx={{
            color: '#5f5f5f',
            top: 1,
            left: 1.5,
            zIndex: 100,
          }}
        />
      </IconButton>
      <List>
        {menus &&
          menus.map((menu: any) => (
            <div key={`menudiv_` + menu.sys.id}>
              <CustomMenuItem menu={menu} />
            </div>
          ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <div className="container mx-auto px-8 lg:px-40">
          <Toolbar sx={{ height: '85px' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Box sx={{ width: '200px' }}>
                <CoverImage
                  title=""
                  url="https://quandx.com/wp-content/uploads/2016/07/logggo.png"
                />
              </Box>
            </Typography>
            <nav>
              <div>
                <Button onClick={toggleDrawer(true)}>
                  <MenuIcon sx={{ color: 'black' }} />
                </Button>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                  {DrawerList}
                </Drawer>
              </div>
            </nav>
          </Toolbar>
        </div>
      </AppBar>
    </>
  );
}
