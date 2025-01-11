import { getComponentInfoBlockByEntryId } from '@/lib/api';
import ImageCardGroup from '@/src/components/card/ImageCardGroup';

async function GetImageCardGroup({ ...props }) {
  const entryId = props.entryId;
  const infoBlock = await getComponentInfoBlockByEntryId(entryId);
  if (infoBlock) {
    return <ImageCardGroup infoBlock={infoBlock} showTitle={false} />;
  } else {
    return null;
  }
}

export default GetImageCardGroup;
