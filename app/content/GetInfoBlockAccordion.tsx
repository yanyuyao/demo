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

const CustomAccordion = ({ ...props }) => {
  const title = props.title;
  const content = props.content;
  const img = props.img;
  return (
    <Accordion sx={{ mt: 1 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{ backgroundColor: '#fe5e52' }}
      >
        <Typography
          variant="h4"
          sx={{
            textDecoration: 'none',
            color: 'white',
          }}
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ background: '#f8f8f8' }}>
        <div className="container mx-auto my-5 gap-4 grid grid-cols-1 lg:grid-cols-2">
          {title == 'Headquarters' && <ContactMap />}
          {img && img.url && (
            <div className="col-span-1">
              <Box sx={{ width: '100%', mb: '20px' }}>
                <CoverImage title={title} url={img.url} />
              </Box>
            </div>
          )}
          <div className="col-span-1">
            <Box>
              <Typography
                variant="h4"
                sx={{ textDecoration: 'none', color: '#ed1c24', mb: '10px' }}
              >
                {title}
              </Typography>
              <ContentBox content={content} />
            </Box>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default async function GetInfoBlockAccordion({ ...props }) {
  const entryId = props?.entryId;
  const infoBlock = await getComponentInfoBlockByEntryId(entryId);

  return (
    <div className="mx-auto px-40 my-5">
      <div className="block">
        {infoBlock && infoBlock.block1Title && (
          <CustomAccordion
            title={infoBlock.block1Title}
            content={infoBlock.block1Body}
            img={infoBlock.block1Image}
          />
        )}
        {infoBlock && infoBlock.block2Title && (
          <CustomAccordion
            title={infoBlock.block2Title}
            content={infoBlock.block2Body}
            img={infoBlock.block2Image}
          />
        )}
        {infoBlock && infoBlock.block3Title && (
          <CustomAccordion
            title={infoBlock.block3Title}
            content={infoBlock.block3Body}
            img={infoBlock.block3Image}
          />
        )}
        {infoBlock && infoBlock.block4Title && (
          <CustomAccordion
            title={infoBlock.block4Title}
            content={infoBlock.block4Body}
            img={infoBlock.block4Image}
          />
        )}
      </div>
    </div>
  );
}
