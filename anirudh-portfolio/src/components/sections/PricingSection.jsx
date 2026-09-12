import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const ease = [0.25, 0.1, 0.25, 1];

const CATEGORIES = [
  { key: 'reels', label: 'Reels' },
  { key: 'business', label: 'Business' },
  { key: 'weddings', label: 'Weddings' },
];

const PLANS = {
  reels: [
    {
      tag: 'Reels',
      name: 'Single Reel',
      tagline: 'One story, shot and cut to hold attention from the first frame.',
      price: '₹3,000',
      unit: '/ reel',
      meta: '1 Final Reel',
      highlight: false,
      features: [
        'iPhone shooting',
        'Professional video editing',
        'Colour grading',
        'Music synchronization',
        '1 final reel',
        'Social-media-ready delivery',
      ],
    },
  ],
  business: [
    {
      tag: 'Business',
      name: 'Starter',
      tagline: 'For brands just beginning to invest in content.',
      price: '₹5,000',
      unit: '',
      meta: '2 Reels',
      highlight: false,
      features: [
        'iPhone shoot',
        '2 edited reels',
        'Colour grading',
        'Music synchronization',
        'Social-media-ready delivery',
      ],
    },
    {
      tag: 'Business',
      name: 'Growth',
      tagline: 'Steady, consistent content to build real momentum.',
      price: '₹10,000',
      unit: '',
      meta: '5 Reels',
      highlight: true,
      badge: 'Most Popular',
      features: [
        'iPhone shoot',
        '5 edited reels',
        'Creative direction',
        'Colour grading',
        'Music synchronization',
        'Social-media-ready delivery',
      ],
    },
    {
      tag: 'Business',
      name: 'Brand',
      tagline: 'Full-scale content for brands ready to lead their space.',
      price: '₹18,000',
      unit: '',
      meta: '10 Reels',
      highlight: false,
      features: [
        'iPhone shoot',
        '10 edited reels',
        'Creative direction',
        'Cinematic editing',
        'Colour grading',
        'Music synchronization',
        'Social-media-ready delivery',
      ],
    },
  ],
  weddings: [
    {
      tag: 'Wedding',
      name: 'Essential',
      tagline: 'A focused, honest record of the day as it happened.',
      price: '₹9,999',
      unit: '',
      meta: '1 Event',
      highlight: false,
      features: [
        'Up to 4 hours coverage',
        'iPhone cinematography',
        '2 edited reels',
        'Couple shots',
        'Candid moments',
        'Colour grading',
        'Digital delivery',
      ],
    },
    {
      tag: 'Wedding',
      name: 'Signature',
      tagline: 'Complete coverage built around your celebration.',
      price: '₹19,999',
      unit: '',
      meta: '2 Events',
      highlight: true,
      badge: 'Most Popular',
      features: [
        'Up to 8 hours coverage',
        'iPhone cinematography',
        '5 edited reels',
        'Couple portraits',
        'Candid moments',
        'Family & friends coverage',
        'Cinematic editing',
        'Colour grading',
        'Digital delivery',
      ],
    },
    {
      tag: 'Wedding',
      name: 'Cinematic',
      tagline: 'Story-driven films for a fuller wedding experience.',
      price: '₹29,999',
      unit: '',
      meta: '3 Events',
      highlight: false,
      features: [
        'Up to 12 hours coverage',
        'iPhone cinematography',
        '8 edited reels',
        'Couple cinematic coverage',
        'Candid moments',
        'Family & friends coverage',
        'Story-driven editing',
        'Premium colour grading',
        'Digital delivery',
      ],
    },
    {
      tag: 'Wedding',
      name: 'Complete',
      tagline: 'End-to-end coverage across every event that matters.',
      price: '₹39,999',
      unit: '',
      meta: '4 Events',
      highlight: false,
      features: [
        'Extended wedding coverage',
        'iPhone cinematography',
        '12 edited reels',
        'Couple-focused cinematic coverage',
        'Candid storytelling',
        'Wedding teaser',
        'Highlight video',
        'Premium colour grading',
        'Social-media-ready content',
      ],
    },
  ],
};

const GRID_COLS = {
  reels: 'md:grid-cols-1 max-w-md mx-auto',
  business: 'md:grid-cols-3',
  weddings: 'md:grid-cols-2 lg:grid-cols-4',
};

function scrollToContact(e) {
  e.preventDefault();
  const el = document.querySelector('#contact');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function PricingCard({ plan, index }) {
  const { tag, name, tagline, price, unit, meta, features, highlight, badge } = plan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
      className={`group relative flex flex-col p-8 transition-colors duration-[250ms] ${
        highlight ? 'bg-[#111113] border-t-2 border-white' : 'bg-[#09090b] hover:bg-[#111113]'
      }`}
    >
      {badge && (
        <span className="absolute top-0 right-0 bg-white text-black font-mono text-[10px] uppercase tracking-widest px-3 py-1.5">
          {badge}
        </span>
      )}

      {/* Category tag */}
      <span className="font-mono uppercase text-[10px] tracking-widest text-zinc-500 mb-5">
        {tag}
      </span>

      {/* Name + tagline */}
      <h3 className="font-bold text-white mb-2" style={{ fontSize: '20px', letterSpacing: '-0.01em' }}>
        {name}
      </h3>
      <p className="font-light text-zinc-400 text-sm leading-relaxed mb-6 min-h-[40px]">
        {tagline}
      </p>

      {/* Price */}
      <div className="flex items-baseline gap-1.5 mb-1">
        <span className="text-4xl font-bold text-white tracking-tight">{price}</span>
        {unit && <span className="text-zinc-500 text-sm font-mono">{unit}</span>}
      </div>
      <p className="font-mono text-xs text-zinc-500 mb-8">{meta}</p>

      {/* Divider */}
      <div className="h-px w-full bg-zinc-800 mb-8" />

      {/* What's included */}
      <p className="font-mono uppercase text-[10px] tracking-widest text-zinc-500 mb-4">
        What&apos;s Included
      </p>
      <ul className="space-y-3 mb-10 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-zinc-300 text-sm font-light">
            <Check size={14} className="text-zinc-500 mt-0.5 shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={scrollToContact}
        className={`w-full py-3.5 text-sm font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
          highlight
            ? 'bg-white text-black border border-white hover:bg-transparent hover:text-white'
            : 'bg-transparent text-white border border-zinc-700 hover:border-white'
        }`}
      >
        Enquire Now
        <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
      </button>
    </motion.div>
  );
}

export default function PricingSection() {
  const [active, setActive] = useState('reels');
  const plans = PLANS[active];

  return (
    <section id="pricing" className="relative z-10 py-32 px-6 md:px-16 lg:px-24 bg-[#09090b]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease }}
          className="mb-14 text-center md:text-left"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-4">— Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Clear Pricing.{' '}
            <span style={{ WebkitTextStroke: '1.5px white', color: 'transparent' }}>
              Consistent Craft.
            </span>
          </h2>
          <p className="text-zinc-400 font-light max-w-xl mx-auto md:mx-0 leading-relaxed">
            Packages built for reels, businesses, and weddings — priced fairly for where Motion Magicx stands today.
          </p>
        </motion.div>

        {/* Category switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
          className="flex justify-center md:justify-start mb-14"
        >
          <div className="inline-flex border border-zinc-800 p-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`relative px-6 py-2.5 text-sm font-mono uppercase tracking-wider z-10 transition-colors duration-300 ${
                  active === cat.key ? 'text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {active === cat.key && (
                  <motion.div
                    layoutId="pricing-tab-bg"
                    className="absolute inset-0 bg-white -z-10"
                    transition={{ type: 'tween', duration: 0.3, ease }}
                  />
                )}
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease }}
            className={`grid grid-cols-1 gap-px bg-[#1c1c1f] ${GRID_COLS[active]}`}
          >
            {plans.map((plan, i) => (
              <PricingCard key={plan.name} plan={plan} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Footnote */}
        <p className="text-zinc-600 text-xs font-mono text-center md:text-left mt-10">
          Custom scopes and larger volumes available on request — just reach out.
        </p>
      </div>
    </section>
  );
}