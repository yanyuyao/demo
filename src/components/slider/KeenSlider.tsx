'use client';
import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import BannerSingle from './BannerSingle';
import CoverImage from '@/app/cover-image';
import PageBanner from '@/src/components/PageBanner';
import { Box, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { url } from 'inspector';
import RichTextTypography from '../RichTextTypography';
import { text } from 'stream/consumers';
import { useMediaQuery, Theme } from '@mui/material';

const BannerImage = ({ ...props }) => {
  const isMobile = useMediaQuery('screen and (max-width: 1024px)');
  const headline = props.headline;
  const subline = props.subline;
  const link = props.link;
  const imgurl = props.imgurl;
  const imageCard = ({
    headline,
    subline,
    imgurl,
    link,
  }: {
    headline: string;
    subline: string;
    imgurl: string;
    link: string;
  }) => {
    return (
      <Box
        sx={{
          w: '100%',
          position: 'relative',
          display: 'flex',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          backgroundImage: `url(${imgurl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          width: '100%',
          visibility: 'inherit',
        }}
      >
        {headline && (
          <Typography
            variant="h3"
            sx={{
              fontSize: isMobile ? '24px' : '40px',
              fontFamily: 'Oswald',
              position: 'absolute',
              color: 'white',
              top:
                subline == ''
                  ? isMobile
                    ? '35%'
                    : '45%'
                  : isMobile
                  ? '15%'
                  : '25%',
              left: '50%',
              width: '70%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {headline}
          </Typography>
        )}
        {subline && (
          <Box
            sx={{
              position: 'absolute',
              color: 'white',
              top: isMobile ? '50%' : '55%',
              left: '50%',
              width: '70%',
              fontSize: '26px',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <RichTextTypography
              content={subline}
              sx={{
                fontSize: isMobile ? '16px' : '26px',
                fontFamily: 'Oswald',
              }}
            />
            {link && (
              <Box sx={{ marginTop: '60px' }}>
                <Link
                  href={link}
                  sx={{
                    color: 'white',
                    backgroundColor: '#ed1c24',
                    fontSize: '20px',
                    padding: '10px 20px',
                    fontFamily: 'Lato',
                    transform: 'translate(-50%, -50%)',
                    textDecoration: 'none',
                  }}
                >
                  Learn More
                </Link>
              </Box>
            )}
          </Box>
        )}
      </Box>
    );
  };

  return imageCard({ headline, subline, imgurl, link });
};

const KeenSlider = ({ ...props }) => {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      rtl: true,
      slides: { perView: 1 },
      mode: 'snap',
    },
    [
      (slider) => {
        let timeout: string | number | NodeJS.Timeout | undefined;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000);
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on('dragStarted', clearNextTimeout);
        slider.on('animationEnded', nextTimeout);
        slider.on('updated', nextTimeout);
      },
    ],
  );
  const data = props.data;
  const height = props?.height;

  return (
    <>
      <div ref={sliderRef} className="keen-slider w-full">
        {data.map((item: any, index: number) => {
          return (
            <div
              key={`slider_div_` + index}
              className={`w-full keen-slider__slide number-slide` + (index + 1)}
              style={{ height: height }}
            >
              <BannerImage
                headline={item.headline}
                subline={item.subline}
                imgurl={item.imgurl}
                link={item.link}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default KeenSlider;
