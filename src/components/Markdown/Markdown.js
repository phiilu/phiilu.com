import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import pluginUnwrapImages from 'remark-unwrap-images';
import classNames from 'classnames';

import Code from '@components/Markdown/Code/Code';

const plugins = [pluginUnwrapImages];

function Image({ src, alt }) {
  return (
    <img src={src} alt={alt} className="mx-auto border-4 border-indigo-200 rounded-md shadow-xl" />
  );
}

const Markdown = ({ children, className }) => {
  console.log(ReactMarkdown.renderers);
  const renderers = {
    code: Code,
    image: Image,
    imageReference: Image
  };

  return (
    <ReactMarkdown
      allowDangerousHtml
      className={classNames('prose lg:prose-lg', className)}
      renderers={renderers}
      plugins={plugins}>
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
