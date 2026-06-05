import { SeoLink } from '@/components/SeoLink';
import { constructMetadata } from '@/lib/seo';

export const dynamic = 'force-static';
export const revalidate = false;
export const metadata = constructMetadata({
  title: 'Page Not Found',
  description: 'The page you requested does not exist on TechKnowledge Hub.',
  path: '/404',
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="bg-slate-50 min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <p className="text-6xl font-black text-indigo-600">404</p>
        <h1 className="text-2xl font-bold text-slate-900">Page not found</h1>
        <p className="text-sm text-slate-500">
          The URL may have changed or the page was removed. Try the blog, FAQ, or site search.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <SeoLink
            href="/"
            className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
          >
            Home
          </SeoLink>
          <SeoLink
            href="/blog"
            className="px-5 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl"
          >
            Blog
          </SeoLink>
        </div>
      </div>
    </div>
  );
}
