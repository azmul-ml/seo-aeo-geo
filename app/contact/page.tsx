import type { Metadata } from 'next';
import { SeoLink } from '@/components/SeoLink';
import { constructMetadata } from '@/lib/seo';
import { schemasForContact } from '@/lib/page-schemas';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AnswerBlock } from '@/components/AnswerBlock';
import { FaqAccordion } from '@/components/FaqAccordion';

export const dynamic = 'force-static';
export const revalidate = false;
export const metadata: Metadata = constructMetadata({
  title: 'Contact TechKnowledge Hub',
  description:
    'Contact our editorial, support, and partnerships teams for corrections, press inquiries, and technical SEO questions.',
  path: '/contact',
});

const contactChannels = [
  {
    title: 'Editorial',
    description: 'Article corrections, fact-checking, and citation requests.',
    email: 'editorial@techknowledgehub.example.com',
  },
  {
    title: 'Support',
    description: 'Product questions, account help, and technical issues.',
    email: 'support@techknowledgehub.example.com',
  },
  {
    title: 'Partnerships',
    description: 'Press, collaborations, and enterprise licensing.',
    email: 'partnerships@techknowledgehub.example.com',
  },
];

const contactFaqs = [
  {
    question: 'How do I contact TechKnowledge Hub?',
    answer:
      'Use the contact form on this page or email editorial@techknowledgehub.example.com for content corrections, support@techknowledgehub.example.com for product help, or partnerships@techknowledgehub.example.com for business inquiries.',
  },
  {
    question: 'How quickly does TechKnowledge Hub respond to inquiries?',
    answer:
      'Editorial and support teams aim to respond within 2 business days. Urgent factual corrections on published articles are prioritized within 24 hours.',
  },
  {
    question: 'Can I request a correction to an article?',
    answer:
      'Yes. Send the article URL, the specific claim, and your source to editorial@techknowledgehub.example.com. Corrections follow our editorial policy and are logged with a last-modified date.',
  },
];

export default function ContactPage() {
  const crumbs = [{ name: 'Contact', item: '/contact' }];

  return (
    <>
      <JsonLd canonicalPath="/contact" schemas={schemasForContact()} />
      <Breadcrumbs crumbs={crumbs} />

      <div className="bg-slate-50 min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
          <header className="text-center space-y-4 max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Contact Us
            </h1>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Reach our editorial, support, and partnerships teams. We welcome corrections,
              press inquiries, and questions about SEO, AEO, and GEO.
            </p>
            <div className="text-left">
              <AnswerBlock
                question="How do I contact TechKnowledge Hub?"
                answer="Use the form below or email editorial@techknowledgehub.example.com for content issues, support@techknowledgehub.example.com for product help, or call +1-555-0199. We respond within 2 business days."
              />
            </div>
          </header>

          <div className="grid gap-8 lg:grid-cols-12 items-start">
            {/* Contact form */}
            <section
              className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xs text-left"
              aria-labelledby="contact-form-heading"
            >
              <h2 id="contact-form-heading" className="text-lg font-bold text-slate-900 mb-1">
                Send a message
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                All fields are required. This demo endpoint acknowledges receipt without sending email.
              </p>

              <form action="/api/contact" method="post" className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@company.com"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Subject
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    required
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select a topic</option>
                    <option value="editorial">Editorial / correction</option>
                    <option value="support">Product support</option>
                    <option value="partnership">Partnership / press</option>
                    <option value="seo">SEO / AEO / GEO question</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe your question or include the article URL for corrections..."
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors"
                >
                  Send message
                </button>
              </form>
            </section>

            {/* Contact details sidebar */}
            <aside className="lg:col-span-5 space-y-6">
              <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs text-left space-y-4">
                <h2 className="text-lg font-bold text-slate-900">Direct channels</h2>
                <ul className="space-y-4">
                  {contactChannels.map((channel) => (
                    <li key={channel.email}>
                      <h3 className="text-sm font-bold text-slate-900">{channel.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{channel.description}</p>
                      <a
                        href={`mailto:${channel.email}`}
                        className="text-sm text-indigo-600 hover:underline font-semibold mt-1 inline-block"
                      >
                        {channel.email}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs text-left">
                <h2 className="text-lg font-bold text-slate-900 mb-3">Organization</h2>
                <address className="not-italic text-sm text-slate-600 space-y-2">
                  <p className="font-bold text-slate-900">TechKnowledge Hub</p>
                  <p>
                    <a href="tel:+15550199" className="text-indigo-600 hover:underline">
                      +1-555-0199
                    </a>
                  </p>
                  <p>Mon–Fri, 9:00–17:00 ET</p>
                  <p className="text-xs text-slate-500 pt-1">
                    Typical response: 2 business days
                  </p>
                </address>
              </section>

              <section className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 text-left text-sm text-slate-700">
                <p>
                  For editorial standards and correction policy, see our{' '}
                  <SeoLink href="/editorial-policy" className="text-indigo-600 hover:underline font-semibold">
                    Editorial Policy
                  </SeoLink>{' '}
                  and{' '}
                  <SeoLink href="/about" className="text-indigo-600 hover:underline font-semibold">
                    About
                  </SeoLink>{' '}
                  pages.
                </p>
              </section>
            </aside>
          </div>

          {/* Contact FAQ */}
          <section className="max-w-3xl mx-auto text-left">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Contact FAQ</h2>
            <FaqAccordion items={contactFaqs} />
          </section>
        </div>
      </div>
    </>
  );
}
