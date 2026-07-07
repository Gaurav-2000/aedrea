interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  image?: string;
}

export default function SEO(props: SEOProps) {
  // Read props to satisfy compiler unused local checks
  if (props.title) {
    return null;
  }
  return null;
}
