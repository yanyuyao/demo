import Link from 'next/link';
import { draftMode } from 'next/headers';
import { Markdown } from '@/lib/markdown';
import { getAllTopicProducts, getTopicProductById } from '@/lib/api';
import CoverImage from '@/app/cover-image';
import { Box, Typography } from '@mui/material';
import ContentBox from '@/app/ContentBox';
import ContactBox from '@/app/ContactBox';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PageBanner from '@/src/components/PageBanner';

export default async function ProductDetail({ ...props }) {
  const entryId = props.entryId;
  const page = await getTopicProductById(entryId);

  return (
    <div className="mx-auto px-0 m-0">
      <PageBanner
        title="Products"
        imgurl="https://quandx.com/wp-content/uploads/2016/06/banner2.jpg"
      />
      <div className="container mx-auto my-20 mt-10 lg:px-40 grid grid-cols-1 lg:grid-cols-3">
        <div className="col-span-1 ">
          <Box sx={{ width: '100%', mb: '20px' }}>
            <Box
              sx={{
                border: '8px solid #eee',
                p: 2,
                width: '80%',
                margin: 'auto',
              }}
            >
              <CoverImage title={page.name} url={page.featuredImage.url} />
            </Box>
          </Box>
        </div>
        <div className="col-span-2 px-4">
          <Box>
            <Typography
              variant="h4"
              sx={{ textDecoration: 'none', color: '#ed1c24', mb: '10px' }}
            >
              {page.name}
            </Typography>
            {page?.description && page.description != '' && (
              <ContentBox content={page.description} />
            )}
            <Typography
              variant="h4"
              sx={{
                textDecoration: 'none',
                color: '#ed1c24',
                mt: '20px',
                mb: '10px',
              }}
            >
              Key features:
            </Typography>
            {page?.keyFeatures && page.keyFeatures != '' && (
              <ContentBox content={page.keyFeatures} />
            )}
            <Typography
              variant="h4"
              sx={{
                textDecoration: 'none',
                color: '#ed1c24',
                mt: '20px',
                mb: '10px',
              }}
            >
              Disease Relevance :
            </Typography>
            <ContentBox content={page.diseaseRelevance} />
            {/* show contact info in Box, Box have top and bottom dark line */}
          </Box>
        </div>
      </div>
      <div className="container mx-auto my-20 mt-10 lg:px-40 grid grid-cols-1">
        <ContactBox />
        <Box
          sx={{
            // display: 'flex',
            // flexDirection: 'row',
            // justifyContent: 'space-between',
            width: '100%',
            mb: '35px',
          }}
        >
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ backgroundColor: '#ed1c24' }}
            >
              <Typography
                variant="h4"
                sx={{
                  textDecoration: 'none',
                  color: 'white',
                }}
              >
                Technical Specs
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ContentBox content={page.technicalSpecs} />
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{
              '&.Mui-expanded': { margin: 0 },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                backgroundColor: '#ed1c24',
                mt: 1,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  textDecoration: 'none',
                  color: 'white',
                }}
              >
                Ordering Information
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ContentBox content={page.orderingInformation} />
            </AccordionDetails>
          </Accordion>
        </Box>
      </div>
    </div>
  );
}
