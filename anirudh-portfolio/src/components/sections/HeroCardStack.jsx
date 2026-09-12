import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

/**
 * Card data — maps directly to the four cinematic images already saved in
 * /public. Swap the `img` paths below if your actual filenames/extensions
 * differ (e.g. .png / .webp instead of .jpg).
 */
export const HERO_CARDS = [
  {
    id: 1,
    img: "/img1.jpg",
    index: "01",
    value: "50+",
    label: ["PROJECTS", "DELIVERED"],
    rotate: -3,
    top: "0%",
    right: "0%",
    width: "94%",
    h: "27%",
    z: 10,
    parallax: 8,
    entranceDelay: 0.25,
    floatDuration: 8,
  },
  {
    id: 2,
    img: "/img2.jpg",
    index: "02",
    value: "3+",
    label: ["YEARS", "EXPERIENCE"],
    rotate: 2.5,
    top: "21%",
    left: "0%",
    width: "100%",
    h: "27%",
    z: 20,
    parallax: 13,
    entranceDelay: 0.4,
    floatDuration: 9,
  },
  {
    id: 3,
    img: "/img3.jpg",
    index: "03",
    value: "100%",
    label: ["PASSION", "DRIVEN"],
    rotate: -2,
    top: "42%",
    right: "3%",
    width: "92%",
    h: "27%",
    z: 30,
    parallax: 18,
    entranceDelay: 0.55,
    floatDuration: 7.5,
  },
  {
    id: 4,
    img: "/img4.jpg",
    index: "04",
    value: "∞",
    label: ["STORIES", "TO TELL"],
    rotate: 2,
    top: "63%",
    left: "4%",
    width: "88%",
    h: "27%",
    z: 40,
    parallax: 23,
    entranceDelay: 0.7,
    floatDuration: 10,
  },
];

/** Visual content shared by the desktop and mobile compositions. */
function StatCardFace({ data, imgError, onImgError }) {
  return (
    <div
      className="group relative w-full h-full flex overflow-hidden border border-white/10 transition-colors duration-300 hover:border-white/20"
      style={{
        borderRadius: 16,
        background: "#0c0c0d",
        boxShadow: "0 25px 60px -25px rgba(0,0,0,0.65)",
      }}
    >
      {/* subtle warm top highlight */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,222,179,0.35), transparent)",
        }}
        aria-hidden="true"
      />

      {/* image pane */}
      <div className="relative h-full overflow-hidden" style={{ width: "58%" }}>
        {!imgError ? (
          <img
            src={data.img}
            alt=""
            draggable={false}
            onError={onImgError}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.04] group-hover:brightness-110"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center px-2 text-center font-mono text-[9px] tracking-widest text-zinc-600"
            style={{ background: "linear-gradient(135deg, #18181b, #0c0c0e)" }}
          >
            add {data.img.replace("/", "")} to /public
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.45) 65%, #0c0c0d 100%)",
          }}
        />
        <span className="absolute top-3 left-3 md:top-4 md:left-4 font-mono text-[10px] md:text-[11px] tracking-widest text-zinc-300/60">
          {data.index}
        </span>
      </div>

      {/* stat pane */}
      <div
        className="relative flex flex-col justify-end p-3.5 md:p-5"
        style={{ width: "42%", background: "#0c0c0d" }}
      >
        <div className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-none mb-2 md:mb-3">
          {data.value}
        </div>
        <div className="flex items-end justify-between gap-2">
          <div className="font-mono text-[9px] md:text-[10px] tracking-[0.15em] text-zinc-400 uppercase leading-[1.3]">
            {data.label.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </div>
          <div
            className="shrink-0 flex items-center justify-center border border-white/25 text-white/80 transition-all duration-300 group-hover:border-white/45 group-hover:translate-x-0.5"
            style={{ width: 26, height: 26, borderRadius: 9999 }}
          >
            <ArrowRight size={12} strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Single absolutely-positioned card for the desktop composition. */
function DesktopCard({ data, mvX, mvY, reduceMotion }) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const px = useTransform(mvX, (v) => v * data.parallax);
  const py = useTransform(mvY, (v) => v * data.parallax * 0.6);

  return (
    <div
      className="absolute"
      style={{
        top: data.top,
        left: data.left,
        right: data.right,
        width: data.width,
        height: data.h,
        zIndex: hovered ? 999 : data.z,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* parallax layer */}
      <motion.div
        style={{ x: reduceMotion ? 0 : px, y: reduceMotion ? 0 : py, width: "100%", height: "100%" }}
      >
        {/* entrance layer */}
        <motion.div
          initial={{ opacity: 0, x: 70, rotate: data.rotate }}
          whileInView={{ opacity: 1, x: 0, rotate: data.rotate }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: data.entranceDelay, ease }}
          style={{ width: "100%", height: "100%" }}
        >
          {/* idle float layer */}
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
            transition={{
              duration: data.floatDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: data.entranceDelay + 1,
            }}
            style={{ width: "100%", height: "100%" }}
          >
            {/* hover layer */}
            <motion.div
              whileHover={{ scale: 1.025 }}
              transition={{ duration: 0.35, ease }}
              className="relative"
              style={{ width: "100%", height: "100%" }}
            >
              <StatCardFace data={data} imgError={imgError} onImgError={() => setImgError(true)} />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/** Right-side desktop composition — staggered, overlapping, parallax + float. */
function DesktopCardStack() {
  const wrapRef = useRef(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    if (reduceMotion || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    mvX.set((e.clientX - rect.left) / rect.width - 0.5);
    mvY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mvX.set(0);
    mvY.set(0);
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative hidden lg:block shrink-0"
      style={{ width: "clamp(420px, 40vw, 600px)", height: "clamp(520px, 68vh, 700px)" }}
    >
      {HERO_CARDS.map((card) => (
        <DesktopCard key={card.id} data={card} mvX={mvX} mvY={mvY} reduceMotion={reduceMotion} />
      ))}
    </div>
  );
}

/** Simple, lightweight vertical stack for tablet/mobile. */
function MobileCard({ data, i }) {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: i * 0.1, ease }}
      className="relative w-full"
      style={{ height: 128 }}
    >
      <StatCardFace data={data} imgError={imgError} onImgError={() => setImgError(true)} />
    </motion.div>
  );
}

function MobileCardStack() {
  return (
    <div className="hidden flex-col gap-4 w-full mt-4 mb-2">
      {HERO_CARDS.map((card, i) => (
        <MobileCard key={card.id} data={card} i={i} />
      ))}
    </div>
  );
}

/** Public entry point — renders the right composition (desktop) and the
 * stacked composition (mobile/tablet); only one is ever visible at a time.
 * The mobile/tablet composition is intentionally hidden at all breakpoints
 * (see MobileCardStack) so the Hero cards only ever appear on desktop. */
export default function HeroCardComposition() {
  return (
    <>
      <DesktopCardStack />
      <MobileCardStack />
    </>
  );
}