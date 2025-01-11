'use client';
import Link from '@mui/material/Link';
import { Box, Button, Typography } from '@mui/material';
import { useMediaQuery, Theme } from '@mui/material';
import ContentBox from '@/app/ContentBox';

const PageReferralLinkCard = ({ ...props }) => {
  const headline = props.headline;
  const subline = props.subline;
  const body = props.body;
  const index = props.index;
  const slug = props.slug;
  const isMobile = useMediaQuery('screen and (max-width: 1024px)');
  return (
    <Box
      sx={{
        mb: 0,
        py: 5,
        px: isMobile ? 5 : 10,
        width: isMobile ? '100%' : '50%',
        height: isMobile ? 'auto' : '250px',
        float: 'left',
        background: index % 2 == 0 ? '#ed1c24' : 'gray',
        color: 'white',
      }}
    >
      <Typography variant="subtitle2" sx={{ fontSize: '20px' }}>
        {headline && headline != 'undefined' ? headline : ''}
      </Typography>
      <Typography variant="subtitle2" sx={{ fontSize: '16px' }}>
        {subline && subline != 'undefined' ? subline : ''}
      </Typography>
      {body && body != 'undefined' && (
        <ContentBox content={body} textColor="white" />
      )}
      <Box sx={{ mt: 2, width: '100%', textAlign: 'center' }}>
        <Button
          variant="outlined"
          href={slug}
          sx={{
            background: '#f5f5f5',
            border: '1px solid #ddd',
            color: 'black',
            fontFamily: 'Lato',
            fontSize: '14px',
            textTransform: 'none',
            py: 1,
            px: 4,
          }}
        >
          View Page
        </Button>
      </Box>
    </Box>
  );
};

export default PageReferralLinkCard;
