import { getMenuItemByEntryId } from '@/lib/api';
const GetSubMenuItems = async ({ entryId }: { entryId: string }) => {
  const menu = await getMenuItemByEntryId(entryId, false);
  const menuItemsCount = menu?.submenus?.items?.length;
  if (menuItemsCount > 0) {
    const menuItems = menu?.submenus?.items;
    if (menuItems) {
      return (
        <ul>
          {menuItems.map((subMenu: any) => (
            <li key={subMenu.sys.id}>
              <a href={subMenu.menuLink}>{subMenu.menuTitle}</a>
            </li>
          ))}
        </ul>
      );
    }
  }
  return null;
};

const GetMenuItems = async ({ entryId }: { entryId: string }) => {
  const menu = await getMenuItemByEntryId(entryId, false);
  const menuItemsCount = menu?.submenus?.items?.length;
  if (menuItemsCount > 0) {
    const menuItems = menu?.submenus?.items;
    if (menuItems) {
      return (
        <ul>
          {menuItems.map((subMenu: any) => (
            <li key={subMenu.sys.id}>
              <a href={subMenu.menuLink}>{subMenu.menuTitle}</a>
              <GetSubMenuItems entryId={subMenu.sys.id} />
            </li>
          ))}
        </ul>
      );
    }
  }
  return null;
};

export default GetMenuItems;
