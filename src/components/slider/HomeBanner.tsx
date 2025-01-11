import { Markdown } from '@/lib/markdown';
import KeenSlider from './KeenSlider';
import { useEffect, useState } from 'react';
import {
  getHomeSlideBySlug,
  getHomeSlideByEntryId,
  getBannerItemById,
} from '@/lib/api';
import CoverImage from '@/app/cover-image';
import { Typography } from '@mui/material';

async function HomeSlide({ ...props }) {
  const entryId = props.entryId ? props.entryId : '5LgCnhOe6ljwAFsTriocHg';
  // console.log('HomeSlide entryId ==> ', entryId);
  const homeslide = await getHomeSlideByEntryId(entryId);

  if (!homeslide) {
    return null;
  }
  const bannerList = homeslide?.bannerItems?.items;

  let homeslideArr: {
    imgurl: string;
    headline: string;
    subline: string;
    link: string;
  }[] = [];
  if (bannerList) {
    bannerList.map((item: any) => {
      if (item.image && item.image.url) {
        homeslideArr.push({
          imgurl: item.image.url,
          headline: item.headline,
          subline: item.body,
          link: item.link,
        });
      }
    });
  }

  return (
    <>
      <KeenSlider data={homeslideArr} />
    </>
  );
}

export default HomeSlide;
