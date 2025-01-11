import * as React from 'react';
import { Markdown } from '@/lib/markdown';
import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';

// const CustomBox = styled(Box)(({ theme }) => ({
//     fontSize:'16px',
//     '& p':{
//         fontSize:'16px'
//     }
// }));

const RichTextTypography = ({ ...props }) => {
  let sx = props.sx;
  let textColor = props.textColor;
  if (sx == '' || sx == undefined) {
    return (
      <Box
        sx={{
          '& p': {
            fontSize: '16px',
            color: textColor ? textColor : '#404041',
            fontWeight: 400,
            fontFamily: 'Lato',
          },
        }}
      >
        <Markdown content={props.content} {...props} />
      </Box>
    );
  }
  return (
    <Box sx={props.sx}>
      <Markdown content={props.content} {...props} />
    </Box>
  );
};

export default RichTextTypography;
