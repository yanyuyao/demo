import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ContentBox from '../ContentBox';
import PageBanner from '@/src/components/PageBanner';
import HomeBanner from '@/src/components/slider/HomeBanner';
import LoadCardGroupComponent from './LoadCardGroupComponent';
import LoadInfoBlockComponent from './LoadInfoBlockComponent';
import GenericList from './GenericList';
import { getGenericPageById } from '@/lib/contentfulApi';
import { GetServerSideProps } from 'next';

const loadComponent = ({ ...props }) => {
  const typename = props?.__typename;
  const id = props?.sys?.id;
  if (typename == undefined || typename == '') {
    return <></>;
  }
  // console.log('LoadComponent: ', typename, id);
  switch (typename) {
    case 'ComponentInfoBlock':
      // return <GetImageCardGroup entryId={id} />;
      return <LoadInfoBlockComponent id={id} layout={props?.layout} />;
    case 'GenericList':
      return <GenericList entryId={id} />;
    case 'BlockGroup':
      return <LoadCardGroupComponent id={id} layout={props?.layout} />;
    case 'Slide':
      return <HomeBanner />;
    default:
      return (
        <div key={id} style={{ color: 'red' }}>
          Unknown reference type: {typename}
        </div>
      );
  }
};
const loadLeftComponent = ({ ...props }) => {
  const typename = props?.__typename;
  const id = props?.sys?.id;
  if (typename == undefined || typename == '') {
    return <></>;
  }
  return <LoadInfoBlockComponent id={id} layout={props?.layout} />;
};

export default async function GenericPage({ ...props }) {
  const entryId = props.entryId;
  const pagePath = props?.pagePath;
  const page = await getGenericPageById(entryId);
  const leftSections = page?.leftSectionsCollection?.items;
  // console.log('leftSections: ', leftSections);

  const articleSection = () => {
    return (
      <>
        <article>
          <div className="block">
            {(page?.headline || page?.content) && (
              <>
                {page.headline && (
                  <Typography variant="h2" sx={{ fontFamily: 'Oswald' }}>
                    {page.headline}
                  </Typography>
                )}
                {page.content && <ContentBox content={page?.content} />}
                <div className="clear-both mt-20"></div>
              </>
            )}
          </div>
        </article>
      </>
    );
  };
  let containerClassName = 'container mx-auto my-20 px-10 lg:px-40';
  if (pagePath == 'home') {
    containerClassName = 'container mx-auto';
  }
  return (
    <>
      <div className="mx-auto px-0 m-0">
        {page?.heroBanner && page?.heroBanner?.url && (
          <PageBanner
            title={page?.heroBannerTitle}
            imgurl={page?.heroBanner?.url}
            isSlide={true}
          />
        )}
        {/* Grid , leftSection: 3, ArticleSection 9 */}

        {leftSections.length ? (
          <div className={containerClassName}>
            <Grid container spacing={1}>
              <Grid size={4}>
                {leftSections.map(
                  (reference: any, index: number) =>
                    reference.layout == 'LeftCard' &&
                    loadLeftComponent(reference),
                )}
              </Grid>
              <Grid size={8}>{articleSection()}</Grid>
            </Grid>
          </div>
        ) : (
          <div className={containerClassName}>{articleSection()}</div>
        )}

        {pagePath == 'global-distributors' && (
          <div className="mx-full lg:px-20">
            <iframe
              src="/map.html"
              style={{ width: '100%', height: '600px' }}
            />
          </div>
        )}
        {page?.bottomSectionsCollection &&
          page?.bottomSectionsCollection?.items?.length > 0 && (
            <div className="mx-full">
              {page.bottomSectionsCollection.items.map(
                (reference: any, index: number) =>
                  reference.layout != 'leftCard' && loadComponent(reference),
              )}
            </div>
          )}
      </div>
    </>
  );
}
