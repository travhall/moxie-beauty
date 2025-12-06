export const scrollToSection = (
  sectionId: string,
  offset: number = 0
): void => {
  const section = document.getElementById(sectionId);

  if (section) {
    const sectionTop = section.getBoundingClientRect().top;
    const offsetPosition = sectionTop + window.scrollY - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

export const scrollToSectionWithFocus = (
  sectionId: string,
  offset: number = 0
): void => {
  scrollToSection(sectionId, offset);

  // Focus the section after scroll completes
  setTimeout(() => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.focus({ preventScroll: true });
    }
  }, 1000);
};

export const getScrollProgress = (): number => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
};
