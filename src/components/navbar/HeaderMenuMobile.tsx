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
export default function HeaderMenuMobile({ topMenus }: { topMenus: any[] }) {
  const isXsMobile = useMediaQuery('screen and (max-width: 724px)');
  const menus = topMenus;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: isXsMobile ? '100vh' : 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <IconButton>
        <CloseIcon
          onClick={() => {
            setOpen(false);
          }}
          sx={{
            color: 'black',
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 100,
          }}
        />
      </IconButton>
      <List>
        {menus &&
          menus.map((menu: any) => (
            <div key={`menudiv_` + menu.sys.id}>
              <ListItem key={menu.sys.id} disablePadding>
                <ListItemButton>
                  <Link
                    href={menu.menuLink}
                    className="block md:px-4 transition hover:text-primary  dark:hover:text-main"
                    style={{ color: '#5f5f5f' }}
                    // on click show submenus
                  >
                    <span>{menu.menuTitle}</span>
                  </Link>
                </ListItemButton>
              </ListItem>
              {/* {menu.submenus &&
                menu.submenus.map((subMenu: any) => (
                  <>
                    <ListItem key={subMenu.sys.id} disablePadding>
                      <ListItemButton key={subMenu.sys.id}>
                        <Link
                          href={subMenu.menuLink}
                          style={{ paddingLeft: '20px' }}
                        >
                          {subMenu.menuTitle}
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
                            >
                              {subSubMenu.menuTitle}
                            </Link>
                          </ListItemButton>
                        </ListItem>
                      ))}
                  </>
                ))} */}
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
