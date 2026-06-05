import type { AnchorHTMLAttributes, ReactNode } from 'react';

interface SeoLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

/**
 * Native anchor — triggers a full document reload on navigation.
 * Ensures each page is fetched as complete server-rendered HTML (no client-side route transitions).
 */
export function SeoLink({ href, children, ...props }: SeoLinkProps) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
