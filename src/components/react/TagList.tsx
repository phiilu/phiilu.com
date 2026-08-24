import { clsx } from 'clsx';
import { useMemo } from 'react';
import { getTagColors } from '@/helpers/tagColors';

interface TagListProps {
  tags: string[];
}

export const TagList = ({ tags }: TagListProps) => {
  return useMemo(() => {
    // A tag with no entry has no slug to link to, so it is left out.
    const tagList = tags.map(getTagColors).filter((tag) => tag !== undefined);

    return (
      <ul className="flex flex-wrap">
        {tagList.map((tag, i) => {
          return (
            <li key={tag.slug + i} className="flex-none mt-2 mr-2">
              <a
                href={`/tag/${tag.slug}`}
                className={clsx(
                  'pointer-events-auto inline-block rounded-md px-2 py-1 text-sm font-semibold transition-colors duration-200 ease-in-out',
                  tag.bg,
                  tag.text,
                  tag.hover
                )}
              >
                {tag.name}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }, [tags]);
};
