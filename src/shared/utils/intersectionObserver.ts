export function intersectionObserver(
  target: HTMLElement | null,
  config: IntersectionObserverInit,
  callback: () => void,
) {
  if (!target) {
    return;
  }

  const { threshold = 0.5, root, rootMargin } = config;

  const observer = new IntersectionObserver(
    (entries, observe) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        callback();
        observe.disconnect();
      }
    },
    { threshold, root, rootMargin },
  );

  observer.observe(target);
}
