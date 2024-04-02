/**
 * Contentful Specific type definitions
 */
interface Image {
  title: string;
  description?: string;
  file: {
    url: string;
    details: {
      image: { width: number; height: number };
    };
  };
}

interface Page {
  title: string;
  body: object;
  heroImage?: Image;
}

interface Post {
  title: string;
  body: object;
  heroImage?: Image;
}

interface NavItem {
  title: string;
  slug: string;
}
interface PageNav extends NavItem {}
interface TagNav extends NavItem {}
