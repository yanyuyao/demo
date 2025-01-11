import { getAllProductList } from '@/lib/contentfulApi';
import PageBanner from '@/src/components/PageBanner';
import ProductList from '../pages/ProductList';

export default async function Products() {
  const allProductList = await getAllProductList();
  // console.log('allProductList==>', allProductList);
  if (allProductList) {
    return (
      <div className="mx-auto">
        <PageBanner
          title="Products"
          imgurl="https://quandx.com/wp-content/uploads/2016/06/banner2.jpg"
        />
        {allProductList &&
          allProductList.map((productList: any) => (
            <div
              className="container mx-full my-20 lg:px-60"
              key={productList.sys.id}
            >
              <ProductList entryId={productList.sys.id} showBanner="no" />
            </div>
          ))}

        <div className="clear-both mt-20"></div>
      </div>
    );
  }
}
