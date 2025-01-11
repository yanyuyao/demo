import { getPageBySlug } from '@/lib/api';

async function PageComponents({ ...props }) {
  if (!props.slug) {
    return <>No page</>;
  }
  const pageContent = await getPageBySlug(props.slug);
  const contentCollection = pageContent?.contentCollection;
}

export default PageComponents;
