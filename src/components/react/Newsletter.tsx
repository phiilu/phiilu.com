import { Alert } from '@react/Alert';
import { Button } from '@react/Button';
import { Container } from '@react/Container';
import { type HTMLProps, useState } from 'react';

type InputProps = HTMLProps<HTMLInputElement>;

function Input({ label, type, required, placeholder, ...props }: InputProps) {
  return (
    <input
      aria-label={label}
      type={type}
      required={required}
      className="w-full px-4 py-3 text-base leading-6 text-gray-900 transition-colors duration-150 ease-in-out bg-white border rounded-md appearance-none placeholder-gray-500 border-black/10 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 dark:text-gray-100 dark:bg-gray-900/60 dark:placeholder-gray-500 dark:border-white/10"
      placeholder={placeholder}
      {...props}
    />
  );
}

export function Newsletter() {
  const [form, setForm] = useState({ first_name: '', email: '' });
  const [state, setState] = useState('idle');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    fetch('https://api.phiilu.com/newsletter-signup', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then(() => {
        setState('success');
      })
      .catch((error) => {
        console.error(error);
        setState('error');
      });
  }

  function tryAgain() {
    setState('idle');
  }

  if (state === 'success') {
    return (
      <Container className="py-6">
        <Alert
          variant="success"
          title="Thanks for signing up for my Newsletter!"
          message="Only one step left. Please check your email to confirm your subscription."
          onClose={tryAgain}
        />
      </Container>
    );
  }

  if (state === 'error') {
    return (
      <Container className="py-6">
        <Alert
          variant="error"
          title="Ohh shoot!"
          message="Sorry we could not sign you up... wanna try again?"
          action={{
            name: 'Hell yes!',
            onClick: tryAgain
          }}
          onClose={tryAgain}
        />
      </Container>
    );
  }

  return (
    <Container className="py-6">
      <section
        aria-labelledby="newsletter-headline"
        className="p-6 space-y-4 rounded-lg sm:p-8 bg-slate-100 dark:bg-gray-800/60 ring-1 ring-black/5 dark:ring-white/10"
      >
        <div className="space-y-1">
          <h2
            id="newsletter-headline"
            className="text-lg font-semibold text-gray-900 dark:text-white"
          >
            Want blog post updates?
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sign up for my newsletter — new posts in your inbox, no spam, unsubscribe anytime.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-3 sm:flex sm:space-y-0 sm:space-x-3"
          aria-labelledby="newsletter-headline"
        >
          <Input
            label="Firstname"
            name="first_name"
            type="text"
            required
            placeholder="Your Firstname"
            value={form.first_name}
            onChange={handleChange}
          />
          <Input
            label="Email address"
            name="email"
            type="email"
            required
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
          />
          <Button type="submit" width="medium" className="shrink-0 max-sm:w-full">
            Notify me
          </Button>
        </form>
      </section>
    </Container>
  );
}
