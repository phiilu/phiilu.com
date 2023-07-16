import React from "react";
import clsx from "clsx";
import tagColors, { TagListItem } from "../../helpers/tagColors";

interface TagListProps {
  tags: string[];
}

export const TagList = ({ tags }: TagListProps) => {
  return React.useMemo(() => {
    const tagList: TagListItem[] = tags.map((tag) => ({
      // @ts-ignore
      ...tagColors[tag],
    }));

    return (
      <ul className="flex flex-wrap">
        {tagList.map((tag, i) => {
          return (
            <li key={tag.slug + i} className="flex-none mt-2 mr-2">
              <a
                href={`/tag/${tag.slug}`}
                className={clsx(
                  "pointer-events-auto inline-block rounded-md px-2 py-1 text-sm font-semibold transition-colors duration-200 ease-in-out",
                  tag.bg,
                  tag.text,
                  tag.hover,
                )}
              >
                {tag.name}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }, [tags.length]);
};
