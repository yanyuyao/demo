import { getGenericListById } from '@/lib/contentfulApi';
import PageReferralLinkCard from '@/src/components/card/PageReferralLinkCard';
import List from '@/src/components/list/List';

const GenericList = async ({ ...props }) => {
  const entryId = props.entryId;
  const page = await getGenericListById(entryId);
  const pageItems = page.genericPagesCollection.items;
  const layout = page.layout ? page.layout : 'List';
  const listData = pageItems.map((pageItem: any) => {
    return {
      headline: pageItem.headline,
      subline: pageItem.subline,
      slug: pageItem.linkedFrom.pageCollection.items[0].slug,
    };
  });
  if (layout == 'PageTextCard') {
    return (
      <>
        {listData.map((pageItem: any, index: any) => {
          return (
            <PageReferralLinkCard
              key={index}
              headline={pageItem.headline}
              subline={pageItem.subline}
              index={index}
              slug={pageItem.slug}
            />
          );
        })}
      </>
    );
  } else if (layout == 'List') {
    return <List listData={listData} />;
  }
};

export default GenericList;
