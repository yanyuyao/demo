import { draftMode } from 'next/headers';
import {
  getAllBasePages,
  getBasePageBySlug,
  getGenericPageById,
} from '@/lib/contentfulApi';
import GenericPage from '../pages/GenericPage';
import EmailBox from '@/app/contact-us/EmailBox';
import SimpleList from '../pages/SimpleList';
import SimplePage from '../pages/SimplePage';
import ProductList from '../pages/ProductList';
import ProductDetail from '../pages/ProductDetail';
import GenericList from '../pages/GenericList';
import NewList from '../pages/NewList';
import NewDetail from '../pages/NewDetail';
import GetJobPage from '../pages/GetJobPage';

export async function generateStaticParams() {
  const allPages = await getAllBasePages(false);

  const paths = allPages.map((page: any) => ({
    slug: page.slug,
  }));

  return paths;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { isEnabled } = draftMode();
  const page = await getBasePageBySlug(params.slug);
  const contentSection = page?.contentSection;
  const entryId = contentSection?.sys?.id;
  const typename = contentSection?.__typename;
  let pageContent = null;
  // console.log('Page: ', params.slug, entryId, typename);
  if (typename == 'GenericPage') {
    return (
      <div className="w-full">
        <GenericPage entryId={entryId} pagePath={params.slug} />
        {params.slug == 'contactus' && <EmailBox />}
      </div>
    );
  } else if (typename == 'GenericList') {
    return <GenericList entryId={entryId} />;
  } else if (typename == 'CustomerStory') {
    // same as SimplePage
    return <SimplePage entryId={entryId} />;
  } else if (typename == 'SimplePageList') {
    return <SimpleList entryId={entryId} />;
  } else if (typename == 'TopicProduct') {
    //product detail page
    return <ProductDetail entryId={entryId} />;
  } else if (typename == 'ProductList') {
    return <ProductList entryId={entryId} />;
  } else if (typename == 'NewsEventsList') {
    return <NewList entryId={entryId} />;
  } else if (typename == 'News') {
    return <NewDetail entryId={entryId} />;
  } else if (typename == 'JobPages') {
    return <GetJobPage entryId={entryId} />;
  }

  return (
    <div className="w-full">Load Page Content, not found type :{typename}</div>
  );
}
