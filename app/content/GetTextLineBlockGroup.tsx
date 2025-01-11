import { getTextBlockGroupByEntryId } from '@/lib/api';
import { Typography } from '@mui/material';
import GetOneTextBlock from './GetOneTextBlock';

async function GetTextLineBlockGroup({ ...props }) {
  const entryId = props.entryId;
  const blockgroup = await getTextBlockGroupByEntryId(entryId);

  if (blockgroup) {
    return (
      <div className="container mx-auto px-8 py-8 lg:py-10 lg:pt-0 lg:px-40">
        {blockgroup.groupName && (
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '40px',
              textTransform: 'uppercase',
              color: '#404041',
            }}
          >
            {blockgroup.groupName}
          </Typography>
        )}
        <Typography
          sx={{
            textAlign: 'center',
            color: '#404041',
            fontSize: '22px',
            fontFamily: 'Lato',
          }}
        >
          {blockgroup?.headline}
        </Typography>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {blockgroup?.textBlockList.items &&
            blockgroup?.textBlockList.items.map((item: any, index: any) => (
              <>
                <GetOneTextBlock entryId={item.sys.id} type="line" />
              </>
            ))}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default GetTextLineBlockGroup;
