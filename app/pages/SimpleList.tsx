import Link from 'next/link';
import { draftMode } from 'next/headers';

import MoreStories from '../more-stories';
import Avatar from '../avatar';
import Date from '../date';
import CoverImage from '../cover-image';

import { Markdown } from '@/lib/markdown';
import { getSimplePageListById } from '@/lib/contentfulApi';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import ContentBox from '../ContentBox';
import PageBanner from '@/src/components/PageBanner';

export default async function SimpleList({ ...props }) {
  const entryId = props.entryId;
  const showBanner = props?.showBanner ? props.showBanner : 'show';
  const page = await getSimplePageListById(entryId);
  const pageItems = page.simplePagesCollection.items;
  const layout = page.layout ? page.layout : 'List';
  const listData = pageItems.map((pageItem: any) => {
    return {
      headline: pageItem.headline,
      subline: pageItem.subline,
      content: pageItem.content,
      slug: '',
      coverImage: pageItem.coverImage,
    };
  });

  return (
    <div className="mx-auto px-0 m-0">
      {page?.heroBanner && page?.heroBanner?.url && showBanner == 'show' && (
        <PageBanner
          title={page?.heroBannerTitle}
          imgurl={page?.heroBanner?.url}
          isSlide={true}
        />
      )}
      {listData.map((pageItem: any, index: any) => (
        <div
          className="container mx-auto my-20 mt-10 lg:px-40 grid grid-cols-1 lg:grid-cols-5"
          key={`cs_` + index}
        >
          {/* left have one image, right have headline, subline, content */}
          <div className="col-span-1">
            <Box
              sx={{
                width: '90%',
                margin: 'auto',
                marginBottom: '10px',
                border: '8px solid #f8f8f8',
              }}
            >
              <CoverImage
                title={pageItem.headline}
                url={pageItem.coverImage.url}
              />
            </Box>
          </div>
          <div className="col-span-4">
            <Box sx={{ width: '100%', pl: 5 }}>
              <Typography variant="h4" sx={{ textDecoration: 'none' }}>
                {pageItem.headline}
              </Typography>
              <Typography variant="subtitle1">{pageItem.subline}</Typography>
              <hr
                style={{
                  borderColor: '#ed1c24',
                  marginBottom: '10px',
                  marginTop: '10px',
                }}
              />
              {pageItem.content && pageItem.content != undefined && (
                <ContentBox content={pageItem.content} />
              )}
            </Box>
          </div>
        </div>
      ))}
    </div>
  );
}
