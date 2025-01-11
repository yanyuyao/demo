import { Box, Typography } from '@mui/material';
import { url } from 'inspector';
import CoverImage from '@/app/cover-image';

const ImageWithOverlay = ({ ...props }) => {
  const image = props.img.url;
  const headline = props.headline;
  const body = props.body;
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        width: '100%',
        height: '300px',
        m: 0,
        p: 0,
        // overflow: 'hidden',
        '& img': {
          width: '100%',
          height: '300px',
          objectFit: 'cover',
        },
      }}
    >
      <CoverImage title={headline} url={image} />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          opacity: 0,
          transition: 'opacity 0.5s ease',
          '&:hover': {
            opacity: 1,
          },
        }}
      >
        <Typography variant="h6">{headline}</Typography>
      </Box>
    </Box>
  );
};

export default ImageWithOverlay;
