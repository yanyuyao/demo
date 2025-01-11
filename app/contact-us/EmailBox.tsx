// create contact us email form : your name(required), your email(required), subject, message, px-40, dark background
import { Box, Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { TextareaAutosize } from '@mui/base';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const EmailBox = () => {
  const handleSubmit = () => {
    // Add your form submission logic here
    let name = (document.getElementById('name') as HTMLInputElement)?.value;
    let email = (document.getElementById('email') as HTMLInputElement)?.value;
    let subject = (document.getElementById('subject') as HTMLInputElement)
      ?.value;
    let message = (document.getElementById('message') as HTMLInputElement)
      ?.value;
    if (!email) {
      alert(111);
    }
    if (!subject && !message) {
      alert(222);
    }
  };

  return (
    <Box sx={{ w: '100%', backgroundColor: '#000' }}>
      <form>
        <div className="mx-auto w-full py-10 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:px-40">
          <div className="col-span-3">
            <Typography
              variant="h4"
              sx={{ textDecoration: 'none', color: '#ed1c24', mb: '20px' }}
            >
              Contact Us
            </Typography>
          </div>
          <div className="col-span-1">
            <Typography variant="h6" sx={{ color: 'white' }}>
              Your Name
            </Typography>
            <TextField
              variant="outlined"
              sx={{ backgroundColor: 'white' }}
              fullWidth
              type="text"
              className="form-control"
              id="name"
              aria-describedby="name"
            />
          </div>
          <div className="col-span-1">
            <Typography variant="h6" sx={{ color: 'white' }}>
              Your Email
            </Typography>
            <TextField
              variant="outlined"
              sx={{ backgroundColor: 'white' }}
              fullWidth
              type="email"
              className="form-control"
              id="email"
              aria-describedby="email"
            />
          </div>
          <div className="col-span-1">
            <Typography variant="h6" sx={{ color: 'white' }}>
              Subject
            </Typography>
            <TextField
              variant="outlined"
              sx={{ backgroundColor: 'white' }}
              fullWidth
              type="text"
              className="form-control"
              id="subject"
              aria-describedby="subject"
            />
          </div>
          <div className="col-span-3">
            <Typography variant="h6" sx={{ color: 'white', mt: '10px' }}>
              Your Message
            </Typography>
            <TextareaAutosize
              style={{
                backgroundColor: 'white',
                width: '100%',
                minHeight: '150px',
              }}
              className="form-control"
              id="message"
            />
            <Button
              variant="contained"
              sx={{
                mt: '20px',
                backgroundColor: '#ed1c24',
                color: 'white',
                textTransform: 'none',
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </form>
    </Box>
  );
};

export default EmailBox;
