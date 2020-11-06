import * as React from 'react';
import ConvertKitForm from 'convertkit-react';
import Button from '@components/Button/Button';

function Newsletter() {
  const [consent, setConsent] = React.useState(false);

  function handleConsnetClick() {
    setConsent((prev) => !prev);
  }

  React.useEffect(() => {
    const lsConset = localStorage.getItem('ck-consent');
    if (lsConset) {
      setConsent(lsConset === 'true');
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('ck-consent', consent);
  }, [consent]);

  return (
    <div className="flex bg-white">
      <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
          Want blog post updates? <br className="hidden sm:inline" />
          <span className="text-indigo-600" id="newsletter-headline">
            Sign up for my newsletter.
          </span>
        </h2>
        {consent ? (
          <ConvertKitForm className="ck-fm" submitText="Notify me" formId={1795678} />
        ) : (
          <Button className="mt-8" onClick={handleConsnetClick}>
            Click here to show sign up form powered by ConvertKit (loads cookies)
          </Button>
        )}
      </div>
    </div>
  );
}

export default Newsletter;
