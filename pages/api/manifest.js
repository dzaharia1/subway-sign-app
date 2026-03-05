import baseManifest from '../../public/manifest.json';

const VALID_START_URL = /^\/sign\/[a-zA-Z]{4}$|^\/$/;

export default function handler(req, res) {
  const { start_url } = req.query;
  const safeStartUrl =
    start_url && VALID_START_URL.test(start_url) ? start_url : '/';

  res.setHeader('Content-Type', 'application/manifest+json');
  res.json({ ...baseManifest, start_url: safeStartUrl });
}
