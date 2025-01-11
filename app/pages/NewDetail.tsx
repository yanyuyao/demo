import Link from 'next/link';
import { draftMode } from 'next/headers';
import { Markdown } from '@/lib/markdown';
import Grid from '@mui/material/Grid2';

import {
  getNewsEventItemByEntryId,
  getNewsTop5Items,
} from '@/lib/contentfulApi';
import CoverImage from '@/app/cover-image';
import { Box, Typography } from '@mui/material';
import ContentBox from '@/app/ContentBox';
import PageBanner from '@/src/components/PageBanner';
import Top5News from './Top5News';

export default async function NewDetail({ ...props }) {
  const entryId = props.entryId;
  const showBanner = props?.showBanner ? props.showBanner : 'show';
  const page = await getNewsEventItemByEntryId(entryId);

  return (
    <div className="mx-auto px-0 m-0">
      {page?.bannerImage && page?.bannerImage?.url && showBanner == 'show' && (
        <PageBanner
          title={page?.headline}
          imgurl={page?.bannerImage?.url}
          isSlide={true}
        />
      )}
      <div className="container mx-auto my-20 px-10 lg:px-40">
        <Grid container spacing={1}>
          <Grid size={8} sx={{ paddingRight: '10px' }}>
            <article>
              <div className="block">
                <Typography variant="h2">{page.headline}</Typography>
                <ContentBox content={page.content} />
                <div className="clear-both mt-20"></div>
              </div>
            </article>
          </Grid>
          <Grid
            size={4}
            sx={{ borderLeft: '1px solid #ddd', paddingLeft: '10px' }}
          >
            <Top5News />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
