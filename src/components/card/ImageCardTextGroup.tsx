import ImageWithOverlay from './ImageWithOverlay';
import Grid from '@mui/material/Grid2';

const ImageCardTextGroup = ({ ...props }) => {
  let gridSize = 3;
  const isXsMobile = props.isXsMobile;
  const isMobile = props.isMobile;
  const blockgroup = props.blockgroup;
  if (isXsMobile) {
    gridSize = 12;
  } else {
    if (isMobile) {
      gridSize = 6;
    } else {
      gridSize = 3;
    }
  }

  if (blockgroup == '' || blockgroup == undefined) {
    return <></>;
  }

  const textBlockListItems = blockgroup?.textBlockList?.items;
  if (textBlockListItems == '' || textBlockListItems == undefined) {
    return <></>;
  }

  const headline = blockgroup.headline;
  const body = blockgroup.body;
  const showTitle = props.showTitle;

  if (blockgroup && textBlockListItems) {
    return (
      <Grid container spacing={0}>
        {textBlockListItems.map((block: any, index: any) => (
          <Grid size={gridSize} sx={{ height: '300px' }} key={index}>
            <ImageWithOverlay img={block.image} body={block.body} />
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return <></>;
  }
};
export default ImageCardTextGroup;
