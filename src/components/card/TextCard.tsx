import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Markdown } from '@/lib/markdown';
import RichTextTypography from '../RichTextTypography';
import { text } from 'stream/consumers';
import { color } from '@amcharts/amcharts5';

export default function TextCard({ ...props }) {
  const headline = props.headline;
  const excerpt = props.excerpt;
  const body = props.body;
  const colorPalette = props.colorPalette;
  let textColor = props.textColor ? props.textColor : 'white';
  let bodyTextColor = props.bodyTextColor ? props.bodyTextColor : 'black';
  if (colorPalette === '#ebebeb') {
    textColor = '#ed1c24';
    bodyTextColor = '#4a4a4a';
  } else if (colorPalette === '#ed1c24' || colorPalette === '#404041') {
    textColor = 'white';
    bodyTextColor = 'white';
  } else if (colorPalette === null) {
    textColor = 'black';
    bodyTextColor = 'black';
  }
  // console.log('TextCard ==> ', headline, colorPalette, textColor);
  return (
    <Card
      sx={{
        bgcolor: colorPalette === null ? '#f5f5f5' : colorPalette,
        color: textColor,
        // maxWidth:'436px',
        height: '229px',
        borderRadius: 0,
        p: 2,
        px: 5,
        '&:hover': {
          //set bg opacity to 0.5
          // opacity: 0.5,
        },
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          sx={{ fontFamily: 'Lato', fontSize: '19px', fontWeight: 'bold' }}
        >
          {headline}
        </Typography>
        {excerpt && <Typography variant="body1">{excerpt}</Typography>}
        {body && (
          <RichTextTypography content={body} textColor={bodyTextColor} />
        )}
      </CardContent>
    </Card>
  );
}
