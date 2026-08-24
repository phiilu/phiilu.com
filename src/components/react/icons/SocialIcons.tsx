// Brand marks are not part of lucide/heroicons, so the two paths live here
// instead of pulling in a whole icon package for them.
const iconProps = {
  'aria-hidden': true,
  className: 'h-5 w-5 shrink-0',
  fill: 'currentColor',
  xmlns: 'http://www.w3.org/2000/svg'
} as const;

export function BlueskyIcon() {
  return (
    <svg {...iconProps} viewBox="0 0 600 530">
      <path d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z" />
    </svg>
  );
}

export function XIcon() {
  return (
    <svg {...iconProps} viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function HackerNewsIcon() {
  return (
    <svg {...iconProps} viewBox="0 0 24 24">
      <path d="M0 0v24h24V0H0zm12.5 13.4v4.9h-1.9v-4.9L6.9 6.2h2.1l2.6 5.2 2.5-5.2h2.1l-3.7 7.2z" />
    </svg>
  );
}
