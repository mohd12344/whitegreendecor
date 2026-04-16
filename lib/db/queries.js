import connectDB from "./connectDB";
import Section from "../models/section";
import Product from "../models/product";

export async function fetchAllSections() {
  await connectDB();

  try {
    const activeSections = await Section.find({ isActive: true })
      .sort({ order: 1 })
      .lean();

    if (!activeSections.length) return { result: [] };

    const sectionIds = activeSections.map((sec) => sec._id);

    const activeProducts = await Product.find({
      sectionId: { $in: sectionIds },
      isActive: true,
      })
       .sort({ order: 1 })
       .limit(1)
       .lean();

    const productMap = activeProducts.reduce((acc, product) => {
      if (!acc[product.sectionId.toString()]) {
        acc[product.sectionId.toString()] = product.image;
      }
      return acc;
    }, {});

    const sectionWithCard = activeSections.map((section) => ({
      ...section,
      _id: section._id.toString(),
      image: productMap[section._id.toString()] || null,
      href: section.slug,
    }));

    return { result: sectionWithCard };
  } catch (error) {
    console.error("DB Fetch Error:", error);
    return { result: [] };
  }
}

export async function FetchSingleProduct(slug) {
  await connectDB();

  const item = await Product.findOne({ slug }).lean();

  if (!item) return { item: null, similarProduct: [] };

  const similarProduct = await Product.find({
    sectionId: item.sectionId,
    isActive: true,
    _id: { $ne: item._id },
  })
    .sort({ order: 1 })
    .limit(4)
    .lean();

  return JSON.parse(JSON.stringify({ item, similarProduct }));
}
