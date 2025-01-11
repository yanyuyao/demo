'use client';
import React, { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import BannerSingle from './BannerSingle';
import styles from './KeenCardSlider.module.css';
import CoverImage from '@/app/cover-image';
import PageBanner from '@/src/components/PageBanner';
import { Box, Button, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { url } from 'inspector';
import TextCard from '@/src/components/card/TextCard';
import { useMediaQuery, Theme } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
const KeenCardSlider = ({ ...props }) => {
  const isMobile = useMediaQuery('screen and (max-width: 1024px)');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderCardRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      loop: true,
      rtl: true,
      slides: isMobile ? { perView: 1 } : { perView: 3, spacing: 20 },
      mode: 'snap',
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    // [
    //   (slider) => {
    //     let timeout: string | number | NodeJS.Timeout | undefined;
    //     let mouseOver = false;
    //     function clearNextTimeout() {
    //       clearTimeout(timeout);
    //     }
    //     function nextTimeout() {
    //       clearTimeout(timeout);
    //       if (mouseOver) return;
    //       timeout = setTimeout(() => {
    //         slider.next();
    //       }, 30000);
    //     }
    //     slider.on('created', () => {
    //       slider.container.addEventListener('mouseover', () => {
    //         mouseOver = true;
    //         clearNextTimeout();
    //       });
    //       slider.container.addEventListener('mouseout', () => {
    //         mouseOver = false;
    //         nextTimeout();
    //       });
    //       nextTimeout();
    //     });
    //     slider.on('dragStarted', clearNextTimeout);
    //     slider.on('animationEnded', nextTimeout);
    //     slider.on('updated', nextTimeout);
    //   },
    // ],
  );

  const data = props.data;
  return (
    <>
      <div
        className="navigation-wrapper"
        style={{ position: 'relative', border: 'none' }}
      >
        <div
          ref={sliderCardRef}
          className="keen-slider"
          style={{ background: '#fff' }}
        >
          {data.textBlockList.items &&
            data.textBlockList.items.map((item: any, index: any) => (
              <div
                key={`slider_div_` + index}
                className={`keen-slider__slide number-slide` + (index + 1)}
                style={{
                  height: '300px',
                  background: '#fff',
                  border: 'none',
                  transform: 'none',
                }}
              >
                <TextCard
                  key={'textcard_' + index}
                  headline={item.headline}
                  body={item.body}
                  colorPalette={item.colorPalette}
                />
              </div>
            ))}
        </div>
        {loaded && instanceRef.current && (
          <>
            <IconButton
              sx={{
                width: '50px',
                height: '50px',
                fontSize: '30px',
                position: 'absolute',
                top: '50%',
                left: '-40px',
                transform: 'translateY(-50%)',
                WebkitTransform: 'translateY(-50%)',
                background: 'none',
                fill: '#fff',
                cursor: 'pointer',
                color: '#ed1c24',
              }}
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            >
              <ArrowBackIosIcon />
            </IconButton>

            <IconButton
              sx={{
                width: '50px',
                height: '50px',
                fontSize: '30px',
                position: 'absolute',
                top: '50%',
                left: 'auto',
                right: '-40px',
                transform: 'translateY(-50%)',
                WebkitTransform: 'translateY(-50%)',
                background: 'none',
                fill: '#fff',
                cursor: 'pointer',
                color: '#ed1c24',
              }}
              className="arrow arrow--right"
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </>
        )}
      </div>
    </>
  );
};

export default KeenCardSlider;
