function trackEvent({ event, name, value }) {
  const { umami, plausible, splitbee } = window;

  if (umami) {
    umami.trackEvent(value, event);
  }

  if (plausible) {
    if (name) {
      plausible(name);
    }
    if (value) {
      plausible(value);
    }
  }

  if (splitbee) {
    if (!name) return;
    if (name === value) {
      splitbee.track(name);
    } else {
      splitbee.track(name, { type: value });
    }
  }
}

export default trackEvent;
