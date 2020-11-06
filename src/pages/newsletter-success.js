import Container from '@components/Container/Container';
import Layout from '@components/Layout/Layout';
import Heading from '@components/Heading/Heading';
import Image from 'next/image';

function NewsletterSuccess() {
  return (
    <Layout>
      <Container className="text-center">
        <Heading noMargin className="mb-4 md:text-5xl">
          Thanks for signing up for my Newsletter!
        </Heading>
        <p className="text-lg leading-7 md:text-2xl">
          Only one step left. Please check your email to confirm your subscription.
        </p>
        <div className="mt-16">
          <Image
            width="368"
            height="200"
            src="/images/mailbox.svg"
            alt="old school mailbox"
            className="md:w-2/4"
          />
        </div>
      </Container>
    </Layout>
  );
}

export default NewsletterSuccess;
