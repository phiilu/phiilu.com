import React from 'react';
import ReactMarkdown from 'react-markdown';

import Code from '@components/Markdown/Code/Code';

const renderers = {
  code: Code
};

const Markdown = ({ children }) => {
  return (
    <ReactMarkdown className="prose lg:prose-lg" renderers={renderers}>
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
