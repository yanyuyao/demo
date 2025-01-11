const CategoryProducts = async ({ categorySlug }: { categorySlug: string }) => {
  return <div>CategoryProducts</div>;
};
export default CategoryProducts;
// import CoverImage from '@/app/cover-image';
// import {
//   getComponentProductTableByEntryId,
//   getProductsCategory,
//   getProductsCategorySlug,
//   getAllTopicProductsByCategorySlug,
// } from '@/lib/api';
// import { Typography } from '@mui/material';
// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid2';
// import PageBanner from '@/src/components/PageBanner';
// import ProductCard from '@/app/products/ProductCard';

// const CategoryProducts = async ({ categorySlug }: { categorySlug: string }) => {
//   const data = await getAllTopicProductsByCategorySlug(categorySlug, false);

//   if (!data) return <div>loading...</div>;

//   return data.map((product: any) => (
//     <Grid size={3} key={product.slug}>
//       <ProductCard product={product} />
//     </Grid>
//   ));
// };

// export default CategoryProducts;
