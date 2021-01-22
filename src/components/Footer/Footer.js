import React from 'react';
import Container from '@components/Container/Container';
import Link from '@components/Link/Link';

const today = new Date();

const Footer = () => {
  return (
    <footer className="mt-32 space-y-4">
      <Container className="space-y-2 text-center">
        <div className="flex flex-wrap justify-center space-x-4">
          <Link
            tracking={{
              event: 'click',
              value: 'Twitter visits',
              name: 'Twitter visits'
            }}
            className="px-4 py-2 font-semibold transition-colors duration-300 ease-in-out rounded-md hover:bg-twitter-200 hover:text-twitter-800"
            to="https://twitter.com/phiilu">
            Twitter
          </Link>
          <Link
            tracking={{
              event: 'click',
              value: 'GitHub visits',
              name: 'GitHub visits'
            }}
            className="px-4 py-2 font-semibold transition-colors duration-300 ease-in-out rounded-md hover:bg-github-200 hover:text-github-800 "
            to="https://github.com/phiilu">
            GitHub
          </Link>
          <Link
            tracking={{
              event: 'click',
              value: 'LinkedIn visits',
              name: 'LinkedIn visits'
            }}
            className="px-4 py-2 font-semibold transition-colors duration-300 ease-in-out rounded-md hover:bg-linkedin-200 hover:text-linkedin-800"
            to="https://www.linkedin.com/in/florian-kapfenberger-59581b164/">
            LinkedIn
          </Link>
        </div>
        <div className="flex flex-wrap justify-center space-x-2 text-gray-500">
          <Link
            className="px-2 py-2 text-xs font-semibold transition-colors duration-300 ease-in-out rounded-md hover:text-rss-500"
            to="/rss/feed.xml">
            RSS Feed
          </Link>
          <Link
            className="px-2 py-2 text-xs font-semibold transition-colors duration-300 ease-in-out rounded-md hover:text-rss-500"
            to="/rss/atom.xml">
            Atom Feed
          </Link>
          <Link
            className="px-2 py-2 text-xs font-semibold transition-colors duration-300 ease-in-out rounded-md hover:text-rss-500"
            to="/rss/feed.json">
            JSON Feed
          </Link>
        </div>
      </Container>
      <div className="py-4 bg-indigo-100 dark:bg-gray-800">
        <Container className="text-center">
          <span className="font-semibold text-indigo-800 dark:text-gray-300">
            &copy; {today.getFullYear()} Phiilu
          </span>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
