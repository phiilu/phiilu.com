import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import a11yEmoji from '@fec/remark-a11y-emoji';

import Code from '@components/Markdown/Code/Code';

const renderers = {
  code: Code
};

const plugins = [a11yEmoji];

const Markdown = ({ children }) => {
  return (
    <ReactMarkdown
      allowDangerousHtml
      className="prose lg:prose-lg"
      renderers={renderers}
      plugins={plugins}>
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
