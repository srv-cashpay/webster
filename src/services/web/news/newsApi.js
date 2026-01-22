const BASE_URL = "https://api.cashpay.co.id";

export async function getNewsList() {
  const res = await fetch(`${BASE_URL}/web/list/news`);
  const json = await res.json();

  if (!json.status) {
    throw new Error(json.message || "Failed to fetch news");
  }

  return json.data || [];
}

export async function getNewsDetail(slug) {
  const res = await fetch(`${BASE_URL}/web/detail/news/${slug}`);
  const json = await res.json();

  if (!json.status) {
    throw new Error(json.message || "News not found");
  }

  return json.data;
}
