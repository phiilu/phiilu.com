// Single source of truth for the factual claims on /privacy. The page renders
// these lists rather than restating them in prose, the code reads the storage
// keys from here, and `verifyPrivacyDisclosures` in astro.config.mjs fails the
// build if a page loads a host that is not declared below.
//
// That check only reads src/srcset/poster/<link href> out of the built HTML. It
// cannot see response headers, DNS-level proxying, fetch()/XHR, CSS url() or
// nodes added by scripts — the CDN below was invisible to it. Those have to be
// declared by hand.

/** Who serves the site. Moving to another host is an edit here, not in the copy. */
export const HOSTING = {
  name: 'Vercel Inc.',
  // Used mid-sentence, where the legal suffix's full stop would read as one.
  shortName: 'Vercel',
  address: '440 N Barranca Ave #4133, Covina, CA 91723, USA',
  // What legitimises the transfer when the host processes outside the EEA.
  // Empty string when it does not.
  transfer:
    "Vercel processes data in the USA. Vercel Inc. participates in the EU-U.S. Data Privacy Framework, for which the European Commission adopted an adequacy decision on 10 July 2023 (Art. 45 GDPR); the listing is public at dataprivacyframework.gov/list. Vercel uses sub-processors of its own, listed at vercel.com/legal/subprocessors. Should that adequacy decision be annulled or suspended, transfers continue on the European Commission's standard contractual clauses (Art. 46 (2) (c) GDPR).",
  // Empty because Vercel's DPA says it "applies to Vercel's Processing of
  // Personal Data as a Processor under the Agreement for Customers who are on
  // Enterprise and Pro plans" — this site is on Hobby, so there is no Art. 28
  // contract to claim. Fill this in if the plan changes.
  dpa: '',
  // Vercel's published retention for runtime logs on the free plan this site
  // uses. Art. 13 (2) (a) GDPR wants a period or a criterion, not "as needed".
  logRetention:
    'for one hour on the free plan this site runs on — that is the window Vercel publishes for viewing runtime logs, and Vercel does not publish how long it holds the underlying records internally'
};

/**
 * The network in front of the hosting, if any — it is the first server the
 * visitor's browser talks to, so it sees every request before the host does.
 * Set to `null` when the host is reached directly.
 */
interface Provider {
  name: string;
  shortName: string;
  address: string;
  /** Empty when the provider offers no Art. 28 contract on this plan. */
  dpa: string;
  transfer: string;
  logRetention: string;
  privacyPolicy: string;
}

export const CDN: Provider | null = {
  name: 'Cloudflare, Inc.',
  shortName: 'Cloudflare',
  address: '101 Townsend St., San Francisco, CA 94107, USA',
  transfer:
    "Cloudflare processes data in the USA. It states that it has certified to the EU-U.S. Data Privacy Framework, which the European Commission recognised as adequate on 10 July 2023 (Art. 45 GDPR), and that it falls back on the European Commission's standard contractual clauses (Art. 46 (2) (c) GDPR) should that certification lapse; write to me for a copy of those.",
  // Cloudflare's self-serve subscription agreement, which the free plan is on,
  // incorporates its Data Processing Addendum by reference — so this one is in
  // place without anything having to be signed.
  dpa: 'A data processing agreement under Art. 28 GDPR is in place with Cloudflare, incorporated by reference into its self-serve subscription agreement.',
  // Cloudflare publishes no fixed period, so this has to be a criterion rather
  // than a number.
  logRetention:
    'for no period Cloudflare publishes; it states only that it keeps personal data as long as is consistent with the purpose it was collected for',
  privacyPolicy: 'https://www.cloudflare.com/privacypolicy/'
};

interface Analytics {
  name: string;
  /** How the provider counts visits without identifying anyone. */
  method: string;
  /** Everything the provider records per page view, per its own documentation. */
  collects: readonly string[];
  retention: string;
}

/** Set to `null` when no visitor statistics are collected at all. */
export const ANALYTICS: Analytics | null = {
  name: 'Vercel Web Analytics',
  method:
    'it stores no cookie and no identifier in your browser. Vercel derives a hash from the incoming request to recognise a visit, and documents that this visitor session is discarded automatically after 24 hours and that no identifier is used that could follow you to another website',
  collects: [
    'the time of the visit',
    'the page address and the route pattern behind it',
    'the referrer that sent you there',
    'query parameters, filtered by Vercel',
    'an approximate location derived from your IP address — country, region and city',
    'your device type, operating system and browser, including version numbers'
  ],
  retention:
    'aggregated by Vercel and viewable for one month on the free plan this site runs on. Vercel notes that it may hold the data longer than that window so a later plan upgrade does not lose it'
};

export const STORAGE_KEYS = {
  theme: 'theme',
  reduceMotion: 'reduce-motion',
  banner: 'show_banner'
} as const;

/** What the site keeps in the visitor's browser, and why. */
export const STORED_SETTINGS = [
  { key: STORAGE_KEYS.theme, purpose: 'the theme you picked' },
  { key: STORAGE_KEYS.reduceMotion, purpose: 'whether you asked for reduced motion' },
  {
    key: STORAGE_KEYS.banner,
    purpose: 'that you dismissed my announcement banner, so it stays dismissed'
  }
] as const;

/**
 * Hosts the browser fetches on its own, which therefore see the visitor's IP.
 * A host listed here covers its subdomains. Plain links a visitor has to click
 * are not included — nothing is loaded from them until they do.
 */
// Establishment matters for Art. 13 (1) (f): CodeSandbox B.V. is Dutch, so
// there is no third-country transfer here. Re-check this if a non-EEA host is
// ever added — the copy in privacy.astro asserts EEA establishment.
export const THIRD_PARTY_HOSTS = [
  {
    hosts: ['codesandbox.io', 'csb.app'],
    name: 'CodeSandbox',
    what: 'an embedded live code editor'
  }
] as const;
