import { Button } from '@react/Button';
import { blueskyShareUrl, xShareUrl } from '@/helpers/shareUrls';
import { BlueskyIcon, HackerNewsIcon, XIcon } from '@react/icons/SocialIcons';
import { ShareIcon } from '@heroicons/react/20/solid';
import { ErrorIcon, LoadingIcon, SuccessIcon } from '@react/icons/NotificationIcons';
import { toast } from 'react-hot-toast';
import { useSyncExternalStore } from 'react';

// `navigator.share` availability never changes for the lifetime of the page,
// so there is nothing to subscribe to. Kept at module scope for a stable ref.
const subscribeToNothing = () => () => {};

interface ShareProps {
  title: string;
  url: string;
  onClick: (url: string, name: string, windowSize: string) => React.MouseEventHandler;
  /** Drops the labels, e.g. for the narrow post sidebar. */
  iconsOnly?: boolean;
}

export function Share({ title, url, onClick, iconsOnly }: ShareProps) {
  // Feature detection has to report `false` for the server render so the markup
  // matches, then switch to the real value once hydrated. useSyncExternalStore
  // does that in one step; an effect would need an extra state round-trip.
  const isShareApiAvailable = useSyncExternalStore(
    subscribeToNothing,
    () => !!window.navigator.share,
    () => false
  );

  function handleSocialShare() {
    try {
      const res = window.navigator.share({
        title,
        text: `${title} by Florian Kapfenberger (@phiilu.com)`,
        url
      });

      toast.promise(
        res,
        {
          loading: (
            <ToastMessage
              title="Share the post with the world"
              text="Select how you want to share the post"
            />
          ),
          success: (
            <ToastMessage title="Shared successfully" text="Thank you for sharing my post!" />
          ),
          error: <ToastMessage title="So close" text="Oh okay.. Maybe next time :)" />
        },
        {
          success: {
            icon: <SuccessIcon />
          },
          loading: {
            icon: <LoadingIcon />
          },
          error: {
            icon: <ErrorIcon />
          }
        }
      );
    } catch {
      // do nothing
    }
  }

  return (
    <ul className={iconsOnly ? 'flex flex-wrap gap-2' : 'grid grid-cols-1 gap-2 sm:grid-cols-2'}>
      {isShareApiAvailable && (
        <ShareButton
          label="Share Anywhere"
          variant="secondary"
          icon={<ShareIcon aria-hidden className="h-5 w-5 shrink-0" />}
          iconsOnly={iconsOnly}
          onClick={handleSocialShare}
        />
      )}
      <ShareButton
        label="Share on Bluesky"
        variant="bluesky"
        icon={<BlueskyIcon />}
        iconsOnly={iconsOnly}
        onClick={onClick(blueskyShareUrl(title, url), 'bluesky-share', 'width=550,height=235')}
      />
      <ShareButton
        label="Share on X"
        variant="x"
        icon={<XIcon />}
        iconsOnly={iconsOnly}
        onClick={onClick(xShareUrl(title, url), 'x-share', 'width=550,height=420')}
      />
      <ShareButton
        label="Share on Hacker News"
        variant="hackernews"
        icon={<HackerNewsIcon />}
        iconsOnly={iconsOnly}
        onClick={onClick(
          `https://news.ycombinator.com/submitlink?u=${url}&t=${title}`,
          'hn-share',
          'width=550,height=350'
        )}
      />
    </ul>
  );
}

interface ShareButtonProps {
  label: string;
  variant: string;
  icon: React.ReactNode;
  iconsOnly?: boolean;
  onClick: React.MouseEventHandler;
}

function ShareButton({ label, variant, icon, iconsOnly, onClick }: ShareButtonProps) {
  return (
    <li>
      <Button
        aria-label={label}
        title={iconsOnly ? label : undefined}
        className={iconsOnly ? 'px-3!' : 'whitespace-nowrap'}
        width={iconsOnly ? 'medium' : 'full'}
        variant={variant}
        onClick={onClick}
      >
        {icon}
        {!iconsOnly && label}
      </Button>
    </li>
  );
}

interface ToastMessageProps {
  title: string;
  text: string;
}

function ToastMessage({ title, text }: ToastMessageProps) {
  return (
    <div className="ml-3 w-0 flex-1 pt-0.5">
      <p className="text-sm font-medium text-gray-900 dark:text-white">{title}</p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-100">{text}</p>
    </div>
  );
}
