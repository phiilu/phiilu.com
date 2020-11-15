import Image from 'next/image';
import Container from '@components/Container/Container';
import Heading from '@components/Heading/Heading';

const NotFoundPage = () => (
  <Container as="main" className="flex flex-col items-center">
    <Heading noMargin className="mb-4 md:text-5xl">
      The site you are looking for was not found...
    </Heading>
    <p className="text-lg leading-7 md:text-2xl">
      You just hit a route that doesn&#39;t exist... the sadness.
    </p>
    <div className="mt-16 md:w-2/4">
      <Image
        width="368"
        height="200"
        src="/images/not_found.svg"
        alt="girl sitting on text saying 404 not found"
      />
    </div>
  </Container>
);

export default NotFoundPage;
