import { Button } from "./Button";
import { Heading } from "./Heading";

interface ShareOnTwitterCtaProps {
  onClick: React.MouseEventHandler;
}

export function ShareOnTwitterCta({ onClick }: ShareOnTwitterCtaProps) {
  return (
    <aside
      aria-label="Share on Twitter card"
      className="px-6 py-6 space-y-4 rounded-md bg-indigo-50 dark:bg-gray-800"
    >
      <Heading size="h2" noMargin>
        Did you find this post useful or learned something?
      </Heading>
      <p className="prose lg:prose-xl dark:prose-dark">
        I would be really grateful if you let me{" "}
        <a
          //   tracking={{
          //     event: "click",
          //     value: "Twitter CTA",
          //     name: "Twitter CTA",
          //   }}
          href="https://twitter.com/phiilu"
        >
          @phiilu
        </a>{" "}
        know by sharing it on Twitter!
      </p>
      <Button
        variant="twitter"
        onClick={onClick}
        // tracking={{
        //   event: "click",
        //   value: "Share on Twitter clicked",
        //   name: "Share on Twitter clicked",
        // }}
      >
        Share on Twitter
      </Button>
    </aside>
  );
}
