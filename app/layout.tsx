// @todo: do we need global css here?
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Inter } from 'next/font/google';
import { getHeaderMenus, getMenuItems, getMenuItemByEntryId } from '@/lib/api';
import HeaderMenuRight from '../src/components/navbar/HeaderMenuRight';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Footer from '../src/components/Footer';
import { CMS_NAME } from '@/lib/constants';
import HeaderMenuMobile from '@/src/components/navbar/HeaderMenuMobile';
import HeaderMenu from '@/src/components/navbar/HeaderMenu';

export const metadata = {
  title: `Next.js and ${CMS_NAME} Example`,
  description: `This is a blog built with Next.js and ${CMS_NAME}.`,
};

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

// @todo: Move to separate component file
async function Header() {
  let headerMenus = await getHeaderMenus();
  if (headerMenus) {
    //for each menu item, get the submenus
    for (let i = 0; i < headerMenus.length; i++) {
      let curmenu = headerMenus[i];
      let menu = await getMenuItemByEntryId(curmenu.sys.id, false);
      let menuItemsCount = menu?.submenus?.items?.length;
      if (menuItemsCount > 0) {
        let menuItems = menu?.submenus?.items;
        if (menuItems) {
          //for each submenu, get the subsubmenus
          for (let j = 0; j < menuItems.length; j++) {
            let submenu = menuItems[j];
            let subMenu = await getMenuItemByEntryId(submenu.sys.id, false);
            let subMenuItemsCount = subMenu?.submenus?.items?.length;
            if (subMenuItemsCount > 0) {
              let subMenuItems = subMenu?.submenus?.items;
              if (subMenuItems) {
                menuItems[j].submenus = subMenuItems;
              }
            }
          }

          headerMenus[i].submenus = menuItems;
        }
      }
    }
  }

  return <HeaderMenu headerMenus={headerMenus} />;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Header />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
