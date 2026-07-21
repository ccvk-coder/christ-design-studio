import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useMotionValue, useTransform, AnimatePresence } from "motion/react";
import {
  ArrowRight, ArrowUpRight, Download, Mail, MapPin, Phone, Send,
  Github, Linkedin, Instagram, Facebook, Dribbble, Figma, Sparkles,
  Search, PenTool, Code2, Palette, Smartphone, Accessibility,
  MousePointerClick, ChevronRight, Star, Compass, Layers, Lightbulb,
  Wand2, Rocket, TestTube2, MonitorPlay, Quote, Check,
} from "lucide-react";
import profileAsset from "@/assets/profile.jpg.asset.json";
const profileImg = profileAsset.url;
import heroBg from "@/assets/hero-bg.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

/* -------------------------------------------------------------------------- */
/* Utilities                                                                  */
/* -------------------------------------------------------------------------- */

function useCursorGlow() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);
  return { x, y };
}

function Reveal({ children, delay = 0, y = 24 }: { children: ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const dur = 1600;
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(eased * to));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* -------------------------------------------------------------------------- */
/* Chrome                                                                     */
/* -------------------------------------------------------------------------- */

const NAV = [
  { href: "#about", label: "About" },
  { href: "#expertise", label: "Expertise" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#06B6D4]"
    />
  );
}

function CursorGlow() {
  const { x, y } = useCursorGlow();
  return (
    <motion.div
      aria-hidden
      style={{
        translateX: useTransform(x, (v) => v - 250),
        translateY: useTransform(y, (v) => v - 250),
      }}
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[500px] w-[500px] rounded-full opacity-60 blur-3xl md:block"
    >
      <div className="h-full w-full rounded-full"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.18), rgba(6,182,212,0.06) 40%, transparent 70%)" }} />
    </motion.div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on(); window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className="mx-auto max-w-7xl px-5">
        <nav className={`flex items-center justify-between rounded-2xl border border-white/8 px-4 py-2.5 transition-all duration-500
          ${scrolled ? "bg-black/60 backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)]" : "bg-white/[0.02] backdrop-blur-md"}`}>
          <a href="#top" className="group flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] text-white shadow-[0_6px_20px_-6px_rgba(37,99,235,0.6)]">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-display text-[15px] font-semibold tracking-tight text-white">
              Christ<span className="text-[#A1A1AA]">.Design</span>
            </span>
          </a>
          <ul className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-[#A1A1AA] transition-colors hover:bg-white/5 hover:text-white">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a href="#contact" className="hidden items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-[13px] font-semibold text-black transition-transform hover:scale-[1.03] sm:inline-flex">
              Let's talk <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <button onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-white md:hidden">
              <span className="text-lg leading-none">{open ? "×" : "≡"}</span>
            </button>
          </div>
        </nav>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="mt-2 overflow-hidden rounded-2xl border border-white/8 bg-black/80 p-2 backdrop-blur-xl md:hidden">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm text-[#A1A1AA] hover:bg-white/5 hover:text-white">
                  {n.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 md:pt-40">
      {/* Background layers */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,#09090B_70%)]" />
        <div className="absolute -left-24 top-40 h-[420px] w-[420px] rounded-full bg-[#2563EB]/30 blur-[120px] animate-float-slow" />
        <div className="absolute right-0 top-24 h-[380px] w-[380px] rounded-full bg-[#4F46E5]/25 blur-[120px] animate-float-slower" />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[#06B6D4]/15 blur-[140px]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      </div>

      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-[#A1A1AA] backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for Freelance Projects · 2026
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mx-auto mt-8 max-w-5xl text-center font-display text-[42px] font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl lg:text-[88px]">
            Designing Digital <br />
            Experiences That&nbsp; <br />
            <span className="text-gradient italic">People Love.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-7 max-w-2xl text-center text-[15px] leading-relaxed text-[#A1A1AA] md:text-[17px]">
            UX/UI Designer & Frontend Developer passionate about crafting intuitive digital
            products that combine beautiful design with exceptional user experiences.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href="#work" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.03]">
              <span className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,transparent,rgba(37,99,235,0.4),transparent)] bg-[length:200%_100%] opacity-0 transition-opacity duration-500 group-hover:animate-[shimmer_1.5s_linear_infinite] group-hover:opacity-100" />
              View Projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="#contact" className="gradient-border inline-flex items-center gap-2 rounded-2xl bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/[0.06]">
              Contact Me <MousePointerClick className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        {/* Hero glass card */}
        <Reveal delay={0.4} y={40}>
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="glass-card gradient-border relative overflow-hidden p-6 sm:p-8">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 sm:flex sm:justify-between">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#4F46E5] shadow-[0_10px_40px_-10px_rgba(37,99,235,0.7)]">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-display text-lg font-semibold text-white">Christ Design Studio</p>
                    <p className="text-sm text-[#A1A1AA]">Digital product design & development, 2016 → today</p>
                  </div>
                </div>
                <div className="hidden items-center gap-4 sm:flex">
                  {[
                    { href: "#", icon: Linkedin, label: "LinkedIn" },
                    { href: "#", icon: Dribbble, label: "Dribbble" },
                    { href: "#", icon: Github, label: "GitHub" },
                    { href: "#", icon: Figma, label: "Figma" },
                  ].map((s) => (
                    <a key={s.label} href={s.href} aria-label={s.label}
                      className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-[#A1A1AA] transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:text-white">
                      <s.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/8 pt-6 text-center">
                {[
                  { k: "Countries", v: "18+" },
                  { k: "Team", v: "Freelance" },
                  { k: "Response", v: "< 24h" },
                ].map((m) => (
                  <div key={m.k}>
                    <p className="font-display text-xl font-semibold text-white sm:text-2xl">{m.v}</p>
                    <p className="text-[11px] uppercase tracking-widest text-[#A1A1AA]">{m.k}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Marquee trust */}
        <div className="mt-20 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max animate-marquee gap-14 whitespace-nowrap text-[13px] uppercase tracking-[0.25em] text-[#52525B]">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-14">
                {["Awwwards", "Behance", "Dribbble", "CSS Design", "Figma Community", "Product Hunt", "Muzli", "Site Inspire"].map((b) => (
                  <span key={b + i}>{b}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section shell                                                              */
/* -------------------------------------------------------------------------- */

function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#A1A1AA]">
          <span className="h-1 w-1 rounded-full bg-[#06B6D4]" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-[15px] leading-relaxed text-[#A1A1AA]">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* About                                                                      */
/* -------------------------------------------------------------------------- */

function About() {
  const stats = [
    { label: "Years Experience", value: 3, suffix: "+" },
    { label: "Projects Completed", value: 30, suffix: "+" },
    { label: "Happy Clients", value: 60, suffix: "+" },
    { label: "Design Systems Built", value: 14, suffix: "" },
  ];
  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          {/* Photo */}
          <Reveal>
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-[#2563EB]/40 via-[#4F46E5]/20 to-[#06B6D4]/30 blur-2xl" />
              <div className="gradient-border relative overflow-hidden rounded-[1.75rem] bg-[#18181B]">
                <img
                  src={me-profile.jpg}
                  alt="Portrait of Christ, UX/UI Designer & Frontend Developer"
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <div>
                    <p className="font-display text-lg font-semibold text-white">Christ</p>
                    <p className="text-xs text-[#A1A1AA]">Design Lead · Freelance</p>
                  </div>
                  <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
                    v.2026
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#A1A1AA]">
                <span className="h-1 w-1 rounded-full bg-[#06B6D4]" />About Me
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-[44px] md:leading-[1.1]">
                Turning complex problems into <span className="text-gradient">clean, elegant, functional</span> interfaces.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[#A1A1AA]">
                <p>
                  Hello, I'm <span className="text-white">Christ</span>, a passionate UX/UI Designer and Frontend
                  Developer who specializes in creating intuitive, user-centered digital experiences. I enjoy
                  transforming complex problems into clean, elegant, and functional interfaces.
                </p>
                <p>
                  From user research and wireframing to high-fidelity designs and responsive frontend development,
                  I focus on delivering products that are both visually appealing and highly usable.
                </p>
                <p>
                  My philosophy centers on <span className="text-white">simplicity, accessibility, consistency</span>, and
                  meaningful user interactions — every project is driven by research, empathy, and attention to detail.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="/cv.pdf" className="group inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.03]">
                  <Download className="h-4 w-4" /> Download CV
                </a>
                <a href="#work" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.06]">
                  See selected work <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="glass-card group relative overflow-hidden p-6 transition-transform hover:-translate-y-1">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#2563EB]/20 blur-2xl transition-opacity group-hover:opacity-100" />
                <p className="font-display text-3xl font-semibold text-white md:text-4xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-[13px] text-[#A1A1AA]">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Expertise                                                                  */
/* -------------------------------------------------------------------------- */

const EXPERTISE = [
  {
    icon: Search, title: "UX Research",
    desc: "Understanding people through interviews, personas, and journey mapping.",
    tags: ["User Interviews", "Personas", "Journey Mapping"],
  },
  {
    icon: PenTool, title: "UI Design",
    desc: "Crafting refined interfaces, systems, and prototypes that scale.",
    tags: ["Wireframing", "Design Systems", "Prototyping", "Components"],
  },
  {
    icon: Code2, title: "Frontend Development",
    desc: "Shipping fast, accessible, pixel-precise interfaces to production.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    icon: Palette, title: "Brand Identity",
    desc: "Building cohesive visual systems that make brands unforgettable.",
    tags: ["Logo Design", "Style Guides", "Visual Systems"],
  },
  {
    icon: Smartphone, title: "Responsive Design",
    desc: "Fluid, mobile-first layouts that feel native on every screen.",
    tags: ["Mobile", "Tablet", "Desktop"],
  },
  {
    icon: Accessibility, title: "Accessibility & IxD",
    desc: "WCAG-compliant experiences and thoughtful micro-interactions.",
    tags: ["WCAG 2.2", "Motion", "Keyboard"],
  },
];

function Expertise() {
  return (
    <section id="expertise" className="relative py-28 md:py-36">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.15),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          eyebrow="Expertise"
          title={<>What I do <span className="text-gradient">exceptionally well</span></>}
          sub="A tight, opinionated skill set built over eight years designing and shipping digital products."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {EXPERTISE.map((e, i) => (
            <Reveal key={e.title} delay={(i % 3) * 0.05}>
              <article className="glass-card group relative h-full overflow-hidden p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/20">
                <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(37,99,235,0.18), transparent 40%)" }} />
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.02] text-white ring-1 ring-white/10">
                  <e.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-semibold text-white">{e.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#A1A1AA]">{e.desc}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {e.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-[#A1A1AA]">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Projects                                                                   */
/* -------------------------------------------------------------------------- */

const PROJECTS = [
  {
    img: p1, category: "SaaS · Enterprise", title: "Employee Engagement Platform",
    desc: "Modern enterprise platform for communication, rewards, recognition, events, surveys and analytics.",
    role: "Lead Product Designer", tools: ["Figma", "React", "Tailwind"], duration: "5 months",
  },
  {
    img: p2, category: "HR · Web App", title: "HR Information System",
    desc: "Comprehensive HR suite covering recruitment, employees, attendance, payroll and performance.",
    role: "UX/UI + Frontend", tools: ["Figma", "Next.js", "TypeScript"], duration: "7 months",
  },
  {
    img: p3, category: "Fitness · Dashboard", title: "Gym Management System",
    desc: "Complete fitness platform with POS, memberships, inventory, trainer scheduling and analytics.",
    role: "Product Designer", tools: ["Figma", "React", "Recharts"], duration: "4 months",
  },
  {
    img: p4, category: "Corporate · Website", title: "Roofing Services Website",
    desc: "Modern corporate site with online quotations, service showcase, responsive layouts and SEO.",
    role: "Design + Development", tools: ["Figma", "Next.js", "Sanity"], duration: "6 weeks",
  },
  {
    img: p5, category: "Travel · E-commerce", title: "Travel Agency Website",
    desc: "Premium travel booking with destination galleries, booking forms, featured packages and reviews.",
    role: "UX/UI Designer", tools: ["Figma", "Framer", "React"], duration: "3 months",
  },
  {
    img: p6, category: "Analytics · Dashboard", title: "CRM Dashboard",
    desc: "Modern analytics dashboard: reports, customer management, sales tracking and BI visualizations.",
    role: "Design Lead", tools: ["Figma", "React", "D3"], duration: "5 months",
  },
];

function ProjectCard({ p, index }: { p: (typeof PROJECTS)[number]; index: number }) {
  return (
    <Reveal delay={(index % 2) * 0.05}>
      <article className="glass-card group relative overflow-hidden">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={p.img} alt={p.title} loading="lazy" width={1280} height={960}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/20 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
            {p.category}
          </span>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-xl font-semibold text-white transition-colors group-hover:text-white sm:text-2xl">
              {p.title}
            </h3>
            <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[#A1A1AA] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
          </div>
          <p className="mt-2 text-[14px] leading-relaxed text-[#A1A1AA]">{p.desc}</p>

          <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-white/8 pt-5 text-[12px]">
            <div>
              <dt className="uppercase tracking-widest text-[#52525B]">Role</dt>
              <dd className="mt-1 text-white">{p.role}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-widest text-[#52525B]">Duration</dt>
              <dd className="mt-1 text-white">{p.duration}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-widest text-[#52525B]">Tools</dt>
              <dd className="mt-1 text-white">{p.tools.join(" · ")}</dd>
            </div>
          </dl>

          <div className="mt-6 flex items-center gap-2">
            <a href="#" className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-[13px] font-semibold text-black transition-transform hover:scale-[1.03]">
              View Case Study <ChevronRight className="h-3.5 w-3.5" />
            </a>
            <a href="#" className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.06]">
              Live Preview <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="work" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#A1A1AA]">
                <span className="h-1 w-1 rounded-full bg-[#06B6D4]" /> Selected Work
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                Featured <span className="text-gradient">projects</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-[15px] leading-relaxed text-[#A1A1AA]">
                A curated set of case studies covering enterprise SaaS, dashboards, corporate sites,
                and marketing experiences — each built on research, systems, and craft.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <a href="#" className="group inline-flex items-center gap-2 text-sm font-semibold text-white">
              View archive
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} index={i} />)}
        </div>

        {/* Case study anatomy */}
        <Reveal>
          <div className="mt-16 glass-card grid gap-6 p-8 md:grid-cols-6">
            {[
              { k: "Problem", v: "Frame the challenge." },
              { k: "Research", v: "Interviews & synthesis." },
              { k: "Wireframes", v: "Structure & flow." },
              { k: "Hi-Fi Design", v: "Craft & polish." },
              { k: "Solution", v: "Product decisions." },
              { k: "Outcome", v: "Measurable impact." },
            ].map((c) => (
              <div key={c.k} className="border-l border-white/10 pl-4 md:border-l md:pl-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#06B6D4]">{c.k}</p>
                <p className="mt-1.5 text-sm text-white">{c.v}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Process                                                                    */
/* -------------------------------------------------------------------------- */

const STEPS = [
  { icon: Compass, title: "Discover", desc: "Align on goals, users, business context." },
  { icon: Search, title: "Research", desc: "Interviews, competitive audit, insights." },
  { icon: Layers, title: "Wireframe", desc: "Structure, IA, flows, low-fi mocks." },
  { icon: Lightbulb, title: "Prototype", desc: "Interactive prototypes to validate ideas." },
  { icon: Wand2, title: "Visual Design", desc: "High-fidelity UI, systems, motion." },
  { icon: TestTube2, title: "Testing", desc: "Usability testing & iteration loops." },
  { icon: Code2, title: "Development", desc: "Frontend build, integration, QA." },
  { icon: Rocket, title: "Launch", desc: "Ship, measure, iterate, scale." },
];

function Process() {
  return (
    <section id="process" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          eyebrow="Design Process"
          title={<>A repeatable process that <span className="text-gradient">ships great products</span></>}
          sub="Eight steps, tuned across dozens of engagements, from early discovery to post-launch iteration."
        />
        <div className="relative mt-16">
          <div aria-hidden className="absolute inset-x-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={(i % 4) * 0.05}>
                <div className="glass-card group relative h-full p-6 transition-transform hover:-translate-y-1">
                  <div className="absolute -top-3 right-4 rounded-full border border-white/10 bg-black/60 px-2 py-0.5 text-[10px] font-mono text-[#A1A1AA] backdrop-blur">
                    0{i + 1}
                  </div>
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#2563EB]/30 to-[#06B6D4]/20 text-white ring-1 ring-white/10">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#A1A1AA]">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Tools                                                                      */
/* -------------------------------------------------------------------------- */

const TOOLS = [
  "Figma", "Framer", "Adobe XD", "Photoshop", "Illustrator",
  "React", "Next.js", "Tailwind", "TypeScript", "JavaScript",
  "HTML5", "CSS3", "Git", "GitHub", "VS Code",
  "Notion", "Jira", "Miro", "Maze", "FigJam",
];

function Tools() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          eyebrow="Tools & Technologies"
          title={<>The <span className="text-gradient">stack</span> I design and build with</>}
        />
        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {TOOLS.map((t, i) => (
            <Reveal key={t} delay={(i % 5) * 0.03}>
              <div className="glass-card group flex items-center gap-3 p-4 transition-all hover:-translate-y-0.5 hover:border-white/20">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-white/10 to-white/[0.02] text-white ring-1 ring-white/10">
                  <span className="font-display text-sm font-semibold">{t[0]}</span>
                </div>
                <span className="text-[14px] font-medium text-white">{t}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Testimonials                                                               */
/* -------------------------------------------------------------------------- */

const TESTIMONIALS = [
  {
    quote: "Christ raised our product quality bar overnight. His systems thinking gave the team a shared language and cut design debt in half.",
    name: "MChen", role: "VP Product, Northwind SaaS",
  },
  {
    quote: "Rare combination of taste, rigor and shipping ability. He designed and coded the entire dashboard in six weeks — pixel-perfect.",
    name: "Mark Harvey", role: "CTO, Halcyon Analytics",
  },
  {
    quote: "The research phase alone was worth twice the fee. He surfaced problems we didn't know we had and turned them into product wins.",
    name: "Wacky Hojilla", role: "Head of Design, Fable Health",
  },
  {
    quote: "Calm, thoughtful, incredibly responsive. Working with Christ feels like adding a senior partner, not a contractor.",
    name: "Jonas Weber", role: "Founder, Studio Kernel",
  },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);
  const active = TESTIMONIALS[i];
  return (
    <section className="relative py-28 md:py-36">
      <div aria-hidden className="absolute inset-x-0 top-1/3 -z-10 h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.18),transparent_60%)]" />
      <div className="mx-auto max-w-5xl px-5">
        <SectionTitle
          eyebrow="Kind Words"
          title={<>Trusted by <span className="text-gradient">design-forward teams</span></>}
        />

        <Reveal>
          <div className="glass-card mt-14 relative overflow-hidden p-8 sm:p-12">
            <Quote className="absolute right-6 top-6 h-16 w-16 text-white/[0.04]" />
            <AnimatePresence mode="wait">
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                <div className="flex gap-1 text-[#06B6D4]">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-6 font-display text-2xl leading-[1.35] tracking-tight text-white sm:text-3xl md:text-[32px]">
                  &ldquo;{active.quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center justify-between">
                  <div>
                    <p className="font-display text-base font-semibold text-white">{active.name}</p>
                    <p className="text-sm text-[#A1A1AA]">{active.role}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {TESTIMONIALS.map((_, k) => (
                      <button key={k} onClick={() => setI(k)} aria-label={`Testimonial ${k + 1}`}
                        className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-white" : "w-2 bg-white/20 hover:bg-white/40"}`} />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Contact                                                                    */
/* -------------------------------------------------------------------------- */

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Available for Freelance Projects
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.05]">
                Let's build something <span className="text-gradient">amazing</span> together.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#A1A1AA]">
                Have a product idea, a redesign, or a whole platform? I'd love to hear about it —
                expect a personal reply within 24 hours.
              </p>
            </Reveal>

            <div className="mt-10 space-y-4">
              {[
                { icon: Mail, k: "Email", v: "cv@asuratechsolutions.com" },
                { icon: Phone, k: "Phone", v: "+63 (960) 683-0934" },
                { icon: MapPin, k: "Location", v: "Remote · Available worldwide" },
              ].map((c, i) => (
                <Reveal key={c.k} delay={0.05 * i}>
                  <div className="flex items-center gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-white">
                      <c.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-widest text-[#52525B]">{c.k}</p>
                      <p className="truncate text-[15px] text-white">{c.v}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center gap-2">
                {[
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: Dribbble, label: "Dribbble" },
                  { icon: Figma, label: "Behance" },
                  { icon: Github, label: "GitHub" },
                  { icon: Facebook, label: "Facebook" },
                  { icon: Instagram, label: "Instagram" },
                  { icon: Mail, label: "Email" },
                ].map((s) => (
                  <a key={s.label} href="#" aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-[#A1A1AA] transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:text-white">
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right form */}
          <Reveal y={40}>
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3200); }}
              className="glass-card gradient-border relative overflow-hidden p-6 sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" placeholder="Your name" />
                <Field label="Email" name="email" type="email" placeholder="you@company.com" />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Phone" name="phone" placeholder="+1 555 010 2026" />
                <Field label="Location" name="location" placeholder="City, Country" />
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-[12px] font-medium text-[#A1A1AA]">Message</label>
                <textarea rows={5} placeholder="Tell me about your project…"
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-[14px] text-white placeholder:text-[#52525B] focus:border-[#2563EB]/50 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20" />
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="text-[12px] text-[#52525B]">By sending, you agree to be contacted about your inquiry.</p>
                <button type="submit"
                  className="group inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.03]">
                  {sent ? (<><Check className="h-4 w-4" /> Sent</>) : (<>Send Message <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>)}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-[12px] font-medium text-[#A1A1AA]">{label}</label>
      <input id={name} name={name} type={type} placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-[14px] text-white placeholder:text-[#52525B] focus:border-[#2563EB]/50 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="relative border-t border-white/8 py-14">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] text-white">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="font-display text-base font-semibold text-white">Christ Design</span>
            </a>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-[#A1A1AA]">
              Creating meaningful digital experiences through thoughtful design and innovative technology.
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-[#52525B]">Quick Links</p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-[14px]">
              {[
                { href: "#top", label: "Home" },
                { href: "#about", label: "About" },
                { href: "#work", label: "Projects" },
                { href: "#expertise", label: "Services" },
                { href: "#process", label: "Process" },
                { href: "#contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[#A1A1AA] transition-colors hover:text-white">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-[#52525B]">Elsewhere</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Dribbble, label: "Dribbble" },
                { icon: Github, label: "GitHub" },
                { icon: Instagram, label: "Instagram" },
                { icon: Figma, label: "Behance" },
                { icon: MonitorPlay, label: "Framer" },
              ].map((s) => (
                <a key={s.label} href="#" aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-[#A1A1AA] transition-all hover:-translate-y-0.5 hover:border-white/20 hover:text-white">
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/8 pt-6 text-[12px] text-[#52525B] sm:flex-row sm:items-center">
          <p>© 2026 Christ Design. All Rights Reserved.</p>
          <p className="italic">Designed & Developed by Christ Design.</p>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#09090B] text-white">
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Process />
        <Tools />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
