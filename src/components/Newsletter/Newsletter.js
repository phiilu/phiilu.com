import * as React from 'react';
import Alert from '@components/Alert/Alert';
import Button from '@components/Button/Button';
import { motion } from 'framer-motion';

function Input({ label, type, required, placeholder, ...props }) {
  return (
    <input
      aria-label={label}
      type={type}
      required={required}
      className="w-full px-5 py-3 text-base leading-6 text-gray-900 placeholder-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md appearance-none dark:text-gray-100 dark:bg-gray-800 dark: focus:outline-none focus:shadow-outline focus:border-blue-300 sm:max-w-xs dark:placeholder-gray-400 dark:border-gray-700"
      placeholder={placeholder}
      {...props}
    />
  );
}

let easing = [0.175, 0.85, 0.42, 0.96];
const variants = {
  exit: { y: 150, opacity: 0, transition: { duration: 0.5, ease: easing } },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.5,
      ease: easing
    }
  }
};

function Newsletter() {
  const [form, setForm] = React.useState({ first_name: '', email: '' });
  const [state, setState] = React.useState('idle');

  function handleChange(event) {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }

  function handleSubmit(event) {
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
        if (window?.splitbee) {
          window.splitbee.user.set({ displayName: form.first_name, email: form.email });
        }
        setState('success');
      })
      .catch(() => {
        setState('error');
      });
  }

  function tryAgain() {
    setState('idle');
  }

  if (state === 'success') {
    return (
      <Alert
        variant="success"
        title="Thanks for signing up for my Newsletter!"
        message="Only one step left. Please check your email to confirm your subscription."
      />
    );
  }

  if (state === 'error') {
    return (
      <Alert
        variant="error"
        title="Ohh shoot!"
        message="Sorry we could not sign you up... wanna try again?"
        action={{
          name: 'Hell yes!',
          onClick: tryAgain
        }}
      />
    );
  }

  return (
    <motion.div variants={variants} className="flex">
      <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
          Want blog post updates? <br className="hidden sm:inline" />
          <span className="text-indigo-600 dark:text-indigo-500" id="newsletter-headline">
            Sign up for my newsletter.
          </span>
        </h2>
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-3 sm:flex sm:space-y-0 sm:space-x-3"
          aria-labelledby="newsletter-headline">
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
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:flex-shrink-0">
            <Button
              type="submit"
              tracking={{
                event: 'newsletter-signup',
                name: 'Newsletter Signup Notify clicked',
                value: 'Newsletter Signup Notify clicked'
              }}>
              Notify me
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default Newsletter;
