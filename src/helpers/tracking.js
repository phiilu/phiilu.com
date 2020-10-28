function trackEvent({ event, value }) {
  const { umami, plausible, splitbee } = window;

  if (umami) {
    umami.trackEvent(value, event);
  }

  if (plausible) {
    plausible(value);
  }

  if (splitbee) {
    splitbee.track(event, { type: value });
  }
}

export default trackEvent;
