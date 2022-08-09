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
        'absolute copyToClipboard opacity-0 bottom-0 right-0 block px-2 m-2 mb-3 text-sm text-indigo-800 bg-indigo-200 rounded-lg outline-none transition-all duration-200 ease-in-out hover:bg-indigo-500 hover:text-white',
        className
      )}
      onClick={handleClick}
      {...props}>
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
};

const CodeBlock = ({ inline, className, children }) => {
  const value = children?.[0] ?? '';

  if (inline) {
    return <code>{value}</code>;
  }

  const language = className?.replace(/language-/, '');

  return (
    <Highlight {...defaultProps} code={value} language={language} theme={nightOwl}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        return (
          <pre className="relative px-4 -mx-4 md:mx-0 md:rounded-md code" style={{ ...style }}>
            <CopyToClipboard toCopy={value} />
            <code className={classNames(className)} data-language={language}>
              {tokens.map((line, i) => {
                return (
                  <div key={i} {...getLineProps({ line, key: i })}>
                    {line
                      .filter((l) => {
                        return l.empty !== true;
                      })
                      .map((token, key) => {
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
        );
      }}
    </Highlight>
  );
};

export default CodeBlock;
