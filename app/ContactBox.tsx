import { Box, Typography, Button } from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
export default function ContactBox() {
  return (
    <Box
      sx={{
        width: '100%',
        borderBottom: '1px solid #000',
        borderTop: '1px solid #000',
        mt: '20px',
        mb: '20px',
        p: '10px',
        verticalAlign: 'middle',
      }}
    >
      <div className="container mx-auto my-1 grid grid-cols-1 lg:grid-cols-12">
        <div className="col-span-1 align-middle">
          <Typography
            variant="h4"
            sx={{ textDecoration: 'none', textAlign: 'center' }}
          >
            Contact Us
          </Typography>
        </div>
        <div className="col-span-9 align-middle">
          <Typography
            variant="h4"
            sx={{ textDecoration: 'none', textAlign: 'center' }}
          >
            <LocalPhoneIcon /> 1-855-QuanDx-Care (1-855-782-6392) OR
            650-262-4140
            <MailOutlineIcon sx={{ ml: 1 }} /> info@quandx.com
          </Typography>
        </div>
        <div className="col-span-2 align-middle">
          <Typography
            variant="h4"
            sx={{ textDecoration: 'none', textAlign: 'center' }}
          >
            <Button variant="contained" sx={{ backgroundColor: '#ed1c24' }}>
              Product Inquiry
            </Button>
          </Typography>
        </div>
      </div>
    </Box>
  );
}
