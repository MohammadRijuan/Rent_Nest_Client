
"use server";

const CategoriesAction = async () => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/categories`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return { success: false as const, message: "Failed to fetch categories" };
    }

    const data = await res.json();

    return { success: true as const, data };
  } catch {
    return { success: false as const, message: "Something went wrong" };
  }
};

export default CategoriesAction;
