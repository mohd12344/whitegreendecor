import ShowDecorService from "./singleService/defaultService";
import ShowCustomService from "./singleService/customService";

const SingleServicesShow = ({ products, slug, lowPriceProducts }) => {
  const props = { products, slug, lowPriceProducts };

  if (products.specific || products.custom) return <ShowCustomService {...props} />;
  return <ShowDecorService {...props} />;
};

export default SingleServicesShow;