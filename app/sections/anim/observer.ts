let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        entry.target.classList.add("is-visible");
        observer!.unobserve(entry.target);
      }
    },
    {
      threshold: 0,
      rootMargin: "0px 0px -120px 0px",
    },
  );

  return observer;
}

export function observe(el: HTMLElement) {
  getObserver().observe(el);
}

export function unobserve(el: HTMLElement) {
  observer?.unobserve(el);
}
