import {
  getComponentInfoBlockByEntryId,
  getTextBlockGroupByEntryId,
} from '@/lib/api';
import ImageCardTextGroup from '@/src/components/card/ImageCardTextGroup';

async function GetImageCardTextGroup({ ...props }) {
  const entryId = props.entryId;
  const blockgroup = await getTextBlockGroupByEntryId(entryId);
  if (blockgroup) {
    return (
      <ImageCardTextGroup
        blockgroup={blockgroup}
        showTitle={false}
        isXsMobile={props.isXsMobile}
        isMobile={props.isMobile}
      />
    );
  } else {
    return null;
  }
}

export default GetImageCardTextGroup;
