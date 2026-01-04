const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export const fetchProductImage = async (query) => {
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&per_page=1`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    const data = await res.json();
    return data.photos?.[0]?.src?.medium || "/no-image.png";
  } catch (err) {
    return "/no-image.png";
  }
}