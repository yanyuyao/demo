import CoverImage from '@/app/cover-image';
import { Box, Typography } from '@mui/material';
import ContentBox from '../ContentBox';
import PageBanner from '@/src/components/PageBanner';
import { getSimplePageById } from '@/lib/contentfulApi';

export default async function SimplePage({ ...props }) {
  const entryId = props.entryId;
  const page = await getSimplePageById(entryId);

  return (
    <>
      <div className="mx-auto px-0 m-0">
        <article>
          <div className="block">
            {page?.heroBanner && page?.heroBanner?.url && (
              <PageBanner
                title={page?.heroBannerTitle}
                imgurl={page?.heroBanner?.url}
                isSlide={true}
              />
            )}
            <div className="container mx-auto my-20 mt-10 lg:px-40 grid grid-cols-1 lg:grid-cols-5">
              <div className="col-span-1">
                <Box
                  sx={{
                    width: '90%',
                    margin: 'auto',
                    marginBottom: '10px',
                    border: '8px solid #f8f8f8',
                  }}
                >
                  {page?.coverImage && (
                    <CoverImage
                      title={page?.headline}
                      url={page?.coverImage?.url}
                    />
                  )}
                </Box>
              </div>
              <div className="col-span-4">
                <Box sx={{ width: '100%', pl: 5 }}>
                  <Typography variant="h4" sx={{ textDecoration: 'none' }}>
                    {page.headline}
                  </Typography>
                  <Typography variant="subtitle1">{page.subline}</Typography>
                  <hr
                    style={{
                      borderColor: '#ed1c24',
                      marginBottom: '10px',
                      marginTop: '10px',
                    }}
                  />
                  {page.content && page.content != undefined && (
                    <ContentBox content={page.content} />
                  )}
                </Box>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
