import React from 'react';
import ReactMarkdown from 'react-markdown';

import Code from '@components/Markdown/Code/Code';

// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import nightOwnl from 'react-syntax-highlighter/dist/cjs/styles/hljs/night-owl';

// function Code({ language, value }) {
//   const lang = language === 'js' ? 'javascript' : language;
//   console.log(lang);
//   return (
//     <SyntaxHighlighter style={nightOwnl} language={lang}>
//       {value}
//     </SyntaxHighlighter>
//   );
// }

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
