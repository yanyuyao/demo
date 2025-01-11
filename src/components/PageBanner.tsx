//create page top banner, width , and title on center, middle of the banner image
import { Box, Typography } from '@mui/material';
import CoverImage from '@/app/cover-image';
import KeenSlider from './slider/KeenSlider';

const PageBanner = ({ ...props }) => {
  const title = props.title;
  const imgurl = props.imgurl;
  const isSlide = props.isSlide ? true : false;

  if (isSlide) {
    const slideArr = [];
    slideArr.push({
      imgurl: imgurl,
      headline: title,
      subline: '',
      link: '',
    });
    slideArr.push({
      imgurl: imgurl,
      headline: title,
      subline: '',
      link: '',
    });
    // console.log('PageBanner slideArr ==> ', slideArr);
    return <KeenSlider data={slideArr} height="300px" />;
  }

  return (
    <Box
      sx={{
        w: '100%',
        position: 'relative',
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '300px',
        backgroundImage: `url(${imgurl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        width: '100%',
        visibility: 'inherit',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontSize: '40px',
          fontFamily: 'Oswald',
          position: 'absolute',
          color: 'white',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default PageBanner;
