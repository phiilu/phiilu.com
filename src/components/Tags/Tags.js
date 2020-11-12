import React from 'react';
import classNames from 'classnames';
import Link from '@components/Link/Link';
import tagColors from '@helpers/tagColors';

const TagList = ({ tags }) => {
  return React.useMemo(() => {
    const tagList = tags.map((tag) => ({
      ...tagColors[tag.title.trim()],
      ...tag
    }));

    return (
      <ul className="flex flex-wrap">
        {tagList.map((tag) => {
          return (
            <li key={tag.slug} className="flex-none mt-2 mr-2">
              <Link
                to={`/tag/${tag.slug}`}
                className={classNames(
                  'pointer-events-auto inline-block rounded-md px-2 py-1 text-sm font-semibold transition-colors duration-200 ease-in-out',
                  tag.bg,
                  tag.text,
                  tag.hover
                )}>
                {tag.title}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }, [tags.length]);
};

export default TagList;
