import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.25, 0.1, 0.25, 1];
const tools = ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Final Cut Pro'];

const ABOUT_IMAGE = '/about.jpg';

export default function AboutSection() {
  return (
    <section id="about" className="relative z-10 py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Left — Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease }}>
          
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-4">About Me</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-8">
            Behind the Lens
          </h2>
          <div className="space-y-5 text-zinc-400 font-light leading-relaxed">
            <p>
              I'm Jagadish, the creator and editor behind Motion Magicx — a Hyderabad-based video content studio. My work is built around a simple idea: powerful visual storytelling doesn't need a film crew — it needs a good eye, an iPhone, and a lot of intention in the edit.
            </p>
            <p>
              Over the years, I've shot and edited content for 100+ satisfied clients across Hyderabad — from personal reels to events and brand stories. Every project gets the same focus: visually engaging, high-quality video that holds attention and leaves an impression.
            </p>
            

            
          </div>

          {/* Tool Chips */}
          <div className="flex flex-wrap gap-3 mt-10">
            {tools.map((tool) =>
            <span
              key={tool}
              className="font-mono text-xs text-zinc-400 border border-zinc-700 px-4 py-2 tracking-wider hover:border-white hover:text-white transition-all duration-300 cursor-default">
              
                {tool}
              </span>
            )}
          </div>
        </motion.div>

        {/* Right — Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease }}
          className="relative">
          
          <div className="aspect-[3/3] max-h-[600px] border border-zinc-700 overflow-hidden group hover:border-white transition-colors duration-500">
            <img
              src={ABOUT_IMAGE}
              alt="Jagadish, founder of Motion Magicx, filming with an iPhone in Hyderabad"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-[0.5] group-hover:brightness-100 transition-all duration-700" />
            
          </div>
        </motion.div>
      </div>
    </section>);

}