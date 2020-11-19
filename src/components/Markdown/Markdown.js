import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import pluginUnwrapImages from 'remark-unwrap-images';
import classNames from 'classnames';

import Code from '@components/Markdown/Code/Code';
import Link from '@components/Link/Link';

const plugins = [pluginUnwrapImages];

function Image({ src, alt }) {
  return (
    <img src={src} alt={alt} className="mx-auto border-4 border-indigo-200 rounded-md shadow-xl" />
  );
}

function MarkdownLink({ href, children }) {
  return <Link to={href}>{children}</Link>;
}

const Markdown = ({ children, className }) => {
  const renderers = {
    code: Code,
    image: Image,
    imageReference: Image,
    link: MarkdownLink,
    linkReference: MarkdownLink
  };

  return (
    <ReactMarkdown
      allowDangerousHtml
      className={classNames('prose lg:prose-lg dark:text-gray-100', className)}
      renderers={renderers}
      plugins={plugins}>
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
