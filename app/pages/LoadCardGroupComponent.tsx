import GetTextBoxBlockGroup from '@/app/content/GetTextBoxBlockGroup';
import GetTextLineBlockGroup from '@/app/content/GetTextLineBlockGroup';
import GetImageCardTextGroup from '@/app/content/GetImageCardTextGroup';
import { useMediaQuery, Typography } from '@mui/material';
import GetPageTextCardGroup from '../content/GetPageTextCardGroup';

const LoadCardGroupComponent = ({
  layout,
  id,
}: {
  layout: string;
  id: string;
}) => {
  // const isMobile = useMediaQuery('screen and (max-width: 1024px)');
  // const isXsMobile = useMediaQuery('screen and (max-width: 724px)');
  const isMobile = 0;
  const isXsMobile = 0;
  // console.log('LoadCardGroupComponent ==> ', layout, id);

  if (layout == 'TextSliderCard') {
    return <GetTextBoxBlockGroup entryId={id} />;
  } else if (layout == 'TextCard') {
    return <>TextCard not finished</>;
  } else if (layout == 'TextLineCard') {
    return <GetTextLineBlockGroup entryId={id} />;
  } else if (layout == 'ImageCard') {
    return <>ImageCard not finished</>;
  } else if (layout == 'List') {
    return <>List not finished</>;
  } else if (layout == 'OnlyImageCard') {
    return <GetImageCardTextGroup entryId={id} />;
  } else if (layout == 'PageTextCard') {
    return <GetPageTextCardGroup entryId={id} />;
  } else {
    return <>Not Load : {layout}</>;
  }
};

export default LoadCardGroupComponent;
