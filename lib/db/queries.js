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
      order: 1,
    }).lean();

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
