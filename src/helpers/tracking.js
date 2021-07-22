function trackEvent({ name, value, type = 'type' }) {
  const { splitbee } = window;

  if (splitbee) {
    if (!name) return;
    if (name === value) {
      splitbee.track(name);
    } else {
      splitbee.track(name, { [type]: value });
    }
  }
}

export default trackEvent;
