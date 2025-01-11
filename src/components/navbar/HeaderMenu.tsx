'use client';
import { useMediaQuery, Theme, Typography } from '@mui/material';
import HeaderMenuMobile from '@/src/components/navbar/HeaderMenuMobile';
import HeaderMenuListMobile from '@/src/components/navbar/HeaderMenuListMobile';
import HeaderMenuRight from '@/src/components/navbar/HeaderMenuRight';

export default function HeaderMenu({ ...props }) {
  const headerMenus = props.headerMenus;
  const isMobile = useMediaQuery('screen and (max-width: 1024px)');

  if (headerMenus) {
    if (isMobile) {
      // return <HeaderMenuMobile topMenus={headerMenus} />;
      return <HeaderMenuListMobile topMenus={headerMenus} />;
    } else {
      return <HeaderMenuRight topMenus={headerMenus} />;
    }
  }
}
