'use client';
import { useMediaQuery, Typography } from '@mui/material';
import ImageWithOverlay from './ImageWithOverlay';
import Grid from '@mui/material/Grid2';

const ImageCardGroup = ({ ...props }) => {
  const infoBlock = props.infoBlock;
  const headline = infoBlock.headline;
  const subline = infoBlock.subline;
  const body = infoBlock.body;
  const showTitle = props.showTitle;
  const isMobile = useMediaQuery('screen and (max-width: 1024px)');
  const isXsMobile = useMediaQuery('screen and (max-width: 724px) ');
  let gridSize = 3;
  if (isXsMobile) {
    gridSize = 12;
  } else {
    if (isMobile) {
      gridSize = 6;
    } else {
      gridSize = 3;
    }
  }

  if (infoBlock) {
    return (
      <Grid container spacing={0}>
        <Grid size={gridSize} sx={{ height: '300px' }}>
          <ImageWithOverlay
            img={infoBlock.block1Image}
            body={infoBlock.block1Body}
          />
        </Grid>
        <Grid size={gridSize} sx={{ height: '300px' }}>
          <ImageWithOverlay
            img={infoBlock.block2Image}
            body={infoBlock.block2Body}
          />
        </Grid>
        <Grid size={gridSize} sx={{ height: '300px' }}>
          <ImageWithOverlay
            img={infoBlock.block3Image}
            body={infoBlock.block3Body}
          />
        </Grid>
        <Grid size={gridSize} sx={{ height: '300px' }}>
          <ImageWithOverlay
            img={infoBlock.block4Image}
            body={infoBlock.block4Body}
          />
        </Grid>
      </Grid>
    );
  } else {
    return <></>;
  }
};
export default ImageCardGroup;
