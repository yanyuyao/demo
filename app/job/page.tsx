import { draftMode } from 'next/headers';
import {
  getAllBasePages,
  getAllJobList,
  getBasePageBySlug,
  getGenericPageById,
} from '@/lib/contentfulApi';
import PageBanner from '@/src/components/PageBanner';
import { Box, Button, Checkbox, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import CoverImage from '../cover-image';
import GetJobList from '../pages/GetJobList';

export default function Page() {
  return (
    <>
      <>
        <div className="mx-auto px-0 m-0">
          <PageBanner
            title="Join With Us"
            imgurl="https://quandx.com/wp-content/uploads/2016/06/banner4.jpg"
            isSlide={true}
          />

          <div className="container mx-auto my-20 px-10 lg:px-40">
            <article>
              <div className="block">
                <Typography variant="h2" sx={{ fontFamily: 'Oswald' }}>
                  Career
                </Typography>
                <Box
                  className="search-job-box"
                  sx={{ background: '#eee', padding: '15px' }}
                >
                  <Grid container spacing={1}>
                    <Grid size={5}>
                      <TextField
                        id="searchjob"
                        name="searchjob"
                        placeholder="Keywords"
                        sx={{
                          background: '#fff',
                          width: '100%',
                          '& input': {
                            padding: '10px',
                            borderRadius: '5px',
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={5}>
                      <TextField
                        id="searchjob_location"
                        name="searchjob_location"
                        placeholder="Location"
                        sx={{
                          background: '#fff',
                          width: '100%',
                          '& input': {
                            padding: '10px',
                            borderRadius: '5px',
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ width: '100%' }}
                      >
                        Search
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
                <Box
                  className="search-job-box"
                  sx={{
                    background: '#f9f9f9',
                    border: '1px solid #e5e5e5',
                  }}
                >
                  <Grid container spacing={1}>
                    {/* Freelance, Full Time, Internship, Part Time, Temporary */}
                    <Checkbox
                      inputProps={{ 'aria-label': 'Freelance' }}
                      checked={true}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{ fontSize: '14px', mt: '10px' }}
                    >
                      Freelance
                    </Typography>
                    <Checkbox
                      inputProps={{ 'aria-label': 'Full Time' }}
                      checked={true}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{ fontSize: '14px', mt: '10px' }}
                    >
                      Full Time
                    </Typography>
                    <Checkbox
                      inputProps={{ 'aria-label': 'Internship' }}
                      checked={true}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{ fontSize: '14px', mt: '10px' }}
                    >
                      Internship
                    </Typography>
                    <Checkbox
                      inputProps={{ 'aria-label': 'Part Time' }}
                      checked={true}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{ fontSize: '14px', mt: '10px' }}
                    >
                      Part Time
                    </Typography>
                    <Checkbox
                      inputProps={{ 'aria-label': 'Temporary' }}
                      checked={true}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{ fontSize: '14px', mt: '10px' }}
                    >
                      Temporary
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    spacing={1}
                    sx={{
                      borderTop: '1px solid #ddd',
                      borderBottom: '1px solid #ddd',
                      paddingTop: '10px',
                      paddingBottom: '10px',
                      paddingLeft: '10px',
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontSize: '14px' }}>
                      Showing all Jobs
                    </Typography>
                  </Grid>
                </Box>
                <Box
                  className="search-job-box"
                  sx={{
                    background: '#f9f9f9',
                    border: '1px solid #e5e5e5',
                  }}
                >
                  <GetJobList />
                </Box>
                <div className="clear-both mt-20"></div>
              </div>
            </article>
          </div>
        </div>
      </>
    </>
  );
}
