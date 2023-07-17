import { useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Banner } from "./Banner";
import { PokezardsIcon } from "./icons/PokezardsIcon";

export function PageBanner() {
  const [showPokezardsBanner, setShowPokezardsBanner] = useLocalStorage(
    "show_banner",
    true,
  );

  //   useEffect(() => {
  //     if (showPokezardsBanner) {
  //       document.body.classList.add("pt-[72px]");
  //     } else {
  //       document.body.classList.toggle("pt-[72px]");
  //     }
  //   }, [showPokezardsBanner]);

  return (
    <>
      {showPokezardsBanner && (
        <Banner
          icon={<PokezardsIcon className="w-8 h-8" />}
          ctaText={"Check it out"}
          ctaHref="//pokezards.com?ref=phiilu.com"
          text="Hey! If you like Pokémon TCG you might like my new project I am working on »Pokézards«"
          shortText="I am working on a new product!"
          onClose={() => setShowPokezardsBanner(false)}
        />
      )}
    </>
  );
}
