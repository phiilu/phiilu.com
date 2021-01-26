export default function transformGear(gear) {
  const { sys, fields } = gear;
  const { id } = sys;
  const { title, description, image, category, link, affiliateLinkText, affiliateLink } = fields;

  return {
    id,
    title,
    description,
    image,
    category,
    link: link ?? null,
    affiliateLinkText: affiliateLinkText ?? null,
    affiliateLink: affiliateLink ?? null
  };
}
