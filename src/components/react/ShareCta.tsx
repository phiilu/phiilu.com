import { Share } from '@react/Share';

interface ShareCtaProps {
  title: string;
  url: string;
  onClick: (url: string, name: string, windowSize: string) => React.MouseEventHandler;
}

export function ShareCta({ title, url, onClick }: ShareCtaProps) {
  return (
    <aside
      aria-label="Share this post"
      className="p-6 space-y-4 rounded-lg bg-slate-100 dark:bg-gray-800/60 ring-1 ring-black/5 dark:ring-white/10"
    >
      <div className="space-y-1">
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          Found this useful? Share it.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Or say hi on Bluesky —{' '}
          <a
            className="underline hover:text-bluesky-600 dark:hover:text-bluesky-300"
            href="https://bsky.app/profile/phiilu.com"
          >
            @phiilu.com
          </a>
        </p>
      </div>
      <Share title={title} url={url} onClick={onClick} />
    </aside>
  );
}
