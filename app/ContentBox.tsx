import { Markdown } from '@/lib/markdown';
import Box from '@mui/material/Box';

export default async function ContentBox({ ...props }) {
  const convertedContent = props.content;
  if (
    convertedContent === null ||
    convertedContent === undefined ||
    convertedContent === ''
  ) {
    return <></>;
  }
  const textColor = props.textColor ? props.textColor : '#404041';
  return (
    <Box
      sx={{
        fontFamily: 'Lato',
        color: textColor,
        fontWeight: '400',
        fontSize: '16px',
        '&>h1': {
          fontSize: '24px',
          marginBottom: '15px',
        },
        '&>p': {
          marginBottom: '15px',
          fontSize: '14px',
          fontFamily: 'Lato',
          color: textColor,
          fontWeight: 'normal',
          textAlign: 'justify',
        },
        '&>table': {
          width: '100%',
          borderCollapse: 'collapse',
        },
        '&>table th': {
          backgroundColor: '#f1f1f1',
          border: '1px solid #ddd',
          padding: '8px',
        },
        '&>table td': {
          border: '1px solid #ddd',
          padding: '8px',
        },
        '&>table tr>td:first-child': {
          fontWeight: 'bold',
          backgroundColor: '#f1f1f1',
        },
      }}
    >
      <Markdown content={convertedContent} />
    </Box>
  );
}
