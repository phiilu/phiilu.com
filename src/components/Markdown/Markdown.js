import React from 'react';
import ReactMarkdown from 'react-markdown';
import pluginUnwrapImages from 'remark-unwrap-images';
import classNames from 'classnames';
import pluginRaw from 'rehype-raw';

import Code from '@components/Markdown/Code/Code';
import Link from '@components/Link/Link';

const remarkPlugins = [pluginUnwrapImages];
const rehypePlugins = [pluginRaw];

function Image({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="mx-auto border-4 border-indigo-200 rounded-md shadow-xl dark:border-indigo-500"
    />
  );
}

function MarkdownLink({ href, children }) {
  return <Link to={href}>{children}</Link>;
}

function PreElement({ node, children }) {
  if (node.children.length) {
    return children;
  }
  return <pre>{children}</pre>;
}

const Markdown = ({ children, className }) => {
  const components = {
    pre: PreElement,
    code: Code,
    image: Image,
    imageReference: Image,
    link: MarkdownLink,
    linkReference: MarkdownLink
  };

  return (
    <ReactMarkdown
      className={classNames('prose lg:prose-lg dark:prose-dark', className)}
      components={components}
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}>
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
