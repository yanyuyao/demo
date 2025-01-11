import CoverImage from '@/app/cover-image';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const ProductCard = ({ product }: any) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        '&:hover img': {
          transition: 'transform 0.3s ease',
          transform: 'translateY(-10px)',
        },
      }}
    >
      <Link
        href={`${product.slug}`}
        aria-label={product.headline}
        sx={{
          color: 'black',
          textDecoration: 'none',
        }}
      >
        <Box
          sx={{
            maxWidth: '200px',
            height: '180px',
            margin: 'auto',
            textAlign: 'center',
          }}
        >
          <CoverImage title={product.headline} url={product.imgUrl} />
        </Box>
        <Typography variant="h4" sx={{ mt: 2 }}>
          {product.headline}
        </Typography>
      </Link>
    </Box>
  );
};

export default ProductCard;
