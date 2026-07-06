/* eslint-disable no-undef */

export default async function handler(req, res) {
  try {
    const { url, strategy = "mobile" } = req.query;

    if (!url) {
      return res.status(400).json({
        error: "URL is required",
      });
    }

    const apiKey = process.env.GOOGLE_API_KEY;

    const response = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=performance&category=seo&category=accessibility&category=best-practices&key=${apiKey}`,
    );

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({
        error: data.error.message,
      });
    }

    res.status(200).json(data);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to fetch SEO report",
    });
  }
}
