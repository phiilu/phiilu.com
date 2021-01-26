export default function transformGear(gear) {
  const { sys, fields } = gear;
  const { id } = sys;
  const { title, description, image, category } = fields;

  return {
    id,
    title,
    description,
    image,
    category
  };
}
