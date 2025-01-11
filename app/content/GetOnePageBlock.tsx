import { getPageByEntryId } from '@/lib/api';
import TextCard from '@/src/components/card/TextCard';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import PageReferralLinkCard from '@/src/components/card/PageReferralLinkCard';

async function GetOnePageBlock({ ...props }) {
  const entryId = props.entryId;
  //type only have two value : card, link
  const type = props.type;
  const page = await getPageByEntryId(entryId);
  if (type == 'link') {
    return (
      <Box sx={{ mb: 2 }}>
        <Link href={page.slug}>{page.title}</Link>
      </Box>
    );
  } else {
    return page && <PageReferralLinkCard page={page} />;
  }
}

export default GetOnePageBlock;
