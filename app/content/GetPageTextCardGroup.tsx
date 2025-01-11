import { getTextBlockGroupByEntryId } from '@/lib/api';
import { Typography } from '@mui/material';
import TextCard from '@/src/components/card/TextCard';
import KeenCardSlider from '@/src/components/slider/KeenCardSlider';
import PageReferralLinkCard from '@/src/components/card/PageReferralLinkCard';

async function GetPageTextCardGroup({ ...props }) {
  const entryId = props.entryId;
  const blockgroup = await getTextBlockGroupByEntryId(entryId);
  // console.log('GetPageTextCardGroup ==> ', blockgroup.textBlockList.items);
  if (
    !blockgroup ||
    !blockgroup.textBlockList ||
    !blockgroup.textBlockList.items
  ) {
    return <>No block list</>;
  }

  return (
    <>
      {blockgroup.textBlockList.items.map((pageItem: any, index: any) => {
        return (
          <PageReferralLinkCard
            key={index}
            headline={pageItem.headline}
            subline={pageItem.subline}
            body={pageItem.body}
            index={index}
            slug={pageItem.link}
          />
        );
      })}
    </>
  );
}

export default GetPageTextCardGroup;
