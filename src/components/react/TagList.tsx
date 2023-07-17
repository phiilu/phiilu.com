import { clsx } from 'clsx';
import { useMemo } from 'react';
import tagColors, { TagListItem } from '@/helpers/tagColors';

interface TagListProps {
  tags: string[];
}

export const TagList = ({ tags }: TagListProps) => {
  return useMemo(() => {
    const tagList: TagListItem[] = tags.map((tag) => ({
      ...tagColors[tag as keyof typeof tagColors]
    }));

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
                )}>
                {tag.name}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }, [tags.length]);
};
