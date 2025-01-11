import { draftMode } from 'next/headers';
import {
  getAllBasePages,
  getAllJobList,
  getBasePageBySlug,
  getGenericPageById,
} from '@/lib/contentfulApi';
import PageBanner from '@/src/components/PageBanner';
import {
  Box,
  Button,
  Checkbox,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import CoverImage from '../cover-image';
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

const JobItem = ({ ...props }) => {
  const data = props.data;
  // console.log('JobItem===> ', data);
  return (
    <Grid
      container
      spacing={1}
      sx={{ p: '10px', borderBottom: '1px solid #ddd' }}
    >
      <Grid size={6}>
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

        <Link
          href={`${data.linkedFrom.pageCollection.items[0].slug}`}
          underline="none"
        >
          <Typography
            variant="subtitle1"
            sx={{ fontSize: '16px', color: 'black', fontFamily: 'Lato' }}
          >
            {data.headline}
          </Typography>
        </Link>
        <Typography
          variant="subtitle2"
          sx={{ fontSize: '14px', color: 'gray', fontWeight: 'bold' }}
        >
          QuanDx Inc.
        </Typography>
      </Grid>
      <Grid size={5}>
        <Typography
          variant="subtitle2"
          sx={{ fontSize: '14px', fontFamily: 'Lato', color: 'grey' }}
        >
          {data.address}
        </Typography>
      </Grid>
      <Grid size={1}>
        <Typography
          variant="subtitle1"
          sx={{
            color: '#90da36',
            fontSize: '16px',
            fontWeight: 'bold',
            fontFamily: 'Lato',
          }}
        >
          {data.type &&
            data.type.map((item: any, index: any) => {
              return <span key={index}>{item} </span>;
            })}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontSize: '14px', fontFamily: 'Lato' }}
        >
          {showJobDate(data.pushDate)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default async function GetJobList() {
  const jobListData = await getAllJobList();
  //   console.log('jobListData: ', jobListData);
  if (!jobListData) {
    return <></>;
  }
  return (
    <>
      {jobListData && jobListData?.length > 0 ? (
        jobListData.map((item: any, index: any) => {
          return <JobItem key={index} data={item} />;
        })
      ) : (
        <div>No data found</div>
      )}
    </>
  );
}
