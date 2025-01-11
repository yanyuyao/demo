import { getComponentTextBlockByEntryId } from '@/lib/api';
import TextWithLineCard from '@/src/components/card/TextWithLineCard';
import TextCard from '@/src/components/card/TextCard';

async function GetOneTextBlock({ ...props }) {
  const entryId = props.entryId;
  //type one have line, box value
  const type = props.type;
  const textBlock = await getComponentTextBlockByEntryId(entryId);
  if (type == 'line') {
    return (
      <TextWithLineCard
        headline={textBlock.headline}
        subline={textBlock.subline}
        link={textBlock.link}
        linkText={textBlock.linkText}
        body={textBlock.body}
      />
    );
  } else {
    return (
      <TextCard
        headline={textBlock.headline}
        body={textBlock.body}
        colorPalette={textBlock.colorPalette}
      />
    );
  }
}

export default GetOneTextBlock;
