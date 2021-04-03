import * as React from 'react';
import Container from '@components/Container/Container';
import Head from '@components/Head/Head';
import Link from '@components/Link/Link';
import Heading from '@components/Heading/Heading';
import Newsletter from '@components/Newsletter/Newsletter';
import Image from 'next/image';
import { LazyMotion, domAnimation, m } from 'framer-motion';

import contentful from '@lib/contentful';
import getOgImage from '@lib/getOgImage';
import { slideInRight, slideInLeft, slideInUp } from '@helpers/animation';

function PointsPattern() {
  return (
    <svg
      className="absolute top-0 right-0 hidden -mt-20 -mr-20 lg:block"
      width="404"
      height="384"
      fill="none"
      viewBox="0 0 404 384">
      <defs>
        <pattern
          id="de316486-4a29-4312-bdfc-fbce2132a2c1"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse">
          <rect
            x="0"
            y="0"
            width="4"
            height="4"
            className="text-gray-200 dark:text-gray-700"
            fill="currentColor"
          />
        </pattern>
      </defs>
      <rect width="404" height="384" fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg
      className="flex-none w-5 h-5 mr-2 text-gray-400"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor">
      <path
        fillRule="evenodd"
        d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function getBirthdayInSecond() {
  const now = new Date();
  const dob = new Date(1996, 1, 22, 15, 30, 0);

  return Math.round((now - dob.getTime()) / 1000);
}

export async function getStaticProps() {
  const title = 'About Me';
  const posts = await contentful.getEntries('post', { order: '-fields.publishedDate' }, ['id']);
  const ogImage = await getOgImage(
    `/phiilu.com/post?title=${title}&url=${process.env.BASE_URL}/about-me`
  );
  const baseUrl = process.env.BASE_URL;

  return {
    props: { postsCount: posts.length, ogImage, baseUrl, initialAge: getBirthdayInSecond() },
    revalidate: 60 * 60 * 24
  };
}

function About({ postsCount, ogImage, baseUrl, initialAge }) {
  const [age, setAge] = React.useState(initialAge);
  const ageInYears = React.useMemo(() => Math.floor(age / 31536000), [age]);
  const mounted = React.useRef();

  React.useEffect(() => {
    mounted.current = true;
    const id = setInterval(() => {
      if (mounted.current) {
        setAge(getBirthdayInSecond());
      }
    }, 1000);

    return () => {
      mounted.current = false;
      clearInterval(id);
    };
  }, []);

  return (
    <>
      <Head title="About Me" image={ogImage} url={`${baseUrl}/about`}></Head>
      <Container>
        <LazyMotion features={domAnimation}>
          <div className="overflow-hidden">
            <div className="relative px-4 pb-16 mx-auto max-w-7xl">
              <m.div variants={slideInLeft} className="mx-auto text-base max-w-prose lg:max-w-none">
                <p className="font-semibold leading-6 tracking-wide text-indigo-600 uppercase xl:text-xl text-md">
                  About me
                </p>
                <Heading noMargin className="mb-8">
                  Meet Florian
                </Heading>
              </m.div>
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="relative mb-8 lg:mb-0 lg:row-start-1 lg:col-start-2">
                  <PointsPattern />
                  <div className="relative mx-auto text-base max-w-prose lg:max-w-none">
                    <m.figure variants={slideInRight}>
                      <Image
                        priority
                        src="/images/me.jpg"
                        alt="Me"
                        width="1184"
                        height="1376"
                        className="absolute inset-0 object-cover object-center w-full h-full rounded-lg shadow-lg lg:static lg:h-auto"
                      />
                      <figcaption className="flex items-center mt-3 text-sm text-gray-500 dark:text-gray-100">
                        <CameraIcon />
                        <span className="flex-1">
                          I should have read the text on the bubble first{' '}
                          <span aria-label="sweat smiley" role="img">
                            😅
                          </span>
                        </span>
                      </figcaption>
                    </m.figure>
                  </div>
                </div>
                <m.div variants={slideInUp}>
                  <div className="mx-auto text-base max-w-prose lg:max-w-none">
                    <p className="mb-5 text-lg leading-7 text-gray-500 dark:text-gray-100">
                      Hey thanks for visiting my blog and wanting to get to know me better!
                    </p>
                  </div>
                  <div className="mx-auto prose text-gray-500 xl:prose-lg dark:prose-dark lg:max-w-none lg:row-start-1 lg:col-start-1 dark:text-gray-100">
                    <p>
                      I am an <strong aria-live="polite">{age}</strong> seconds ({ageInYears} years)
                      old Austrian frontend developer.
                    </p>
                    <p>
                      My true passion is to create modern websites and webapps with state of the art
                      technology. My prefered framework for creating websites these days, is{' '}
                      <Link to="https://reactjs.org/">React</Link>. I started learning React in 2016
                      and since then I kept learning new tools, concepts and technologies evolving
                      around React.
                    </p>
                    <p>
                      I started this blog early 2020 and oh boy did I not know what a crazy year
                      this is gonna be. On January 7th I published{' '}
                      <Link to="/hello-world">my very first blog post</Link> and since then I have
                      written <strong>{postsCount}</strong> articles.
                    </p>
                    <p>
                      Besides coding I like to play video games and listening to music. If I like a
                      song, I sometimes learn to play it on my guitar. On rainy days (or even sunny
                      ones haha) I also like watching movies and TV shows on Netflix. I try to do
                      more sports, so I (try to) train at least 3 days a week with{' '}
                      <Link to="https://www.freeletics.com/">Freeletics</Link> workouts or go for a
                      run.
                    </p>
                  </div>
                </m.div>
              </div>
            </div>
            <Newsletter />
          </div>
        </LazyMotion>
      </Container>
    </>
  );
}

export default About;
