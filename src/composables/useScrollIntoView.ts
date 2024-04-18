export default function useScrollIntoView() {
  const scrollToElement = (selector, options = {}) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        ...options
      });
    }
  };

  return {
    scrollToElement
  };
}
