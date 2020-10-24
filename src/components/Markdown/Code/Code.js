import React, { useCallback } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import classNames from 'classnames';
import nightOwl from 'prism-react-renderer/themes/nightOwl';
import { useClipboard } from 'use-clipboard-copy';

const CopyToClipboard = ({ toCopy, className, ...props }) => {
  const { copied, copy } = useClipboard({
    copiedTimeout: 800
  });

  const handleClick = useCallback(() => {
    copy(toCopy);
  }, [copy, toCopy]);

  return (
    <button
      className={classNames(
        'absolute bottom-0 right-0 block px-2 m-2 mb-3 text-sm text-indigo-800 bg-indigo-200 rounded-lg outline-none hover:bg-indigo-500 hover:text-white',
        className
      )}
      onClick={handleClick}
      {...props}>
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
};

const CodeBlock = ({ language, value }) => {
  return (
    <Highlight {...defaultProps} code={value} language={language} theme={nightOwl}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        return (
          <div className="overflow-x-auto code-container ">
            <pre className={'relative code rounded-md px-4 overflow-x-auto '} style={{ ...style }}>
              <CopyToClipboard toCopy={value} />
              <code className={classNames(className)} data-language={language}>
                {tokens.map((line, i) => {
                  return (
                    <div key={i} {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => {
                        if (token.content.length === 0) return null;
                        if (token.empty && tokens.length === 2) return null;
                        if (token.empty) return <div key={key} className="my-4" />;
                        return (
                          <span
                            key={key}
                            {...getTokenProps({ token, key })}
                            className="font-mono text-sm"
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </code>
            </pre>
          </div>
        );
      }}
    </Highlight>
  );
};

export default CodeBlock;
