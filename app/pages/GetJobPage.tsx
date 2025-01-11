// 'use client';
import Link from 'next/link';
import { draftMode } from 'next/headers';
import { Markdown } from '@/lib/markdown';
import { getAllTopicProducts, getTopicProductBySlug } from '@/lib/api';
import CoverImage from '@/app/cover-image';
import { Box, Button, Typography } from '@mui/material';
import ContentBox from '@/app/ContentBox';
import ContactBox from '@/app/ContactBox';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PageBanner from '@/src/components/PageBanner';
import { getJobItemByEntryId } from '@/lib/contentfulApi';
import { Content } from 'next/font/google';
import { CalendarMonth, Map } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { useState } from 'react';

function showJobDate(date: any) {
  // {/* pushDate  2025-01-01T00:00:00.000Z, show x years ago, show x months ago, show x days ago if pushDate-today > 3 days */}
  const today = new Date();
  const pushDate = new Date(date);
  const diffTime = Math.abs(today.getTime() - pushDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.ceil(diffDays / 30);
  const diffYears = Math.ceil(diffMonths / 12);
  if (diffDays > 3) {
    if (diffYears > 1) {
      return diffYears + ' years ago';
    } else if (diffMonths > 1) {
      return diffMonths + ' months ago';
    } else {
      return diffDays + ' days ago';
    }
  } else {
    return 'Today';
  }
}
const ContactInfo = ({ ...props }) => {
  const page = props.page;

  // const [showContactInfo, setShowContactInfo] = useState(true);

  // const handleClick = () => {
  //   console.log('handleClick');
  //   setShowContactInfo(!showContactInfo);
  // };
  return (
    <>
      <Button
        variant="contained"
        color="error"
        sx={{ background: '#ed1c24' }}
        // onClick={() => setShowContactInfo(!showContactInfo)}
        // onClick={handleClick}
      >
        Apply for job
      </Button>
      {/* {showContactInfo && page.contactInfo && ( */}
      {page.contactInfo && (
        <Box
          sx={{
            border: '1px solid #ddd',
            padding: '10px',
            background: '#f9f9f9',
            my: 2,
          }}
        >
          <ContentBox content={page.contactInfo} />
        </Box>
      )}
    </>
  );
};
export default async function Page({ ...props }) {
  const entryId = props.entryId;
  const page = await getJobItemByEntryId(entryId);
  if (!page) return null;

  return (
    <div className="mx-auto px-0 m-0">
      {page?.heroBannerTitle && (
        <PageBanner
          title={page?.heroBannerTitle ? page.heroBannerTitle : 'Join With Us'}
          imgurl="https://quandx.com/wp-content/uploads/2016/06/banner4.jpg"
          isSlide={true}
        />
      )}
      <div className="container mx-auto my-20 px-10 lg:px-40">
        <Box>
          <Box
            sx={{
              color: 'white',
              background: '#90da36',
              px: '10px',
              float: 'left',
              width: 'auto',
              marginRight: '10px',
            }}
          >
            {page?.type &&
              page.type.map((item: any, index: any) => {
                return <span key={index}>{item} </span>;
              })}
          </Box>
          <AddLocationIcon sx={{ ml: '20px' }} />
          <span style={{ color: '#ed1c24' }}>{page.address}</span>
          <CalendarMonth sx={{ ml: '20px' }} /> Posted{' '}
          {showJobDate(page.pushDate)}
        </Box>
        <Grid
          container
          spacing={1}
          sx={{
            clear: 'both',
            my: 3,
            border: '1px solid #ddd',
            padding: '10px',
            background: '#f9f9f9',
          }}
        >
          <Box
            sx={{
              width: '50px',
              height: '50px',
              background: '#ddd',
              borderRadius: '5px',
              float: 'left',
              marginRight: '10px',
            }}
          >
            <CoverImage title="" url="company.png" slug="" />
          </Box>
          <Typography
            variant="h3"
            sx={{
              fontSize: '16px',
              color: '#404041',
              fontFamily: 'Lato',
              fontWeight: 'bold',
            }}
          >
            QuanDx Inc
          </Typography>
        </Grid>
        <article>
          <Typography variant="h4" sx={{ textDecoration: 'none', mb: '10px' }}>
            {page.headline}
          </Typography>
          {page.content && <ContentBox content={page.content} />}
          {/* red button, click it show contentinfo */}
          <ContactInfo page={page} />
        </article>
      </div>
    </div>
  );
}
