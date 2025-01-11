import { getNewsListItemsByEntryId } from '@/lib/contentfulApi';
import PageBanner from '@/src/components/PageBanner';
import { Box, Typography } from '@mui/material';
import CoverImage from '@/app/cover-image';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TripOriginRoundedIcon from '@mui/icons-material/TripOriginRounded';
import { Markdown } from '@/lib/markdown';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import formatDate from '@/app/formatDate';
import ContentBox from '../ContentBox';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const NewList = async ({ ...props }) => {
  const entryId = props.entryId;
  const showBanner = props?.showBanner ? props.showBanner : 'show';
  const page = await getNewsListItemsByEntryId(entryId);
  const newsList = page?.newsEventsPagesCollection?.items;
  // console.log('newsListsss ==>', newsList);
  if (!page) {
    return <>No block list</>;
  }
  const handleDelete = () => {
    // console.info('You clicked the delete icon.');
  };
  return (
    <div className="mx-auto px-0 m-0">
      {page?.heroBanner && page?.heroBanner?.url && showBanner == 'show' && (
        <PageBanner
          title={page?.heroBannerTitle}
          imgurl={page?.heroBanner?.url}
          isSlide={true}
        />
      )}
      <article>
        <div className="block">
          <div className="container mx-auto my-20 px-10 lg:px-60">
            <Box>
              <Stepper orientation="vertical">
                {newsList &&
                  newsList.map((news: any, index: any) => (
                    <Step key={index} expanded>
                      {/* add chip on left , date : May 28, 2019*/}
                      <Box
                        sx={{
                          float: 'left',
                          mt: '7px',
                          ml: '-100px',
                          // borderTopLeftRadius: '0px',
                          // borderBottomLeftRadius: '0px',
                          // screen and (max-width: 1024px), width:100%
                          '@media (max-width: 1024px)': {
                            width: '100%',
                            ml: '-10px',
                            clear: 'both',
                            float: 'none',
                          },
                          fontSize: '12px',
                          height: '22px',
                          width: '80px',
                          position: 'absolute',
                          // lineHeight: '18px',
                          display: 'inline-block',
                          padding: '2px 5px',
                          borderRadius: '4px',
                          backgroundColor: '#f8f8f8',
                          color: '#a8a8a8',
                        }}
                      >
                        {formatDate(news.createdDate)}
                        <ArrowRightIcon
                          sx={{
                            fontSize: '24px',
                            position: 'absolute',
                            top: '0px',
                            right: '-14px',
                            color: '#f8f8f8',
                          }}
                        />
                      </Box>
                      <StepLabel
                        icon={
                          <TripOriginRoundedIcon
                            sx={{ color: '#ed1c24', fontSize: '20px' }}
                          />
                        }
                      >
                        <Typography
                          variant="h3"
                          sx={{ fontFamily: 'Lato', fontSize: '24px' }}
                        >
                          {news.headline}
                        </Typography>
                      </StepLabel>
                      <StepContent>
                        <Box sx={{ fontFamily: 'Lato' }}>
                          {/* <Markdown content={news.subline} /> */}
                          <ContentBox content={news.subline} />
                        </Box>
                        <Box
                          sx={{
                            width: '100%',
                            backgroundColor: '#eee',
                            textAlign: 'right',
                            padding: '5px 10px',
                            mt: '10px',
                          }}
                        >
                          <Link
                            href={`${news.linkedFrom.pageCollection.items[0].slug}`}
                            underline="none"
                          >
                            <Button
                              variant="text"
                              sx={{
                                color: '#ed1c24',
                                textDecoration: 'none',
                                backgroundColor: '#eee',
                                borderRadius: '0px',
                                borderLeft: '1px solid #ddd',
                              }}
                            >
                              <DescriptionOutlinedIcon
                                sx={{ mr: 1, color: 'gray' }}
                              />{' '}
                              Read more
                            </Button>
                          </Link>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
              </Stepper>
            </Box>
          </div>
          <div className="clear-both mt-20"></div>
        </div>
      </article>
    </div>
  );
};

export default NewList;
