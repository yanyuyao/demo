import { getTextBlockGroupByEntryId } from '@/lib/api';
import { Typography } from '@mui/material';
import TextCard from '@/src/components/card/TextCard';
import KeenCardSlider from '@/src/components/slider/KeenCardSlider';

async function GetTextBoxBlockGroup({ ...props }) {
  const entryId = props.entryId;
  const blockgroup = await getTextBlockGroupByEntryId(entryId);
  if (
    !blockgroup ||
    !blockgroup.textBlockList ||
    !blockgroup.textBlockList.items
  ) {
    return <>No block list</>;
  }

  return (
    <div className="container mx-auto px-8 py-8 lg:py-10 lg:pb-5 lg:px-20">
      <Typography
        sx={{
          textAlign: 'center',
          fontSize: '28px',
          color: '#444444',
          fontFamily: 'Lato',
        }}
      >
        {blockgroup.headline}
      </Typography>
      {/*<div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
         {blockgroup.textBlockList.items &&
          blockgroup.textBlockList.items.map((item: any, index: any) => (
            <TextCard
              key={'textcard_' + index}
              headline={item.headline}
              body={item.body}
              colorPalette={item.colorPalette}
            />
          ))} 
      </div>*/}
      <KeenCardSlider data={blockgroup} />
    </div>
  );
}

export default GetTextBoxBlockGroup;
