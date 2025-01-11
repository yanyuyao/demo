import { getProductListById } from '@/lib/contentfulApi';
import PageReferralLinkCard from '@/src/components/card/PageReferralLinkCard';
import List from '@/src/components/list/List';
import ProductCard from './ProductCard';
import Grid from '@mui/material/Grid2';
import PageBanner from '@/src/components/PageBanner';
import { Box, Typography } from '@mui/material';

const ProductList = async ({ ...props }) => {
  const entryId = props.entryId;
  const showBanner = props?.showBanner ? props.showBanner : 'show';
  const page = await getProductListById(entryId);

  const productItems = page.productsCollection.items;
  // const layout = page.layout ? page.layout : 'List';

  const layout = 'ProductCard';
  const listData = productItems.map((productItem: any) => {
    return {
      headline: productItem.name,
      subline: '',
      description: productItem.description,
      slug: productItem.slug,
      imgUrl: productItem.featuredImage.url,
    };
  });

  // console.log('listData ==>', listData);

  return (
    <div className="mx-auto">
      {page?.heroBanner && page?.heroBanner?.url && showBanner == 'show' && (
        <PageBanner
          title={page?.heroBannerTitle}
          imgurl={page?.heroBanner?.url}
          isSlide={true}
        />
      )}
      <div className="container mx-full my-20">
        <Box>
          <Typography
            variant="h3"
            align="center"
            sx={{
              mt: 4,
              mb: 4,
            }}
          >
            {page.headline}
          </Typography>
          <Grid container spacing={2}>
            {(() => {
              switch (layout) {
                case 'ProductCard':
                  return listData.map((product: any) => (
                    <Grid size={3} key={product.slug}>
                      <ProductCard product={product} />
                    </Grid>
                  ));
                // case 'List':
                //   return <List listData={listData} />;
                // case '':
                // case undefined:
                // case 'PageTextCard':
                //   return listData.map((pageItem: any, index: any) => {
                //     return (
                //       <PageReferralLinkCard
                //         headline={pageItem.headline}
                //         index={index}
                //         slug={pageItem.slug}
                //       />
                //     );
                //   });
                default:
                  return null;
              }
            })()}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default ProductList;
