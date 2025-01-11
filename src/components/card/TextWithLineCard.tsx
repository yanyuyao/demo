import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Markdown } from '@/lib/markdown';
import { Link } from '@mui/material';
import RichTextTypography from '../RichTextTypography';

export default function TextWithLineCard({ ...props }) {
  const headline = props.headline;
  const subline = props.subline;
  const link = props.link;
  const linkText = props.linkText;
  const body = props.body;
  const colorPalette = props.colorPalette;

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        variant="h5"
        sx={{
          color: '#ed1c24',
          fontSize: '20px',
          lineHeight: '25px',
          fontWeight: 'bold',
          fontFamily: 'Lato',
        }}
      >
        {headline}
      </Typography>
      <hr
        style={{
          border: '1px solid #ed1c24',
          width: '68px',
          height: '2px',
          margin: 'auto',
          marginTop: '15px',
          marginBottom: '15px',
          display: 'block',
        }}
      />
      <RichTextTypography content={body} />
      <Link
        href="#"
        sx={{
          color: '#ed1c24',
          marginTop: '25px',
          fontSize: '13px',
          fontFamily: 'Lato',
          fontWeight: 'bold',
          lineHeight: '46px',
          '&:hover': { color: '#a21d12' },
        }}
        underline="none"
      >
        {subline}
      </Link>
    </Box>
  );
}
