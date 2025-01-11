// 'use client';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { url } from 'inspector';
import CoverImage from '@/app/cover-image';
import { Box } from '@mui/material';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
// import GetMenuItems from '@/app/content/GetMenuItems';

export default function HeaderMenuRight({ topMenus }: { topMenus: any[] }) {
  const menus = topMenus;

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <div className="container mx-auto px-8 lg:px-40">
          <Toolbar sx={{ height: '90px' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Box sx={{ width: '250px', marginTop: '10px' }}>
                <CoverImage
                  title=""
                  url="https://quandx.com/wp-content/uploads/2016/07/logggo.png"
                />
              </Box>
            </Typography>
            <nav>
              <ul className="space-y-6 tracking-wide font-medium text-base lg:text-sm lg:flex lg:space-y-0">
                {menus &&
                  menus.map((menu: any) => (
                    <li
                      key={menu.sys.id}
                      data-key={menu.sys.id}
                      style={{ marginRight: '0px' }}
                    >
                      <Link
                        // if first str is / then use as is else add / in front
                        href={
                          menu.menuLink[0] === '/'
                            ? menu.menuLink
                            : '/' + menu.menuLink
                        }
                        className="block md:px-4 transition hover:text-primary  dark:hover:text-main"
                        style={{ color: '#3e3b36', fontSize: '14px' }}
                      >
                        <span>{menu.menuTitle}</span>
                      </Link>
                      {/* <GetMenuItems entryId={menu.sys.id} /> */}
                      {menu.submenus && (
                        <ul className="space-y-6 tracking-wide font-medium text-base lg:text-sm lg:flex lg:space-y-0">
                          {menu.submenus.map((subMenu: any) => (
                            <li key={subMenu.sys.id} data-key={subMenu.sys.id}>
                              <Link
                                href={
                                  subMenu.menuLink[0] === '/'
                                    ? subMenu.menuLink
                                    : '/' + subMenu.menuLink
                                }
                                className="block md:px-4 transition hover:text-primary  dark:hover:text-main"
                                style={{ fontSize: '14px' }}
                              >
                                <span>{subMenu.menuTitle}</span>
                              </Link>
                              {subMenu.submenus && (
                                <ul className="space-y-6 tracking-wide font-medium text-base lg:text-sm lg:flex lg:space-y-0">
                                  {subMenu.submenus.map((subSubMenu: any) => (
                                    <li
                                      key={subSubMenu.sys.id}
                                      data-key={subSubMenu.sys.id}
                                    >
                                      <Link
                                        href={
                                          subSubMenu.menuLink[0] === '/'
                                            ? subSubMenu.menuLink
                                            : '/' + subSubMenu.menuLink
                                        }
                                        className="block md:px-4 transition hover:text-primary  dark:hover:text-main"
                                        style={{ fontSize: '14px' }}
                                      >
                                        <span>{subSubMenu.menuTitle}</span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                <li
                  key="searchbtn"
                  style={{ marginRight: '0px', marginLeft: '30px' }}
                >
                  <Link
                    href="javascript:;"
                    className="block md:px-4 transition hover:text-primary  dark:hover:text-main"
                    style={{
                      color: '#ed1c24',
                      fontSize: '14px',
                      whiteSpace: 'nowrap',
                      letterSpacing: '6px',
                    }}
                  >
                    <SearchIcon />
                  </Link>
                </li>
              </ul>
            </nav>
          </Toolbar>
        </div>
        <div
          className="ls-shadow-top"
          style={{
            position: 'absolute',
            backgroundImage:
              'url(https://quandx.com/wp-content/uploads/2016/06/shadow-top-1.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top center',
            height: '42px',
            width: '100%',
            top: '90px',
            zIndex: 104,
          }}
        ></div>
      </AppBar>
    </>
  );
}
