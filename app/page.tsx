import { getBasePageBySlug, getGenericPageById } from '@/lib/contentfulApi';
import GenericPage from './pages/GenericPage';

export default async function Page() {
  const page = await getBasePageBySlug('home');
  const contentSection = page?.contentSection;
  const entryId = contentSection?.sys?.id;
  const typename = contentSection?.__typename;

  if (typename == 'GenericPage') {
    return (
      <div className="w-full">
        <GenericPage entryId={entryId} pagePath="home" />
      </div>
    );
  } else {
    return <div className="w-full">Home Page</div>;
  }
}
