export const SITE_TITLE = 'Phiilu | Florian Kapfenberger';
export const SITE_DESCRIPTION =
  'Software Developer: TypeScript, Elixir & Swift / Indie Hacker / Loves to self-host apps and services';

// Published on the imprint page. § 25 (2) of the Austrian Media Act asks for
// the owner's name, the purpose of the site and "Wohnort oder Sitz
// (Niederlassung)" — the town, not a street address — and § 25 (5) asks for
// less again. A street address becomes due under § 5 (1) Z 2 ECG once the site
// turns commercial (ads, affiliate links, sponsored posts, paid content), and
// under § 24 (3) MedienG inside every issue if a newsletter is ever reinstated.
export const OWNER = 'Florian Kapfenberger';
export const TOWN = '3170 Hainfeld';
export const CONTACT_EMAIL = 'legal@kapfenberger.me';

// Pages Google crawled and chose not to index: tag pages only list posts, and
// the hello-world post is too thin to stand on its own. They get a noindex tag
// and stay out of the sitemap, so the two never contradict each other.
export const isNoindexed = (pathname: string) =>
  pathname.startsWith('/tag/') || pathname === '/hello-world';
