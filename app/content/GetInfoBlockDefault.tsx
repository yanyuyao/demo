import { getComponentInfoBlockByEntryId } from '@/lib/api';
import CoverImage from '@/app/cover-image';
import { Box } from '@mui/material';
import ContentBox from '@/app/ContentBox';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import ContactMap from '@/app/contact-us/ContactMap';

export default async function GetInfoBlockDefault({ ...props }) {
  const entryId = props?.entryId;
  const infoBlock = await getComponentInfoBlockByEntryId(entryId);
  // console.log('GetInfoBlockDefault: ', infoBlock);
  return (
    <div className="block">
      {infoBlock?.block1Image?.url && (
        <Box
          sx={{
            width: '85%',
            margin: 'auto',
            padding: '15px',
            marginBottom: '10px',
            border: '8px solid #f8f8f8',
          }}
        >
          <CoverImage
            title={infoBlock.block1Title}
            url={infoBlock.block1Image.url}
            slug={infoBlock?.block1Link}
          />
        </Box>
      )}
      {infoBlock?.block2Image?.url && (
        <Box
          sx={{
            width: '85%',
            margin: 'auto',
            padding: '15px',
            marginBottom: '10px',
            border: '8px solid #f8f8f8',
          }}
        >
          <CoverImage
            title={infoBlock.block2Title}
            url={infoBlock.block2Image.url}
            slug={infoBlock?.block2Link}
          />
        </Box>
      )}
      {infoBlock?.block3Image?.url && (
        <Box
          sx={{
            width: '85%',
            margin: 'auto',
            padding: '15px',
            marginBottom: '10px',
            border: '8px solid #f8f8f8',
          }}
        >
          <CoverImage
            title={infoBlock.block3Title}
            url={infoBlock.block3Image.url}
            slug={infoBlock?.block3Link}
          />
        </Box>
      )}
      {infoBlock?.block4Image?.url && (
        <Box
          sx={{
            width: '85%',
            margin: 'auto',
            padding: '15px',
            marginBottom: '10px',
            border: '8px solid #f8f8f8',
          }}
        >
          <CoverImage
            title={infoBlock.block4Title}
            url={infoBlock.block4Image.url}
            slug={infoBlock?.block4Link}
          />
        </Box>
      )}
      {infoBlock?.referenceVideoLink && (
        <Box
          sx={{
            width: '85%',
            margin: 'auto',
            padding: '15px',
            marginBottom: '10px',
            border: '8px solid #f8f8f8',
          }}
        >
          <iframe
            src={infoBlock?.referenceVideoLink}
            width="100%"
            style={{ border: 'none' }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </Box>
      )}
    </div>
  );
}
