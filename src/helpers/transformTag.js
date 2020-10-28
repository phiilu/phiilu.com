export default function transformTag(tag) {
  const { sys, fields } = tag;
  const { id } = sys;
  const { title, slug, description } = fields;

  return {
    id,
    slug,
    title,
    description
  };
}
