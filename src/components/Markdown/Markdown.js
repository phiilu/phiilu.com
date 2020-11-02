import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import pluginUnwrapImages from 'remark-unwrap-images';
import classNames from 'classnames';

import Code from '@components/Markdown/Code/Code';

const plugins = [pluginUnwrapImages];

const Markdown = ({ children, className }) => {
  const renderers = {
    code: Code
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
