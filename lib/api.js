import connectDB from "@/lib/db/connectDB";
import Section from "@/lib/models/section";
import Product from "@/lib/models/product";

const BASE = "/api";

export async function fetchSections() {
  const res = await fetch(`${BASE}/sections`);
  return res.json();
}

export async function fetchActiveSections() {
  const res = await fetch(`${BASE}/sections?onlyActive=true`);
  return res.json();
}

export async function createSection(title) {
  const res = await fetch(`${BASE}/sections`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export async function patchSection(id, data) {
  const res = await fetch(`${BASE}/sections/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function removeSection(id) {
  await fetch(`${BASE}/sections/${id}`, { method: "DELETE" });
}

export async function reorderSections(orderedIds) {
  await fetch(`${BASE}/sections/reorder`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderedIds }),
  });
}

// Products
export async function fetchProduct(sectionId) {
  const res = await fetch(`${BASE}/products?sectionId=${sectionId}`);
  return res.json();
}

export async function createProduct(data) {
  const res = await fetch(`${BASE}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function patchProduct(id, data) {
  const res = await fetch(`${BASE}/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function removeProduct(id) {
  await fetch(`${BASE}/products/${id}`, { method: "DELETE" });
}

export async function reorderProduct(orderedIds) {
  await fetch(`${BASE}/products/reorder`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderedIds }),
  });
}

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

export async function uploadImage(file) {
  const res = await fetch(`${BASE}/sign-cloudinary`, {
    method: "POST",
  });

  const { timestamp, signature, apiKey, cloudName } = await res.json();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  formData.append("folder", "whitegreendecors");

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await uploadRes.json();

  return data.secure_url;
}

// Authentictions

export async function Logout() {
  const res = await fetch("/api/admin/logout", { method: "POST" });
  return res.json();
}
