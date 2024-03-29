import { Banner } from '@react/Banner';
import { PokezardsIcon } from '@react/icons/PokezardsIcon';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export function PageBanner() {
  const [showPokezardsBanner, setShowPokezardsBanner] = useLocalStorage('show_banner', true);

  return (
    <>
      {showPokezardsBanner && (
        <Banner
          icon={<PokezardsIcon className="w-8 h-8" />}
          ctaText={'Check it out'}
          ctaHref="//pokezards.com?ref=phiilu.com"
          text="Hey! If you like Pokémon TCG you might like my new project I am working on »Pokézards«"
          shortText="I am working on a new product!"
          onClose={() => setShowPokezardsBanner(false)}
        />
      )}
    </>
  );
}
