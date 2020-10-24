import React from 'react';
import Container from '@components/Container/Container';
import Link from '@components/Link/Link';

const today = new Date();

const Footer = () => {
  return (
    <footer className="mt-32 space-y-8">
      <Container className="flex flex-wrap justify-center text-center">
        <Link
          data-track="Twitter visits"
          data-splitbee-event="Twitter visits"
          className="px-4 py-2 mr-4 font-semibold transition-colors duration-300 ease-in-out rounded-md hover:bg-twitter-200 hover:text-twitter-800 umami--click--Twitter-link"
          to="https://twitter.com/phiilu">
          Twitter
        </Link>
        <Link
          data-track="GitHub visits"
          data-splitbee-event="GitHub visits"
          className="px-4 py-2 mr-4 font-semibold transition-colors duration-300 ease-in-out rounded-md hover:bg-github-200 hover:text-github-800 umami--click--GitHub-link"
          to="https://github.com/phiilu">
          GitHub
        </Link>
        <Link
          data-track="LinkedIn visits"
          data-splitbee-event="LinkedIn visits"
          className="px-4 py-2 mr-4 font-semibold transition-colors duration-300 ease-in-out rounded-md hover:bg-linkedin-200 hover:text-linkedin-800 umami--click--LinkedIn-link"
          to="https://www.linkedin.com/in/florian-kapfenberger-59581b164/">
          LinkedIn
        </Link>
        <Link
          className="px-4 py-2 mr-4 font-semibold transition-colors duration-300 ease-in-out rounded-md hover:bg-rss-200 hover:text-rss-800"
          to="/rss.xml">
          RSS Feed
        </Link>
      </Container>

      <div className="py-4 bg-indigo-100">
        <Container className="text-center">
          <span className="font-semibold text-indigo-800">&copy; {today.getFullYear()} Phiilu</span>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
