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
  const service = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/groupSection`,
  );
  return service.json();
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
