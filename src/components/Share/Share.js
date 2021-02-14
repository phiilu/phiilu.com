import * as React from 'react';
import toast from 'react-hot-toast';

import Button from '@components/Button/Button';

function Share({ title, url, onClick }) {
  const [isSareApiAvailable, setIsSareApiAvailable] = React.useState(false);

  React.useEffect(() => {
    setIsSareApiAvailable(!!window.navigator.share);
  }, []);

  function handleSocialShare() {
    try {
      const res = window.navigator.share({
        title,
        text: `${title} by Florian Kapfenberger (@phiilu)`,
        url
      });

      toast.promise(res, {
        loading: {
          title: 'Share the post with the world',
          text: 'Select how you want to share the post',
          dismiss: false
        },
        success: {
          title: 'Shared successfully',
          text: 'Thank you for sharing my post!',
          dismiss: true
        },
        error: { title: 'So close', text: 'Oh okay.. Maybe next time :)', dismiss: true }
      });
    } catch (error) {
      // do nothing
    }
  }

  return (
    <ul className="space-y-2 sm:items-start sm:space-x-2 sm:space-y-0 xl:space-y-2 sm:flex xl:space-x-0 xl:block">
      {isSareApiAvailable && (
        <li className="w-full">
          <Button
            tracking={{
              event: 'click',
              value: 'Share Anywhere clicked',
              name: 'Share Anywhere clicked'
            }}
            variant="secondary"
            onClick={handleSocialShare}>
            Share Anywhere
          </Button>
        </li>
      )}
      <li className="w-full">
        <Button
          tracking={{
            event: 'click',
            value: 'Share on Twitter clicked',
            name: 'Share on Twitter clicked'
          }}
          variant="twitter"
          onClick={onClick(
            `https://twitter.com/share?text=${title} via @phiilu&url=${url}`,
            'twitter-share',
            'width=550,height=235'
          )}>
          Share on Twitter
        </Button>
      </li>
      <li className="w-full">
        <Button
          tracking={{
            event: 'click',
            value: 'Share on Hacker News clicked',
            name: 'Share on Hacker News clicked'
          }}
          variant="hackernews"
          onClick={onClick(
            `https://news.ycombinator.com/submitlink?u=${url}&t=${title}`,
            'hn-share',
            'width=550,height=350'
          )}>
          Share on Hacker News
        </Button>
      </li>
    </ul>
  );
}

export default Share;
