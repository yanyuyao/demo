import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Box, IconButton } from '@mui/material';
import { Button } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CoverImage from '@/app/cover-image';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function Footer({ ...props }) {
  return (
    <>
      <div style={{ clear: 'both' }}></div>
      <Box
        sx={{
          color: 'white',
          backgroundColor: '#313131 !important',
          padding: '40px 0px 25px 100px',
          clear: 'both',
        }}
      >
        <div className="container w-full mx-auto my-1 grid grid-cols-1 gap-4 px-20 py-20 lg:grid-cols-4 lg:px-40 lg:py-20">
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid size={3}>
              <Box style={{ maxWidth: '200px', marginBottom: '10px' }}>
                <CoverImage
                  title=""
                  slug=""
                  url="https://quandx.com/wp-content/uploads/2016/07/footer_logo1.png"
                />
              </Box>
              <Typography variant="body2" gutterBottom>
                <Link
                  href="/sitemap"
                  color="inherit"
                  sx={{ mr: 1 }}
                  underline="none"
                >
                  Sitemap
                </Link>
                |
                <Link
                  href="/privacy-policy"
                  color="inherit"
                  sx={{ mx: 1 }}
                  underline="none"
                >
                  Privacy Policy
                </Link>
                |
                <Link
                  href="/terms-of-use"
                  color="inherit"
                  sx={{ mx: 1 }}
                  underline="none"
                >
                  Terms of Use
                </Link>
              </Typography>
              <Typography variant="body2" gutterBottom>
                © QuanDx. All Rights reserved.
              </Typography>
            </Grid>
            <Grid size={3}>
              <Typography variant="h6" gutterBottom sx={{ color: '#ed1c24 ' }}>
                Quick Links
              </Typography>
              <Typography variant="body2" gutterBottom>
                <Link href="/all-news/" color="inherit" underline="none">
                  Investor Adn Media
                </Link>
              </Typography>
              <Typography variant="body2" gutterBottom>
                <Link href="/job" color="inherit" underline="none">
                  Current Job Opportunities
                </Link>
              </Typography>
              <Typography variant="body2" gutterBottom>
                <Link href="/contact-us" color="inherit" underline="none">
                  Contact Us
                </Link>
              </Typography>
            </Grid>
            <Grid size={3}>
              <Typography variant="h6" gutterBottom sx={{ color: '#ed1c24 ' }}>
                Contact Us
              </Typography>
              <Typography variant="body2" gutterBottom>
                Toll Free in US <br />
                1-855-782-6392 <br />
                1-855-QuanDx-Care <br />
                <br />
                <Link href="#" color="inherit" underline="none">
                  Info@Quandx.Com
                </Link>
              </Typography>
            </Grid>
            <Grid size={3}>
              <Typography variant="h6" gutterBottom sx={{ color: '#ed1c24 ' }}>
                Stay Connected
              </Typography>
              <Typography variant="body2" gutterBottom>
                {/* link to faceback etc */}
                <IconButton aria-label="FaceBook">
                  <FacebookIcon sx={{ color: '#ed1c24', fontSize: '30px' }} />
                </IconButton>
                <IconButton aria-label="Twitter">
                  <TwitterIcon sx={{ color: '#ed1c24', fontSize: '30px' }} />
                </IconButton>
                <IconButton aria-label="LinkedIn">
                  <LinkedInIcon sx={{ color: '#ed1c24', fontSize: '30px' }} />
                </IconButton>
                <IconButton aria-label="YouTube">
                  <YouTubeIcon sx={{ color: '#ed1c24', fontSize: '30px' }} />
                </IconButton>
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
}
