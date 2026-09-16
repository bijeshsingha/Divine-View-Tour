export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: "https://www.divineviewtours.com/sitemap.xml",
    host: "https://www.divineviewtours.com",
  };
}
