export const scrollToSection = (
  sectionId: string,
  offset: number = 100
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
