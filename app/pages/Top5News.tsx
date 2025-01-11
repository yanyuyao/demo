import Link from 'next/link';
import { draftMode } from 'next/headers';
import { Markdown } from '@/lib/markdown';
import Grid from '@mui/material/Grid2';

import {
  getNewsEventItemByEntryId,
  getNewsTop5Items,
} from '@/lib/contentfulApi';
import CoverImage from '@/app/cover-image';
import { Box, Chip, Typography } from '@mui/material';
import ContentBox from '@/app/ContentBox';
import PageBanner from '@/src/components/PageBanner';
import {
  History,
  Square,
  SquareFootRounded,
  SquareOutlined,
  SquareRounded,
} from '@mui/icons-material';

const Top5News = async () => {
  const top5News = await getNewsTop5Items();
  // console.log('top5news===>', top5News);
  return (
    <>
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'Lato',
          fontWeight: 'normal',
          fontSize: '22px',
          fontStyle: 'normal',
        }}
      >
        Recent News
      </Typography>
      {top5News.map((news: any, index: any) => (
        <Box
          key={`topnews_` + index}
          className="newsRight"
          sx={{
            padding: '15px',
            marginBottom: '40px',
            position: 'relative',
            '&:hover p': {
              color: 'white',
              zIndex: 999,
              position: 'relative',
            },
            '&:hover .body1': {
              color: 'white',
              zIndex: 999,
              position: 'relative',
            },
            '&:hover hr': {
              color: 'white',
              zIndex: 999,
              position: 'relative',
            },
            '&:hover:after': {
              width: '100%',
              zIndex: 1,
            },
            '&:after': {
              content: '""',
              display: 'block',
              position: 'absolute',
              right: 0,
              top: 0,
              width: '4px',
              height: '100%',
              backgroundColor: '#ed1c24',
              transition: 'all 0.3s ease-in-out',
            },
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontSize: '14px', paddingRight: '30px' }}
          >
            {news.headline}
          </Typography>
          <hr style={{ marginTop: '6px', marginBottom: '6px' }} />
          <Typography variant="body1" sx={{ fontSize: '16px', color: 'grey' }}>
            <History />
            {news.createdDate.split('T')[0]}
          </Typography>
          <Chip
            sx={{
              backgroundColor: 'red',
              color: 'white',
              fontSize: '10px',
              borderRadius: '5px',
              float: 'right',
              marginRight: '-32px',
              marginTop: '-40px',
            }}
            label={0}
          />
        </Box>
      ))}
    </>
  );
};

export default Top5News;
