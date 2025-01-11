import GetInfoBlockAccordion from '@/app/content/GetInfoBlockAccordion';
import GetInfoBlockDefault from '../content/GetInfoBlockDefault';

const LoadInfoBlockComponent = ({
  layout,
  id,
}: {
  layout: string;
  id: string;
}) => {
  if (layout == 'SliderCard') {
    return <>SliderCard not finished</>;
  } else if (layout == 'ImageCard') {
    return <>ImageCard not finished</>;
  } else if (layout == 'Accordion') {
    return <GetInfoBlockAccordion entryId={id} />;
  } else if (layout == 'LeftCard') {
    return <GetInfoBlockDefault entryId={id} />;
  } else {
    return <>not finished type {layout}</>;
  }
};

export default LoadInfoBlockComponent;
