'use client'

import React, { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { motion } from 'framer-motion'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import * as Accordion from '@radix-ui/react-accordion'
import { Github, Linkedin, Mail, ExternalLink, Rocket, Sparkles, Cpu, Code2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'


export default function PortfolioLanding() {
    return (
        <div className="min-h-screen w-full text-white bg-black selection:bg-white/20 selection:text-white">
            <TopNav />
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
            <Footer />
        </div>
    )
}

/*********************** NAV ************************/
function TopNav() {
    return (
        <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
            <NavigationMenu.Root className="rounded-full bg-white/10 backdrop-blur border border-white/10 shadow-xl">
                <NavigationMenu.List className="flex items-center px-4 py-2 gap-2">
                    <a href="#about" className="px-3 py-1 text-sm hover:text-teal-300 transition">About</a>
                    <a href="#projects" className="px-3 py-1 text-sm hover:text-teal-300 transition">Projects</a>
                    <a href="#skills" className="px-3 py-1 text-sm hover:text-teal-300 transition">Skills</a>
                    <a href="#contact" className="px-3 py-1 text-sm hover:text-teal-300 transition">Contact</a>
                    <div className="mx-2 h-5 w-px bg-white/20" />
                    <a href="https://github.com" target="_blank" className="p-1 rounded hover:bg-white/10"><Github size={18} /></a>
                    <a href="https://linkedin.com" target="_blank" className="p-1 rounded hover:bg-white/10"><Linkedin size={18} /></a>
                </NavigationMenu.List>
            </NavigationMenu.Root>
        </div>
    )
}

/*********************** HERO ************************/
function Hero() {
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
            .fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
    }, [])

    return (
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
            <BackgroundThree />
            <div className="relative z-10 max-w-4xl text-center px-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur text-xs tracking-widest uppercase mb-6">
                    <Sparkles size={14} /> crafted with GSAP · Three.js · Framer
                </div>
                <h1 ref={titleRef} className="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight">
                    Ciao, sono <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-blue-300 to-purple-300">Riccardo</span>.<br />
                    Costruisco esperienze web dinamiche.
                </h1>
                <p ref={subtitleRef} className="mt-5 text-white/70 max-w-2xl mx-auto">
                    Portfolio interattivo con canvas 3D, transizioni morbide e una UI pulita. Scrolla in basso per scoprire progetti e competenze.
                </p>
                <div className="mt-8 flex items-center gap-3 justify-center">
                    <Button asChild className="rounded-full">
                        <a href="#projects"><Rocket className="mr-2 h-4 w-4" /> Guarda i progetti</a>
                    </Button>
                    <a href="#contact" className="btn btn-outline rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white/10">Contattami</a>
                </div>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
        </section>
    )
}

/*********************** THREE.JS BACKGROUND ************************/
function BackgroundThree() {
    const canvasRef = useRef(null)
    const resizeRef = useRef()
    const rafRef = useRef()

    useEffect(() => {
        const canvas = canvasRef.current
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100)
        camera.position.z = 4

        const onResize = () => {
            const w = canvas.clientWidth
            const h = canvas.clientHeight
            const dpr = Math.min(2, window.devicePixelRatio)
            renderer.setSize(w, h, false)
            renderer.setPixelRatio(dpr)
            camera.aspect = w / h
            camera.updateProjectionMatrix()
        }

        // Particles
        const count = 1500
        const positions = new Float32Array(count * 3)
        for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 8
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        const material = new THREE.PointsMaterial({ size: 0.02, color: 0x88ccff, transparent: true, opacity: 0.75 })
        const points = new THREE.Points(geometry, material)
        scene.add(points)

        const clock = new THREE.Clock()
        const animate = () => {
            rafRef.current = requestAnimationFrame(animate)
            const t = clock.getElapsedTime()
            points.rotation.y = t * 0.05
            points.rotation.x = Math.sin(t * 0.2) * 0.1
            renderer.render(scene, camera)
        }

        resizeRef.current = onResize
        onResize()
        animate()

        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
            cancelAnimationFrame(rafRef.current)
            geometry.dispose(); material.dispose(); renderer.dispose()
        }
    }, [])

    return (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full [image-rendering:pixelated]" />
    )
}

/*********************** ABOUT ************************/
function About() {
    return (
        <motion.section id="about" className="relative py-24 md:py-32 px-6 max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                <div className="grid md:grid-cols-5 gap-10 items-center">
                    <div className="md:col-span-3">
                        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Su di me</h2>
                        <p className="text-white/70 leading-relaxed">
                            Sono un developer orientato all’esperienza utente e alle performance. Lavoro con animazioni fluide, 3D leggero e componenti accessibili.
                            Nel mio stack: <span className="text-white">Next.js</span>, <span className="text-white">Tailwind</span>, <span className="text-white">GSAP</span>, <span className="text-white">Three.js</span> e <span className="text-white">Framer Motion</span>.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {['Next.js','TypeScript','Tailwind','GSAP','Three.js','Framer','shadcn/ui','Radix'].map(t => (
                                <Badge key={t} className="bg-white/10 text-white border border-white/10">{t}</Badge>
                            ))}
                        </div>
                        <div className="mt-8 flex gap-3">
                            <Button asChild variant="secondary" className="rounded-full"><a href="#projects"><Code2 className="mr-2 h-4 w-4"/>I miei lavori</a></Button>
                            <Button asChild variant="ghost" className="rounded-full border border-white/10"><a href="#contact"><Mail className="mr-2 h-4 w-4"/>Scrivimi</a></Button>
                        </div>
                    </div>
                    <div className="md:col-span-2 flex justify-center">
                        <div className="avatar">
                            <div className="w-40 rounded-2xl ring ring-teal-400/30 ring-offset-4 ring-offset-black overflow-hidden">
                                {/* Replace with your avatar */}
                                <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=600&auto=format&fit=crop" alt="avatar" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.section>
    )
}

/*********************** PROJECTS ************************/
function Projects() {
    const projects = useMemo(() => ([
        { title: 'NeuroTrading', desc: 'Dashboard realtime con modelli AI e grafici interattivi.', tags: ['Next.js','Tailwind','Framer'], link: '#', icon: <Cpu /> },
        { title: 'Grid Background', desc: 'Componente UI animato con gradienti ed effetti 3D.', tags: ['GSAP','Three.js'], link: '#', icon: <Sparkles /> },
        { title: 'CSIRT Storytelling', desc: 'Narrazione interattiva con timeline e microinterazioni.', tags: ['shadcn/ui','Radix'], link: '#', icon: <Rocket /> },
    ]), [])

    return (
        <section id="projects" className="relative py-24 md:py-32 px-6 max-w-6xl mx-auto">
            <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-semibold">Progetti in evidenza</h2>
                <p className="text-white/70 mt-2">Selezione curata di lavori con focus su UX e performance.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                {projects.map((p, i) => (
                    <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                        <Card className="group bg-white/5 border-white/10 hover:bg-white/10 transition rounded-2xl overflow-hidden">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <span className="p-2 rounded-lg bg-white/10">{p.icon}</span>
                                    {p.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-white/70 min-h-[60px]">{p.desc}</p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {p.tags.map(t => <span key={t} className="badge badge-outline border-white/20 text-white/80">{t}</span>)}
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <a href={p.link} className="inline-flex items-center gap-1 text-teal-300 hover:underline">
                                        <ExternalLink size={16}/> Apri
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

/*********************** SKILLS (Radix Accordion) ************************/
function Skills() {
    return (
        <section id="skills" className="relative py-24 md:py-32 px-6 max-w-5xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-semibold">Competenze</h2>
                <p className="text-white/70">Stack tecnico e strumenti che uso ogni giorno.</p>
            </div>
            <Accordion.Root type="multiple" className="space-y-3">
                {[{
                    id: 'a',
                    title: 'Animazioni & Microinterazioni',
                    content: 'GSAP per sequenze coreografate; Framer Motion per la granularità su mount/unmount e scroll; transizioni GPU-friendly.'
                }, {
                    id: 'b',
                    title: 'Grafica 3D e Canvas',
                    content: 'Three.js per effetti leggeri (particelle, background) e oggetti low-poly; attenzione a performance e cleanup.'
                }, {
                    id: 'c',
                    title: 'UI e Accessibilità',
                    content: 'Tailwind per design system; shadcn/ui + Radix per componenti accessibili; DaisyUI per prototipazione rapida.'
                }].map(item => (
                    <Accordion.Item key={item.id} value={item.id} className="border border-white/10 rounded-xl overflow-hidden">
                        <Accordion.Header>
                            <Accordion.Trigger className="w-full text-left px-4 py-3 font-medium hover:bg-white/5">
                                {item.title}
                            </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className="px-4 py-4 text-white/70 bg-white/5">
                            {item.content}
                        </Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion.Root>
        </section>
    )
}

/*********************** CONTACT ************************/
function Contact() {
    return (
        <section id="contact" className="relative py-24 md:py-32 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-8 md:p-10">
                    <h3 className="text-2xl md:text-3xl font-semibold">Parliamo del tuo prossimo progetto</h3>
                    <p className="text-white/70 mt-2">Scrivimi due righe: rispondo in 24h con idee e proposte concrete.</p>
                    <form className="mt-6 grid md:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); alert('Grazie! Ti ricontatterò presto.') }}>
                        <input required placeholder="Nome" className="rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-teal-400" />
                        <input required type="email" placeholder="Email" className="rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-teal-400" />
                        <input placeholder="Azienda (opzionale)" className="md:col-span-2 rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-teal-400" />
                        <textarea required placeholder="Messaggio" rows={5} className="md:col-span-2 rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-teal-400" />
                        <div className="md:col-span-2 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-white/60 text-sm">
                                <Mail size={16}/> riccardo@email.com
                            </div>
                            <Button type="submit" className="rounded-full"><Rocket className="mr-2 h-4 w-4"/>Invia</Button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(56,189,248,0.15),transparent_60%)]" />
        </section>
    )
}

/*********************** FOOTER ************************/
function Footer() {
    return (
        <footer className="py-10 text-center text-white/60 text-sm">
            <div className="flex items-center justify-center gap-3 mb-2">
                <a className="underline-offset-4 hover:underline" href="mailto:riccardo@email.com">Email</a>
                <span>•</span>
                <a className="underline-offset-4 hover:underline" href="https://github.com" target="_blank">GitHub</a>
                <span>•</span>
                <a className="underline-offset-4 hover:underline" href="https://linkedin.com" target="_blank">LinkedIn</a>
            </div>
            <div>© {new Date().getFullYear()} Riccardo · Built with Next.js • Tailwind • GSAP • Three.js • Framer</div>
        </footer>
    )
}
