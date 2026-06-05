import { SeoLink } from '@/components/SeoLink';

export interface RelatedLink {
  href: string;
  label: string;
  type: string;
}

interface RelatedEntitiesProps {
  title?: string;
  links: RelatedLink[];
}

export function RelatedEntities({ title = 'Related content', links }: RelatedEntitiesProps) {
  if (links.length === 0) return null;

  return (
    <nav aria-label={title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs text-left">
      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <SeoLink
              href={link.href}
              className="text-sm font-semibold text-indigo-600 hover:underline flex items-center gap-2"
            >
              <span className="text-[10px] uppercase text-slate-400 font-bold">{link.type}</span>
              {link.label}
            </SeoLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
