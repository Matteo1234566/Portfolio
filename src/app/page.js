"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const root = useRef(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // 🔥 Dichiaro ctx prima di tutto
        const ctx = gsap.context(() => {
            gsap.set([".reveal", ".card", ".footer-link"], { autoAlpha: 0, y: 24 });
            gsap.set(".orb", { scale: 0.9, yPercent: -10, xPercent: -10, willChange: "transform, filter" });

            if (!reduce) {
                const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
                tl.fromTo(".bg-grid", { opacity: 0 }, { opacity: 1, duration: 0.6 })
                    .from(".logo", { y: 20, opacity: 0, duration: 0.6 }, "-=0.2")
                    .from(".headline span", { yPercent: 120, stagger: 0.05, duration: 0.6 }, "-=0.2")
                    .from(".subline", { y: 14, opacity: 0, duration: 0.5 }, "-=0.2")
                    .from(".cta .magnet", { opacity: 0, scale: 0.9, stagger: 0.08, duration: 0.5 }, "-=0.2")
                    .to(".orb", { scale: 1, duration: 0.6, ease: "power2.out" }, "-=0.4");
            } else {
                gsap.set([".reveal", ".card", ".footer-link", ".orb"], { autoAlpha: 1, y: 0, scale: 1 });
            }

            // 🎯 Parallax
            if (!reduce) {
                const parallaxEls = gsap.utils.toArray("[data-speed]");
                const onMove = (e) => {
                    const { innerWidth, innerHeight } = window;
                    const x = (e.clientX / innerWidth - 0.5) * 2;
                    const y = (e.clientY / innerHeight - 0.5) * 2;
                    parallaxEls.forEach((el) => {
                        const speed = parseFloat(el.getAttribute("data-speed") || "0.1");
                        gsap.to(el, { x: x * 20 * speed, y: y * 20 * speed, duration: 0.6, overwrite: true });
                    });
                };
                window.addEventListener("mousemove", onMove);
                // 👇 cleanup nel return del context
                return () => window.removeEventListener("mousemove", onMove);
            }

            // 🎯 Magnetic buttons
            if (!reduce) {
                document.querySelectorAll(".magnet").forEach((btn) => {
                    const strength = 18;
                    const onMouseMove = (e) => {
                        const rect = btn.getBoundingClientRect();
                        const x = e.clientX - (rect.left + rect.width / 2);
                        const y = e.clientY - (rect.top + rect.height / 2);
                        gsap.to(btn, { x: x / strength, y: y / strength, duration: 0.3, ease: "power2.out" });
                    };
                    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: "power3.out" });
                    btn.addEventListener("mousemove", onMouseMove);
                    btn.addEventListener("mouseleave", onLeave);
                    // cleanup
                    ctx.add(() => {
                        btn.removeEventListener("mousemove", onMouseMove);
                        btn.removeEventListener("mouseleave", onLeave);
                    });
                });
            }

            // 🎯 Reveal
            gsap.utils.toArray(".section").forEach((sec) => {
                gsap.fromTo(
                    sec.querySelectorAll(".reveal"),
                    { autoAlpha: 0, y: 24 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        stagger: 0.06,
                        duration: 0.6,
                        ease: "power3.out",
                        scrollTrigger: { trigger: sec, start: "top 75%", once: true },
                    }
                );
            });

            gsap.utils.toArray(".card").forEach((card) => {
                gsap.from(card, {
                    y: 26,
                    autoAlpha: 0,
                    duration: 0.5,
                    ease: "power3.out",
                    scrollTrigger: { trigger: card, start: "top 85%", once: true },
                });
            });

            gsap.from(".footer-link", {
                y: 10,
                autoAlpha: 0,
                duration: 0.4,
                stagger: 0.05,
                scrollTrigger: { trigger: "footer", start: "top 95%", once: true },
            });

            if (!reduce) {
                gsap.to(".orb", {
                    yPercent: "+=10",
                    xPercent: "+=6",
                    yoyo: true,
                    repeat: -1,
                    duration: 6,
                    ease: "sine.inOut",
                });
                gsap.to(".orb", {
                    filter: "blur(8px)",
                    yoyo: true,
                    repeat: -1,
                    duration: 5,
                    ease: "sine.inOut",
                });
            }
        }, root);

        // ✅ Cleanup
        return () => ctx.revert();
    }, []);

    return (
        <div ref={root} className="relative min-h-screen overflow-x-clip bg-background text-foreground">
            {/* background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="bg-grid absolute inset-0 [background-image:radial-gradient(hsl(var(--foreground)/0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="orb absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] opacity-30 blur-2xl" data-speed="0.25" />
                <div className="orb absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-[#22c55e] to-[#3b82f6] opacity-25 blur-2xl" data-speed="0.18" />
            </div>

            {/* hero */}
            <main className="relative mx-auto max-w-6xl px-6 pt-28 pb-16 sm:pt-32">
                <div className="logo reveal flex items-center gap-3">
                    <Image src="/next.svg" alt="Next.js" width={160} height={34} className="dark:invert" priority />
                    <span className="text-sm opacity-70">+ GSAP</span>
                </div>

                <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-6xl headline">
                    {["Make", "it", "move", "—", "with", "style."].map((w, i) => (
                        <span key={i} className="inline-block overflow-hidden align-bottom">
              <span className="inline-block">{w}&nbsp;</span>
            </span>
                    ))}
                </h1>

                <p className="subline mt-4 max-w-2xl text-base opacity-80 sm:text-lg">
                    Next.js + Tailwind + GSAP: intro timeline, parallax, magnetic CTAs e reveal on-scroll.
                </p>

                <div className="cta mt-8 flex flex-col items-start gap-3 sm:flex-row">
                    <a
                        className="magnet rounded-full border border-foreground/20 px-5 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-foreground hover:text-background"
                        href="https://greensock.com/docs/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GSAP Docs →
                    </a>
                    <a
                        className="magnet rounded-full border border-foreground/10 px-5 py-3 text-sm font-medium opacity-90 hover:opacity-100"
                        href="https://nextjs.org/docs"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Next.js Docs
                    </a>
                </div>
            </main>
        </div>
    );
}
