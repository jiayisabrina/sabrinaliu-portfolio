// ─────────────────────────────────────────────────────────────────────────────
//  PORTFOLIO — integrated with Shop Appliances case study
//  Paste this entire file into your Framer code component
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"

// ── TOKENS ───────────────────────────────────────────────────────────────────
const T = {
    bg:     "#f7f2ea",
    bg2:    "#ede6da",
    bg3:    "#e2d9cc",
    ink:    "#3d3530",
    ink2:   "#7a6e66",
    ink3:   "#a89e96",
    pink:   "#e8607a",
    pinkL:  "#f8dde3",
    pinkBg: "#fef4f6",
    sand:   "#c8b898",
    sage:   "#8a9488",
    rust:   "#a86848",
    mist:   "#9098a0",
    border: "#e0d8cc",
    border2:"#ccc4b8",
}

// ── FONTS ────────────────────────────────────────────────────────────────────

import PROFILE_PHOTO from './images_profile.js'



import LAB from './images_lab.js'
// ── GRAIN OVERLAY ────────────────────────────────────────────────────────────
const Grain = () => (
    <div style={{
        position: "fixed", inset: 0, zIndex: 9999,
        pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",
        opacity: 0.032,
        mixBlendMode: "multiply",
    }} />
)

const FontImport = () => {
    useEffect(() => {
        if (document.getElementById("yn-fonts")) return
        const link = document.createElement("link")
        link.id = "yn-fonts"
        link.rel = "stylesheet"
        link.href =
            "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Barlow+Condensed:wght@300;400;600;700;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap"
        document.head.appendChild(link)

        if (document.getElementById("acroterion-face")) return
        const style = document.createElement("style")
        style.id = "acroterion-face"
        style.textContent = `@font-face {
            font-family: "AcroterionJF";
            src: url("https://db.onlinewebfonts.com/t/4889abdc206b7ade5628246106ebf44d.woff2") format("woff2"),
                 url("https://db.onlinewebfonts.com/t/4889abdc206b7ade5628246106ebf44d.woff") format("woff"),
                 url("https://db.onlinewebfonts.com/t/4889abdc206b7ade5628246106ebf44d.ttf") format("truetype");
            font-weight: normal;
            font-style: normal;
        }`
        document.head.appendChild(style)
    }, [])
    return null
}

const mono = "'IBM Plex Mono', monospace"
const cond = "'Barlow Condensed', sans-serif"
const bebas = "'Bebas Neue', sans-serif"
const serif = "'Cormorant Garamond', serif"

// ── TICKER ───────────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
    { text: "UX DESIGN", on: true },
    { text: "TYPOGRAPHY", on: false },
    { text: "SYSTEMS", on: false },
    { text: "BRANDING", on: true },
    { text: "INTERACTION", on: false },
    { text: "FRAMER", on: false },
    { text: "RESEARCH", on: false },
    { text: "MOTION", on: true },
    { text: "CRAFT", on: false },
    { text: "DETAIL", on: false },
]

// ── PROJECTS ─────────────────────────────────────────────────────────────────
const PROJECTS = [
    {
        num: "001",
        title: "Odoo System Redesign",
        year: "2025",
        type: "UX · ERP",
        typeVariant: "pink",
        tag: "UX Research · Systems Design · ERP · Jun–Oct 2025",
        desc: "End-to-end redesign of Odoo across CRM, Sales, Inventory, and Operations — sole designer. Early research invalidated our assumed user flows: warehouse staff completing tasks in a different order than the system expected. Restarted the IA from their actual sequence. Task completion time dropped, onboarding friction measurably reduced.",
        bgColor: T.pinkBg,
        isOdoo: true,
    },
    {
        num: "002",
        title: "Shop Appliances — Brand System",
        year: "2026",
        type: "UX · E-Commerce",
        typeVariant: "pink",
        tag: "UX Design · UI Design · Figma Spec · E-Commerce",
        desc: "Sole designer on a modular brand page system — 35+ brands, 100+ categories. Key decision: three distinct content voices by market tier (luxury, premium, mainstream) after auditing how different buyers actually decide. The Figma spec delivered was used directly by the dev team as single source of truth.",
        bgColor: T.pinkBg,
        isShopAppliances: true,
    },
    {
        num: "003",
        title: "Tempo — Productivity Dashboard",
        year: "2025",
        type: "UX · Product · Mobile",
        typeVariant: "mist",
        tag: "UX Research · Data Viz · Design System · Mobile · Concept 2025",
        desc: "A concept productivity app that surfaces when you work best — not just what to do next. Tempo uses your own behavioral patterns (deep work windows, distraction spikes, energy rhythms) as a personal data layer to help knowledge workers stop fighting their schedule and start designing around it.",
        bgColor: T.bg2,
        isTempo: true,
    },
    {
        num: "004",
        title: "Shop Appliances — Content & SEO",
        year: "2026",
        type: "Content · SEO",
        typeVariant: "sage",
        tag: "Content Strategy · SEO · UX Writing · Feb 2026 — Ongoing",
        desc: "Lead content strategist and writer — 36 articles, full editorial calendar ownership. Pivot that mattered: GA4 showed news content had near-zero conversion assist. Shifted to evergreen buying guides. Organic traffic grew 60%. Multiple articles hit Google P1 within weeks. Cited by ChatGPT and Gemini.",
        bgColor: "#fceef1",
        isBlog: true,
    },
]

const TAG_STYLES = {
    pink: { background: T.pinkBg, color: T.pink, border: `1px solid ${T.pinkL}` },
    sand: { background: "#f5f0e4", color: T.rust, border: "1px solid #ddd0b8" },
    mist: { background: "#eef0f2", color: T.mist, border: "1px solid #c8ccd0" },
    sage: { background: "#eef0ec", color: T.sage, border: "1px solid #c4ccc0" },
}

// ── CASE STUDY DATA ───────────────────────────────────────────────────────────
const SA_STATS = [
    { num: "35+", label: "Brands specced" },
    { num: "100+", label: "Categories mapped" },
    { num: "4", label: "Feature card states" },
    { num: "3", label: "Market tiers" },
]

const SA_BRANDS = [
    { name: "Bertazzoni", tier: "luxury" }, { name: "Smeg", tier: "luxury" },
    { name: "Viking", tier: "luxury" }, { name: "JennAir", tier: "luxury" },
    { name: "Fulgor Milano", tier: "luxury" }, { name: "Liebherr", tier: "luxury" },
    { name: "Dacor", tier: "luxury" }, { name: "ILVE", tier: "luxury" },
    { name: "Bosch", tier: "premium" }, { name: "ZLINE", tier: "premium" },
    { name: "Cafe", tier: "premium" }, { name: "Blomberg", tier: "premium" },
    { name: "Asko", tier: "premium" }, { name: "Faber", tier: "premium" },
    { name: "Zephyr", tier: "premium" }, { name: "Friedrich", tier: "premium" },
    { name: "LG", tier: "mainstream" }, { name: "Samsung", tier: "mainstream" },
    { name: "Whirlpool", tier: "mainstream" }, { name: "GE", tier: "mainstream" },
    { name: "Maytag", tier: "mainstream" }, { name: "Frigidaire", tier: "mainstream" },
]

const SA_UX = [
    {
        num: "01",
        title: "Series & product line hierarchy",
        body: "Bosch has 100/500/800 Series. Bertazzoni has Professional, Master, Heritage. Surfacing series tiers lets shoppers self-select by budget and aspiration before drilling into SKUs — reducing decision fatigue.",
    },
    {
        num: "02",
        title: "Feature-forward, spec-light",
        body: "Rather than leading with BTUs or dB ratings, the feature matrix leads with named benefits — 'PreciseSelect controls', 'AquaStop protection'. The spec lives underneath; the feature name is the hook.",
    },
    {
        num: "03",
        title: "Lifestyle over catalog",
        body: "Hero zones lead with kitchen-set lifestyle imagery, not product cutouts. Appliance buyers make high-consideration, emotional purchases — the aspiration sells first. Cutouts appear in the category grid below.",
    },
    {
        num: "04",
        title: "Trust signals by tier",
        body: "Luxury brands need origin and craft signals. Premium needs tech proof points. Mainstream needs social proof — ratings volume, years in market. The stat bar flexes per tier rather than reusing the same three stats.",
    },
    {
        num: "05",
        title: "Package & bundle entry points",
        body: "A significant share of revenue comes from kitchen packages. Every applicable brand page includes a prominent package CTA above the category grid — package shoppers should never have to hunt for the bundle option.",
    },
]

const SA_PROCESS = [
    {
        num: "01",
        title: "Product & catalog audit",
        body: "Mapped every brand against its live catalog — which brands carry 1 category vs. 6+, which are SKU-rich vs. thin. The audit directly informed the modular template logic.",
        detail: "35 brands × 100+ appliance types mapped",
    },
    {
        num: "02",
        title: "Figma feature spec",
        body: "Master Figma file with each brand as a named frame, each category as a sub-frame, up to 4 feature cards per row with 4 defined states. Single source of truth for the dev team.",
        detail: "Pixel-accurate spec for all brands, categories, and card states",
    },
    {
        num: "03",
        title: "Reference page design",
        body: "Bosch selected as the reference implementation — hero, stats bar, category grid, feature matrix, editorial section all designed at production fidelity. Became the anchor for the full system.",
        detail: "Full Bosch brand page used as the dev team's primary reference",
    },
    {
        num: "04",
        title: "Tier-specific content strategy",
        body: "Three distinct content voices defined and documented: Luxury (heritage, craft, provenance), Premium (performance, tech differentiation), Mainstream (value, reliability, trust signals).",
        detail: "Content guidelines covering tone, stat selection, hero copy, and CTAs per tier",
    },
]

const SA_LIVE = [
    { brand: "Bosch", tier: "Premium", cats: ["Refrigerators", "Ranges", "Dishwashers", "Wall Ovens"], url: "https://www.shopappliances.com/brands/bosch" },
    { brand: "LG", tier: "Mainstream", cats: ["Refrigerators", "Ranges", "Dishwashers", "Laundry"], url: "https://www.shopappliances.com/brands/lg" },
    { brand: "Samsung", tier: "Mainstream", cats: ["Refrigerators", "Ranges", "Dishwashers", "Laundry"], url: "https://www.shopappliances.com/brands/samsung" },
    { brand: "Bertazzoni", tier: "Luxury", cats: ["Ranges", "Refrigerators", "Dishwashers"], url: "https://www.shopappliances.com/brands/bertazzoni" },
    { brand: "Frigidaire", tier: "Mainstream", cats: ["Refrigerators", "Ranges", "Dishwashers"], url: "https://www.shopappliances.com/brands/frigidaire" },
    { brand: "Zephyr", tier: "Premium", cats: ["Range Hoods", "Wine Coolers", "Beverage Centers"], url: "https://www.shopappliances.com/brands/zephyr" },
]

const SA_TIER = {
    luxury:     { label: "Luxury",     bg: "#2c2820", color: "#f0ebe0" },
    premium:    { label: "Premium",    bg: T.pinkL,   color: T.rust   },
    mainstream: { label: "Mainstream", bg: T.bg3,     color: T.ink3   },
    Luxury:     { label: "Luxury",     bg: "#2c2820", color: "#f0ebe0" },
    Premium:    { label: "Premium",    bg: T.pinkL,   color: T.rust   },
    Mainstream: { label: "Mainstream", bg: T.bg3,     color: T.ink3   },
}


// ── ODOO SCREEN IMAGES ──────────────────────────────────────────────────────────
import OI from './images_oi.js'

// ── TEMPO CASE STUDY PANEL ───────────────────────────────────────────────────
function TempoPanel() {
    const [activeTab, setActiveTab] = useState("research")
    const [lightbox, setLightbox] = useState(null)

    const PERSONAS = [
        {
            name: "The Overloaded Manager", age: "32", role: "Product Manager, 60-hr weeks",
            pain: "Meetings eat into deep work. Ends each day unsure if anything important actually got done.",
            need: "Visibility into where time actually goes vs. where it should go.",
            quote: "I feel productive but I can't point to what I built.",
        },
        {
            name: "The Scattered Creative", age: "27", role: "UX Designer / Freelancer",
            pain: "Works in bursts — highly productive for 2hrs, then crashes. Can't predict or replicate good days.",
            need: "A system that works with her energy patterns, not against them.",
            quote: "Some days I do my best work at 11pm. The 9-5 makes no sense for me.",
        },
        {
            name: "The Anxious Achiever", age: "29", role: "Software Engineer, remote",
            pain: "Always online, always available. Hard to justify not responding immediately. Focus is fragmented.",
            need: "Permission structure to protect deep work — backed by data, not willpower.",
            quote: "I need something to tell me it's okay to be unavailable for 2 hours.",
        },
    ]

    const RESEARCH = [
        { phase: "01", method: "Competitive Audit", finding: "Reviewed Notion, Linear, Todoist, Reclaim, Motion, and Structured. All focus on task management. None surface behavioral patterns or personal energy data. The gap: they tell you what to do, not when you're best equipped to do it." },
        { phase: "02", method: "User Interviews (6 participants)", finding: "Interviewed knowledge workers across PM, design, engineering, and writing. Common theme: everyone had a rough intuition about when they work best but no system to surface or protect it. Most productivity tools add cognitive load instead of reducing it." },
        { phase: "03", method: "Behavioral Analysis", finding: "Analyzed anonymized screen-time data patterns from interview participants. Identified 3 consistent productivity archetypes: Morning Sprinters (peak 8–11am), Midday Sustainers (consistent 10am–3pm), and Night Owls (irregular but high output after 8pm). All three were fighting standard 9–5 structures." },
        { phase: "04", method: "Design Principles", finding: "Three guiding principles emerged: (1) Show patterns, don't prescribe behavior. (2) Make the invisible visible — most people don't know what they don't know about their own habits. (3) Protect focus first, then optimize — the system earns trust before asking for behavior change." },
    ]

    const DECISIONS = [
        { num: "01", title: "Focus Score over task count", body: "Most productivity metrics reward volume — tasks completed, hours logged. Tempo's primary metric is a daily Focus Score: a weighted composite of session depth, distraction events, and recovery time. It's harder to game and more meaningful at a glance." },
        { num: "02", title: "Weekly Rhythm Heatmap as the hero visual", body: "The central dashboard element is a 7×24 grid showing focus quality across every hour of the past week. Color intensity = session depth. At a glance, users see their actual work patterns rather than an idealized calendar. This is the single most sticky feature in testing." },
        { num: "03", title: "Soft blocks instead of hard lockouts", body: "Early prototypes used hard app blocks during focus sessions — users rejected them as punitive. Tempo uses soft blocks: friction, not walls. Attempting to open Slack during a focus session shows a gentle nudge (you have 18 minutes left) rather than an error. Users report this feels more respectful of their autonomy." },
        { num: "04", title: "Mobile as the ambient layer", body: "Desktop is where focused work happens. Mobile is the ambient check-in: glanceable daily score, quick session start, and end-of-day summary. The mobile app was designed for 10-second interactions — no scrolling, no decisions, just status at a glance." },
        { num: "05", title: "Design system built token-first", body: "Tempo's design system starts with semantic tokens mapped to productivity and cycle states. --color-rest (warm sand) signals luteal phase low-demand windows. --color-cycle (blush pink) marks menstrual and follicular phases. All components inherit from tokens, making the cycle overlay a configuration layer — not a redesign. Component library covers 24 atoms and 8 organisms." },
    ]

    const COMPONENTS = [
        { name: "FocusRing", desc: "Circular progress indicator for active sessions. Animates in real-time, changes color at 25/50/75% thresholds." },
        { name: "RhythmHeatmap", desc: "7×24 grid of hourly focus quality. Hover reveals exact score. Color scale: sand → teal = low → deep." },
        { name: "SessionCard", desc: "Session summary tile: duration, depth score, distraction count, and a single insight label (Deep Work / Fragmented / Recovering)." },
        { name: "DailyScore", desc: "Large typographic score (0–100) with sparkline showing 7-day trend. Primary mobile dashboard element." },
        { name: "BlockNudge", desc: "Soft interruption overlay for focus protection. Dismissable in 2 taps. Never blocks, always nudges." },
        { name: "InsightCard", desc: "Weekly pattern insight rendered as a short editorial statement: 'Your best work happens before 11am on Tuesdays.'" },
    ]

    const tabs = [
        { id: "research", label: "Research" },
        { id: "decisions", label: "Design Decisions" },
        { id: "system", label: "Design System" },
        { id: "screens", label: "Screens" },
    ]

    // Simple ASCII-style screen mockups as colored blocks
    const SCREENS = [
        { label: "Dashboard — Weekly Rhythm", desc: "Primary desktop view showing the 7×24 rhythm heatmap, today's focus score, and three upcoming focus windows recommended by the system based on historical patterns." },
        { label: "Focus Session — Active", desc: "Minimal full-screen mode during an active session. Shows elapsed time, FocusRing progress, and a single motivational data point. All other UI removed to reduce distraction." },
        { label: "Mobile — Daily Glance", desc: "Home screen widget and app entry point. 10-second read: today's score, current session status, and one insight. No scrolling required." },
        { label: "Weekly Review", desc: "End-of-week summary screen surfacing behavioral patterns, longest focus streaks, and one actionable insight for the coming week." },
    ]

    return (
        <div style={{ borderTop: `1px solid ${T.border}` }}>
            {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}

            {/* HEADER */}
            <div style={{ padding: "52px clamp(40px,8vw,120px) 48px", background: T.bg2, borderBottom: `1px solid ${T.border}` }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 48, alignItems: "start" }}>
                    <div>
                        <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: T.pink, marginBottom: 12 }}>
                            UX Research · Data Viz · Design System · Mobile · Concept 2025
                        </div>
                        <div style={{ fontFamily: cond, fontWeight: 900, fontSize: "clamp(37px,4vw,63px)", lineHeight: 0.96, textTransform: "uppercase", color: T.ink, marginBottom: 16 }}>
                            Tempo<br />
                            <span style={{ color: T.pink, fontStyle: "italic", fontWeight: 700 }}>Productivity Dashboard</span>
                        </div>
                        <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.0, color: T.ink2, margin: 0, maxWidth: 480 }}>
                            Most productivity apps tell you what to do. Tempo tells you when you work best — surfacing your own behavioral patterns as a personal data layer so you can design your schedule around how you actually operate, not how you think you should.
                        </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 28px" }}>
                            {[
                                { k: "Type",      v: "Concept Project" },
                                { k: "Platform",  v: "Web + iOS" },
                                { k: "Role",      v: "Solo UX / Product Designer" },
                                { k: "Timeline",  v: "2025" },
                                { k: "Methods",   v: "User interviews · Audit · Prototyping" },
                            ].map(m => (
                                <div key={m.k}>
                                    <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: T.border2, marginBottom: 4 }}>{m.k}</div>
                                    <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 16, letterSpacing: "0.04em", color: T.ink }}>{m.v}</div>
                                </div>
                            ))}
                        </div>
                        {/* Concept badge */}
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.bg3, border: `1px solid ${T.border2}`, borderRadius: 2, padding: "8px 14px", width: "fit-content" }}>
                            <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.pink }} />
                            <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: T.ink3 }}>Concept project — not shipped</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* STATS */}
            <StatBar stats={[
                { num: "6",   label: "User interviews",        accent: T.pink },
                { num: "3",   label: "User archetypes",        accent: T.sand },
                { num: "24",  label: "Component atoms",        accent: T.sage },
                { num: "4",   label: "Core screens",           accent: T.pink },
                { num: "5",   label: "Design decisions",       accent: T.pink },
            ]} />

            {/* TABS */}
            <div style={{ padding: "0 clamp(40px,8vw,120px)", borderBottom: `1px solid ${T.border}`, background: T.bg, display: "flex", gap: 0 }}>
                {tabs.map(t => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                        fontFamily: mono, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
                        padding: "16px 20px", background: "transparent", border: "none",
                        borderBottom: activeTab === t.id ? `2px solid ${T.pink}` : "2px solid transparent",
                        color: activeTab === t.id ? T.mist : T.ink3,
                        cursor: "pointer", transition: "all 0.15s", marginBottom: -1,
                    }}>{t.label}</button>
                ))}
            </div>

            {/* TAB: RESEARCH */}
            {activeTab === "research" && (
                <div style={{ borderBottom: `1px solid ${T.border}` }}>
                    {/* Personas */}
                    <div style={{ padding: "48px clamp(40px,8vw,120px)", borderBottom: `1px solid ${T.border}` }}>
                        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.pink, marginBottom: 8 }}>User Archetypes</div>
                        <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 24, textTransform: "uppercase", color: T.ink, marginBottom: 28 }}>3 knowledge worker profiles</div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 1, background: T.border, border: `1px solid ${T.border}`, overflow: "hidden" }}>
                            {PERSONAS.map((p, i) => (
                                <div key={i} style={{ background: i % 2 === 0 ? T.bg : T.bg2, padding: "32px 28px", position: "relative" }}>
                                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: [T.pink, T.sand, T.sage][i] }} />
                                    <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: T.ink3, marginBottom: 8 }}>{p.age} · {p.role}</div>
                                    <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 18, textTransform: "uppercase", letterSpacing: "0.04em", color: T.ink, marginBottom: 12 }}>{p.name}</div>
                                    <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", color: T.ink3, marginBottom: 6 }}>Pain</div>
                                    <p style={{ fontFamily: mono, fontSize: 13, lineHeight: 1.85, color: T.ink2, margin: "0 0 12px" }}>{p.pain}</p>
                                    <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", color: T.ink3, marginBottom: 6 }}>Need</div>
                                    <p style={{ fontFamily: mono, fontSize: 13, lineHeight: 1.85, color: T.ink2, margin: "0 0 16px" }}>{p.need}</p>
                                    <div style={{ borderLeft: `2px solid ${[T.pink, T.sand, T.sage][i]}`, paddingLeft: 12, fontFamily: mono, fontSize: 13, fontStyle: "italic", color: T.ink3, lineHeight: 1.8 }}>"{p.quote}"</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Research phases */}
                    <div style={{ padding: "48px clamp(40px,8vw,120px)" }}>
                        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.pink, marginBottom: 8 }}>Research Process</div>
                        <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 24, textTransform: "uppercase", color: T.ink, marginBottom: 28 }}>4 phases to design principles</div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {RESEARCH.map((r, i) => (
                                <div key={i} style={{ display: "grid", gridTemplateColumns: "48px 1fr", gap: 24, paddingBottom: 28, paddingTop: i === 0 ? 0 : 28, borderBottom: i < RESEARCH.length - 1 ? `1px solid ${T.border}` : "none" }}>
                                    <div style={{ fontFamily: cond, fontWeight: 900, fontSize: 24, color: T.pink, lineHeight: 1 }}>{r.phase}</div>
                                    <div>
                                        <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 17, textTransform: "uppercase", letterSpacing: "0.05em", color: T.ink, marginBottom: 8 }}>{r.method}</div>
                                        <p style={{ fontFamily: mono, fontSize: 14, lineHeight: 2.0, color: T.ink2, margin: 0, maxWidth: 700 }}>{r.finding}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: DESIGN DECISIONS */}
            {activeTab === "decisions" && (
                <div style={{ padding: "52px clamp(40px,8vw,120px)", borderBottom: `1px solid ${T.border}` }}>
                    <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.pink, marginBottom: 8 }}>Design Decisions</div>
                    <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 24, textTransform: "uppercase", color: T.ink, marginBottom: 28 }}>5 decisions that defined Tempo</div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {DECISIONS.map((d, i) => (
                            <div key={i} style={{ display: "grid", gridTemplateColumns: "clamp(40px,5vw,60px) 1fr", gap: 24, padding: "24px 0", borderBottom: i < DECISIONS.length - 1 ? `1px solid ${T.border}` : "none" }}>
                                <div style={{ fontFamily: cond, fontWeight: 900, fontSize: 30, color: T.border2, lineHeight: 1 }}>{d.num}</div>
                                <div>
                                    <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 18, letterSpacing: "0.06em", textTransform: "uppercase", color: T.ink, marginBottom: 8 }}>{d.title}</div>
                                    <p style={{ fontFamily: mono, fontSize: 14, lineHeight: 2.0, color: T.ink2, margin: 0, maxWidth: 680 }}>{d.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB: DESIGN SYSTEM */}
            {activeTab === "system" && (
                <div style={{ borderBottom: `1px solid ${T.border}` }}>
                    {/* Color tokens */}
                    <div style={{ padding: "48px clamp(40px,8vw,120px)", borderBottom: `1px solid ${T.border}` }}>
                        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.pink, marginBottom: 8 }}>Color Tokens</div>
                        <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 24, textTransform: "uppercase", color: T.ink, marginBottom: 6 }}>Semantic, not decorative</div>
                        <p style={{ fontFamily: mono, fontSize: 14, lineHeight: 2.0, color: T.ink2, margin: "0 0 28px", maxWidth: 600 }}>Colors carry meaning — each token maps directly to a productivity state or cycle phase. The palette stays warm and editorial, consistent with how the app should feel: calm, not clinical.</p>
                        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                            {[
                                { token: "--color-focus",    hex: T.ink,    label: "Deep Focus",        desc: "High-intensity work sessions" },
                                { token: "--color-flow",     hex: T.ink2,   label: "In Flow",           desc: "Productive but relaxed state" },
                                { token: "--color-surface",  hex: T.bg,     label: "Surface",           desc: "Primary background" },
                                { token: "--color-warm",     hex: T.bg2,    label: "Warm Ground",       desc: "Secondary surface, cards" },
                                { token: "--color-accent",   hex: T.pink,   label: "Accent / Alert",    desc: "CTAs, distraction signals" },
                                { token: "--color-rest",     hex: T.sand,   label: "Rest",              desc: "Luteal · low-demand windows" },
                                { token: "--color-cycle",    hex: "#e8a0b4",label: "Cycle Awareness",    desc: "Menstrual / follicular phase" },
                                { token: "--color-border",   hex: T.border, label: "Border",            desc: "Dividers, subtle structure" },
                            ].map(c => (
                                <div key={c.token} style={{ display: "flex", flexDirection: "column", gap: 8, width: 140 }}>
                                    <div style={{ height: 52, borderRadius: 10, background: c.hex, border: `1px solid ${T.border}` }} />
                                    <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.06em", color: T.ink3 }}>{c.token}</div>
                                    <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 14, color: T.ink }}>{c.label}</div>
                                    <div style={{ fontFamily: mono, fontSize: 11, color: T.ink3, lineHeight: 1.6 }}>{c.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cycle tracking feature */}
                    <div style={{ padding: "48px clamp(40px,8vw,120px)", borderBottom: `1px solid ${T.border}`, background: T.bg2 }}>
                        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.pink, marginBottom: 8 }}>Feature — Cycle-Aware Scheduling</div>
                        <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 24, textTransform: "uppercase", color: T.ink, marginBottom: 16 }}>Designed for how female bodies actually work</div>
                        <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.0, color: T.ink2, maxWidth: 680, margin: "0 0 28px" }}>
                            Tempo integrates an optional menstrual cycle tracking layer that maps productivity recommendations to cycle phases. Energy, focus capacity, and recovery needs shift significantly across the cycle — most productivity apps ignore this entirely. Tempo surfaces it as a first-class scheduling input.
                        </p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 1, background: T.border, border: `1px solid ${T.border}`, overflow: "hidden" }}>
                            {[
                                { phase: "Menstrual", days: "Days 1–5", color: "#e8a0b4", energy: "Low", rec: "Rest, reflection, light admin. Avoid high-stakes decisions or creative sprints." },
                                { phase: "Follicular", days: "Days 6–13", color: T.pink, energy: "Rising", rec: "Ideal for new projects, brainstorming, and starting difficult work. Energy and focus are climbing." },
                                { phase: "Ovulatory", days: "Days 14–16", color: T.sage, energy: "Peak", rec: "Schedule your most important work, presentations, and collaborative sessions here. Peak cognitive and social energy." },
                                { phase: "Luteal", days: "Days 17–28", color: T.sand, energy: "Declining", rec: "Front-load the early luteal phase for deep work. Wind down toward rest as PMS symptoms may emerge. Protect recovery time." },
                            ].map((p, i) => (
                                <div key={i} style={{ background: T.bg, padding: "28px 24px", position: "relative" }}>
                                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: p.color }} />
                                    <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: T.ink3, marginBottom: 6 }}>{p.days}</div>
                                    <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 18, textTransform: "uppercase", color: T.ink, marginBottom: 4 }}>{p.phase}</div>
                                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.color }} />
                                        <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: T.ink3 }}>Energy: {p.energy}</span>
                                    </div>
                                    <p style={{ fontFamily: mono, fontSize: 13, lineHeight: 1.9, color: T.ink2, margin: 0 }}>{p.rec}</p>
                                </div>
                            ))}
                        </div>
                        <p style={{ fontFamily: mono, fontSize: 13, lineHeight: 1.9, color: T.ink3, margin: "20px 0 0" }}>
                            The cycle layer is opt-in and entirely private — never synced, never shared. It surfaces as a subtle overlay on the weekly rhythm heatmap, color-coded by phase, with gentle scheduling nudges ("Luteal phase — consider lighter cognitive load this week").
                        </p>
                    </div>

                    {/* Components */}
                    <div style={{ padding: "48px clamp(40px,8vw,120px)" }}>
                        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.pink, marginBottom: 8 }}>Component Library</div>
                        <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 24, textTransform: "uppercase", color: T.ink, marginBottom: 24 }}>24 atoms · 8 organisms</div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 1, background: T.border, border: `1px solid ${T.border}`, overflow: "hidden" }}>
                            {COMPONENTS.map((c, i) => (
                                <div key={i} style={{ background: i % 2 === 0 ? T.bg : T.bg2, padding: "28px 24px" }}>
                                    <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: T.pink, marginBottom: 6 }}>Component</div>
                                    <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 18, textTransform: "uppercase", color: T.ink, marginBottom: 8 }}>{c.name}</div>
                                    <p style={{ fontFamily: mono, fontSize: 13, lineHeight: 1.9, color: T.ink2, margin: 0 }}>{c.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: SCREENS */}
            {activeTab === "screens" && (
                <div style={{ padding: "48px clamp(40px,8vw,120px)", borderBottom: `1px solid ${T.border}` }}>
                    <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.pink, marginBottom: 8 }}>Key Screens</div>
                    <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 24, textTransform: "uppercase", color: T.ink, marginBottom: 28 }}>4 core moments in the product</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: 24 }}>
                        {SCREENS.map((s, i) => (
                            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                {/* Screen placeholder — styled mockup frame */}
                                <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${T.border2}`, background: "#1e2830", aspectRatio: i % 3 === 2 ? "9/16" : "16/10", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 24 }}>
                                    <div style={{ width: "60%", height: 8, borderRadius: 4, background: "#3d7a8a", opacity: 0.8 }} />
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3, width: "80%" }}>
                                        {Array.from({length: 7*6}).map((_, j) => (
                                            <div key={j} style={{ height: 10, borderRadius: 2, background: `rgba(61,122,138,${Math.random() * 0.8 + 0.1})` }} />
                                        ))}
                                    </div>
                                    <div style={{ width: "40%", height: 6, borderRadius: 3, background: "#c8b898", opacity: 0.5 }} />
                                    <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Tempo · {s.label}</div>
                                </div>
                                <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 16, textTransform: "uppercase", letterSpacing: "0.04em", color: T.ink }}>{s.label}</div>
                                <p style={{ fontFamily: mono, fontSize: 13, lineHeight: 1.9, color: T.ink2, margin: 0 }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: 32, padding: "20px 24px", background: T.bg3, border: `1px solid ${T.border}`, borderRadius: 4 }}>
                        <p style={{ fontFamily: mono, fontSize: 13, lineHeight: 1.9, color: T.ink3, margin: 0 }}>
                            <span style={{ color: T.pink, fontWeight: 600 }}>Note:</span> Tempo is a concept project. Screens above are structural wireframe-level representations. High-fidelity Figma screens available on request.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}


function SelfCarePanel() {
    const [active, setActive] = useState(0)
    const [lightbox, setLightbox] = useState(null)
    const pages = Array.from({ length: 17 }, (_, i) => `nl${i + 1}`)
    return (
        <div style={{ borderTop: `1px solid ${T.border}` }}>
            {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
            <StatBar cols={4} stats={[
                { num: "17",           label: "Pages designed" },
                { num: "1",            label: "Publication" },
                { num: "Columbia SPS", label: "Client" },
                { num: "Nov 2024",     label: "Published" },
            ]} />
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", borderBottom:`1px solid ${T.border}` }}>
                <div style={{ padding:"32px clamp(28px,4vw,56px)", borderRight:`1px solid ${T.border}`, display:"flex", flexDirection:"column", gap:16 }}>
                    <div style={{ fontFamily:mono, fontSize: 11, letterSpacing:"0.16em", textTransform:"uppercase", color:T.pink }}>Overview</div>
                    <p style={{ fontFamily:cond, fontSize: 15, lineHeight:1.85, color:T.ink3, margin:0, fontWeight: 400 }}>
                        The Self-Care Scoop is the Columbia SPS Office of Student Wellness monthly newsletter. I designed a full 17-page editorial layout — cover, feature spreads, wellness tips, event calendar, and back matter — creating a cohesive visual identity that balances warmth with credibility for a graduate student audience.
                    </p>
                    <div style={{ display:"flex", flexDirection:"column", gap:8, marginTop:4 }}>
                        {[["Editorial Design","Layout, typography hierarchy, and visual rhythm across 17 pages"],["Illustration Direction","Coordinated spot illustrations and decorative elements throughout"],["Brand Consistency","Developed a reusable template system for future issues"],["Client","Columbia SPS Office of Student Wellness"]].map(([label,body],i) => (
                            <div key={i} style={{ display:"flex", gap:12, paddingBottom:8, borderBottom:`1px solid ${T.border}` }}>
                                <div style={{ fontFamily:mono, fontSize: 12, fontWeight:700, color:T.ink, minWidth:120 }}>{label}</div>
                                <div style={{ fontFamily:mono, fontSize: 12, color:T.ink3, lineHeight:1.65 }}>{body}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ padding:"28px clamp(28px,4vw,56px)", display:"flex", flexDirection:"column", gap:16 }}>
                    <div style={{ fontFamily:mono, fontSize: 11, letterSpacing:"0.16em", textTransform:"uppercase", color:T.pink }}>All Pages</div>
                    <div style={{ background: T.bg3, padding: "28px", borderRadius: 20, boxShadow: "0 8px 40px rgba(61,53,48,0.13), 0 2px 8px rgba(61,53,48,0.08)" }}>
                        <div
                            onClick={() => setLightbox({ src: LAB[pages[active]], alt: `Page ${active+1}` })}
                            style={{ borderRadius: 12, overflow:"hidden", border:`1px solid ${T.border2}`, cursor: "zoom-in" }}>
                            <img src={LAB[pages[active]]} alt={`Page ${active+1}`} style={{ width:"100%", height:"auto", objectFit:"cover", objectPosition:"top", display:"block" }} />
                        </div>
                        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", color: T.ink3, marginTop: 10, textAlign: "center" }}>Click to view full size</div>
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(9,1fr)", gap:3 }}>
                        {pages.map((key,i) => (
                            <motion.div key={i} onClick={() => setActive(i)} whileHover={{ scale:1.06 }}
                                style={{ aspectRatio:"1", overflow:"hidden", cursor:"pointer", borderRadius: 4, border: active===i ? `2px solid ${T.pink}` : `1px solid ${T.border}`, background:T.bg3 }}>
                                <img src={LAB[key]} alt={`p${i+1}`} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top", display:"block" }} />
                            </motion.div>
                        ))}
                    </div>
                    <div style={{ fontFamily:mono, fontSize: 13, color:T.ink3 }}>Page {active+1} of 17 — click thumbnail to view</div>
                </div>
            </div>
        </div>
    )
}

// ── BLOG CASE STUDY PANEL ─────────────────────────────────────────────────────
function BlogPanel() {
    const [activeTab, setActiveTab] = useState("overview")

    const ARTICLES = [
        // Buying Guides
        { title: "Built-In vs Freestanding Refrigerators: Pros, Cons & How to Choose in 2026", category: "Buying Guide", date: "Mar 19, 2026", url: "https://www.shopappliances.com/blog/built-in-vs-freestanding-refrigerators", desc: "Deep comparison covering design, cost, installation, and ventilation — structured to capture comparison-intent queries at the mid-funnel consideration stage.", tags: ["Refrigerators", "Comparison", "SEO"] },
        { title: "How to Choose the Right Dishwasher (Complete Buying Guide 2026)", category: "Buying Guide", date: "Mar 19, 2026", url: "https://www.shopappliances.com/blog/how-to-choose-the-right-dishwasher-2026", desc: "Full-funnel buying guide covering types, sizes, features, noise levels, and brand comparisons — designed to intercept high-intent shoppers at research stage.", tags: ["Dishwashers", "Buying Guide", "SEO"] },
        { title: "Dishwasher Quietness Guide: How to Choose a Truly Quiet Dishwasher", category: "Buying Guide", date: "Mar 19, 2026", url: "https://www.shopappliances.com/blog/dishwasher-quietness-guide-2026", desc: "Niche-intent guide targeting shoppers researching noise levels. Explains dBA ratings and maps noise tier to specific brand recommendations.", tags: ["Dishwashers", "Niche Intent", "dBA"] },
        { title: "Steam Oven vs Speed Oven: Which Is Better in 2026?", category: "Buying Guide", date: "Mar 17, 2026", url: "https://www.shopappliances.com/blog/steam-oven-vs-speed-oven-2026", desc: "Comparison guide for two high-consideration specialty oven types — structured around cooking style and use case to guide purchase decision.", tags: ["Wall Ovens", "Comparison", "Buying Guide"] },
        { title: "Wall Oven vs Range: Pros, Cons, Differences, and How to Choose", category: "Buying Guide", date: "Mar 16, 2026", url: "https://www.shopappliances.com/blog/wall-oven-vs-range", desc: "Core category comparison covering design, cost, installation requirements, and cooking performance — one of the highest-intent queries in kitchen appliances.", tags: ["Wall Ovens", "Ranges", "Comparison"] },
        { title: "The Best Ranges of 2026: Finding the Perfect Fit for Your Kitchen", category: "Buying Guide", date: "Mar 4, 2026", url: "https://www.shopappliances.com/blog/the-best-ranges-of-2026-finding-the-perfect-fit-for-your-kitchen", desc: "Roundup guide covering gas, electric, induction, and dual fuel ranges across price tiers — designed to capture 'best ranges 2026' search volume.", tags: ["Ranges", "Roundup", "SEO"] },
        { title: "The Best Electric Ranges of 2026: Cooking Made Easy with the Latest Technology", category: "Buying Guide", date: "Mar 2, 2026", url: "https://www.shopappliances.com/blog/the-best-electric-ranges-of-2026-cooking-made-easy-with-the-latest-technology", desc: "Category-focused best-of guide highlighting top electric range models across compact, standard, and luxury tiers with ILVE and Element featured.", tags: ["Electric Ranges", "Roundup", "ILVE"] },
        { title: "The Best Washers of 2026: Find Your Perfect Match for Laundry Day", category: "Buying Guide", date: "Mar 5, 2026", url: "https://www.shopappliances.com/blog/the-best-washers-of-2026-find-your-perfect-match-for-laundry-day", desc: "Laundry-category roundup covering efficiency, capacity, and reliability across LG, Samsung, Bosch, GE, and Speed Queen.", tags: ["Laundry", "Roundup", "Buying Guide"] },
        // Maintenance
        { title: "How to Care for Luxury Appliance Finishes", category: "Maintenance Guide", date: "Mar 17, 2026", url: "https://www.shopappliances.com/blog/luxury-appliance-finish-care", desc: "Post-purchase care content targeting luxury appliance owners — covers stainless steel cleaning, fingerprint removal, and finish-specific maintenance.", tags: ["Maintenance", "Luxury", "Post-purchase"] },
        // Installation
        { title: "Appliance Delivery Checklist: How to Ensure Your Appliance Fits Through Any Door", category: "Installation Guide", date: "Mar 18, 2026", url: "https://www.shopappliances.com/blog/appliance-delivery-checklist", desc: "Post-purchase intent content reducing delivery failures — covers door clearances, hallway measurements, stair logistics, and installation prep.", tags: ["Installation", "Post-purchase", "SEO"] },
    ]

    const SKILLS = [
        {
            num: "01", title: "SEO-driven content strategy",
            body: "Every article was planned around keyword research — mapping search intent (informational, comparison, transactional) to the right content format. Buying guides target mid-funnel comparison queries. Installation guides target post-purchase intent. Product posts target brand + category navigational queries. The result: significant domain authority growth.",
        },
        {
            num: "02", title: "UX writing for e-commerce conversion",
            body: "Blog content was written as a conversion layer — not just for organic traffic. Each guide is structured to funnel readers toward relevant product collections via contextual CTAs, internal links to brand and category pages, and product recommendations embedded naturally within the content rather than bolted on at the end.",
        },
        {
            num: "03", title: "Data-backed content decisions",
            body: "Used GA4, SEMrush, and SQL to analyze which content formats drove the highest session-to-conversion rates. Buying guides consistently outperformed news content on both organic reach and conversion-assist. This analysis directly shaped the editorial calendar — pivoting away from news content toward evergreen buying guides.",
        },
        {
            num: "04", title: "Cross-functional content design",
            body: "Content was produced in coordination with the brand page design system — each buying guide was mapped to a corresponding brand or category collection page. Blog articles became the top-of-funnel entry point that fed directly into the brand page system and product collection pages designed as part of the Shop Appliances UI project.",
        },
        {
            num: "05", title: "Content as marketing infrastructure",
            body: "Beyond individual articles, built the content taxonomy — categories (Buying Guides, Installation Guides, Maintenance, News, Promotions), tagging structure, and URL architecture — ensuring every piece of content was discoverable, indexable, and mapped to the site's broader SEO strategy.",
        },
        {
            num: "06", title: "Google P1 rankings & AI citations",
            body: "Multiple articles achieved page 1 Google rankings for target keywords within weeks of publication — a direct result of keyword-first structure, semantic heading hierarchy, and content depth. Several articles are also cited as sources by ChatGPT, Gemini, and Notebook LM, reflecting the factual authority and structured clarity that AI platforms prioritize when surfacing appliance guidance to users.",
        },
    ]

    const STATS = [
        { num: "60%", label: "Organic traffic growth" },
        { num: "P1",     label: "Google page 1 rankings" },
        { num: "34",     label: "Total articles produced" },
        { num: "10+",    label: "Sabrina Liu bylines" },
        { num: "AI",     label: "Cited by ChatGPT, Gemini & Notebook LM" },
    ]

    return (
        <div style={{ borderTop: `1px solid ${T.pinkL}` }}>

            {/* HEADER */}
            <div style={{ padding: "52px clamp(40px,8vw,120px) 48px", background: T.pinkBg, borderBottom: `1px solid ${T.pinkL}` }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 40, alignItems: "start" }}>
                    <div>
                        <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: T.pink, marginBottom: 12 }}>
                            Content Strategy · SEO · UX Writing · Feb 2026 — Ongoing
                        </div>
                        <div style={{ fontFamily: cond, fontWeight: 900, fontSize: "clamp(37px,4vw,63px)", lineHeight: 0.96, textTransform: "uppercase", color: T.ink, marginBottom: 16 }}>
                            Shop Appliances<br />
                            <span style={{ color: T.pink, fontStyle: "italic", fontWeight: 700 }}>Blog & SEO</span>
                        </div>
                        <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.1, color: T.ink2, margin: 0, maxWidth: 640}}>
                            Lead content strategist and writer for the Shop Appliances blog — producing SEO-optimized buying guides, installation guides, and product content. Grew organic traffic by 60% through data-driven content planning, keyword strategy, and UX-informed writing that converts readers into buyers.
                        </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 28px" }}>
                            {[
                                { k: "Company",   v: "Homery / Shop Appliances" },
                                { k: "Role",      v: "Content Strategist & Writer" },
                                { k: "Tools",     v: "SEMrush · GA4 · SQL · Shopify" },
                                { k: "Timeline",  v: "Feb 2026 — Ongoing" },
                            ].map(m => (
                                <div key={m.k}>
                                    <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: T.border2, marginBottom: 4 }}>{m.k}</div>
                                    <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 18, letterSpacing: "0.04em", color: T.ink }}>{m.v}</div>
                                </div>
                            ))}
                        </div>
                        <a href="https://www.shopappliances.com/blog" target="_blank" rel="noopener noreferrer"
                            style={{ fontFamily: mono, fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", color: T.pink, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                            shopappliances.com/blog ↗
                        </a>
                    </div>
                </div>
            </div>

            {/* STATS */}
            <StatBar stats={STATS} />

            {/* TABS */}
            <div style={{ padding: "52px clamp(40px,8vw,120px)", borderBottom: `1px solid ${T.border}`, background: T.bg }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 28, flexWrap: "wrap" }}>
                    {[
                        { id: "overview", label: "Content strategy" },
                        { id: "articles", label: "Published articles" },
                        { id: "skills",   label: "Skills applied" },
                    ].map(t => (
                        <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                            fontFamily: mono, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase",
                            padding: "7px 14px", borderRadius: 2,
                            border: `1px solid ${activeTab === t.id ? T.pink : T.border2}`,
                            background: activeTab === t.id ? T.pink : "transparent",
                            color: activeTab === t.id ? "#fff" : T.ink3,
                            cursor: "pointer", transition: "all 0.15s",
                        }}>{t.label}</button>
                    ))}
                </div>

                {/* OVERVIEW TAB */}
                {activeTab === "overview" && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 40 }}>
                        <div>
                            <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: T.ink3, marginBottom: 12 }}>The content strategy</div>
                            <div style={{ fontFamily: cond, fontWeight: 700, fontSize: "clamp(23px,2vw,26px)", textTransform: "uppercase", color: T.ink, marginBottom: 12, lineHeight: 1.1 }}>Content as a conversion funnel</div>
                            <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.1, color: T.ink2, margin: "0 0 14px"}}>
                                The blog wasn't built as a publishing exercise — it was designed as a marketing infrastructure layer. Every article was mapped to a point in the buyer journey and connected directly to product collections, brand pages, and category landing pages.
                            </p>
                            <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.1, color: T.ink2, margin: "0 0 16px"}}>
                                Content planning was driven by keyword research in SEMrush and performance data in GA4 — identifying high-volume, low-competition search queries where Shop Appliances could build authority quickly. The significant domain authority growth reflects the cumulative impact of consistent, strategically-targeted content.
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                <div style={{ background: T.pinkBg, border: `1px solid ${T.pinkL}`, borderLeft: `3px solid ${T.pink}`, borderRadius: "0 3px 3px 0", padding: "12px 14px" }}>
                                    <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 16, textTransform: "uppercase", letterSpacing: "0.08em", color: T.pink, marginBottom: 4 }}>Google page 1 rankings</div>
                                    <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.0, color: T.ink2, margin: 0}}>Multiple articles rank on page 1 of Google for their target keywords — buying guide queries, brand comparisons, and appliance-type searches — within weeks of publication on competitive, high-volume terms.</p>
                                </div>
                                <div style={{ background: T.pinkBg, border: `1px solid ${T.pinkL}`, borderLeft: `3px solid ${T.pink}`, borderRadius: "0 3px 3px 0", padding: "12px 14px" }}>
                                    <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 16, textTransform: "uppercase", letterSpacing: "0.08em", color: T.pink, marginBottom: 4 }}>Cited by major AI platforms</div>
                                    <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.0, color: T.ink2, margin: 0}}>Content cited as a source by ChatGPT, Google Gemini, and Notebook LM when answering appliance queries — a signal of factual authority and structural clarity that AI systems recognize and surface to users.</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: T.ink3, marginBottom: 12 }}>Content taxonomy built</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                {[
                                    { cat: "Buying Guides",        desc: "Mid-funnel comparison content. Intercepts shoppers actively researching before purchase decision.", color: T.pink },
                                    { cat: "Installation Guides",  desc: "Post-purchase content reducing delivery failures and support volume.", color: T.border2 },
                                    { cat: "Maintenance Guides",   desc: "Retention and loyalty content — keeps customers engaged with the brand after purchase.", color: T.sand },
                                    { cat: "New Product Updates",  desc: "Top-of-funnel discovery content for new SKUs and brand launches.", color: T.pink },
                                    { cat: "Promotions",           desc: "Conversion-layer content tied to seasonal campaigns and closeout deals.", color: T.border2 },
                                    { cat: "Industry News",        desc: "Authority-building content signaling category expertise to search engines.", color: T.sand },
                                ].map((c, i) => (
                                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                        <div style={{ width: 3, height: "100%", minHeight: 28, background: c.color, flexShrink: 0, borderRadius: 1, marginTop: 3 }} />
                                        <div>
                                            <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 16, textTransform: "uppercase", letterSpacing: "0.06em", color: T.ink, marginBottom: 2 }}>{c.cat}</div>
                                            <div style={{ fontFamily: mono, fontSize: 15, color: T.ink2, lineHeight: 1.9}}>{c.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ARTICLES TAB */}
                {activeTab === "articles" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 1, border: `1px solid ${T.border}`, borderRadius: 3, overflow: "hidden" }}>
                        {ARTICLES.map((a, i) => (
                            <motion.div key={i} whileHover={{ background: T.pinkBg }}
                                style={{ background: i % 2 === 0 ? T.bg : T.bg2, padding: "24px 32px", borderBottom: i < ARTICLES.length - 1 ? `1px solid ${T.border}` : "none", transition: "background 0.15s" }}>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "start" }}>
                                    <div>
                                        <div style={{ display: "flex", gap: 8, marginBottom: 6, flexWrap: "wrap", alignItems: "center" }}>
                                            <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 8px", borderRadius: 2, background: T.pinkBg, color: T.pink }}>{a.category}</span>
                                            <span style={{ fontFamily: mono, fontSize: 13, color: T.ink3 }}>{a.date}</span>
                                        </div>
                                        <div style={{ fontFamily: cond, fontWeight: 700, fontSize: "clamp(18px,1.8vw,23px)", textTransform: "uppercase", letterSpacing: "0.04em", color: T.ink, marginBottom: 6, lineHeight: 1.2 }}>{a.title}</div>
                                        <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.0, color: T.ink2, margin: "0 0 8px"}}>{a.desc}</p>
                                        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                                            {a.tags.map(tag => (
                                                <span key={tag} style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.06em", padding: "2px 8px", borderRadius: 2, border: `1px solid ${T.border}`, color: T.ink3 }}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <a href={a.url} target="_blank" rel="noopener noreferrer"
                                        style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: T.pink, textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}>
                                        Read ↗
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                        <div style={{ padding: "14px 24px", background: T.bg2, display: "flex", justifyContent: "flex-end" }}>
                            <a href="https://www.shopappliances.com/blog" target="_blank" rel="noopener noreferrer"
                                style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: T.ink3, textDecoration: "none" }}>
                                All articles at shopappliances.com/blog ↗
                            </a>
                        </div>
                    </div>
                )}

                {/* SKILLS TAB */}
                {activeTab === "skills" && (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {SKILLS.map((s, i) => (
                            <div key={s.num} style={{
                                display: "grid",
                                gridTemplateColumns: "clamp(36px,5vw,56px) 1fr",
                                gap: "clamp(12px,2vw,24px)",
                                padding: "20px 0",
                                borderBottom: i < SKILLS.length - 1 ? `1px solid ${T.border}` : "none",
                            }}>
                                <div style={{ fontFamily: cond, fontWeight: 900, fontSize: "clamp(26px,2.5vw,37px)", color: T.border2, lineHeight: 1 }}>{s.num}</div>
                                <div>
                                    <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 18, letterSpacing: "0.06em", textTransform: "uppercase", color: T.ink, marginBottom: 7 }}>{s.title}</div>
                                    <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.1, color: T.ink2, margin: 0, maxWidth: 640}}>{s.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* OUTCOMES */}
            <div style={{ padding: "52px clamp(40px,8vw,120px)", background: T.bg2 }}>
                <div style={{ fontFamily: cond, fontWeight: 700, fontSize: "clamp(23px,2vw,26px)", textTransform: "uppercase", color: T.ink, marginBottom: 16 }}>What this demonstrates</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 8 }}>
                    {[
                        { t: "UX writing for real products", b: "Every article is written to serve a reader making a real purchasing decision — clarity, structure, and conversion-minded hierarchy throughout." },
                        { t: "Google P1 + AI citations", b: "Multiple articles rank page 1 on Google for target keywords. Content cited by ChatGPT, Gemini, and Notebook LM — a signal of authority that extends reach beyond traditional search." },
                        { t: "Data-driven content strategy", b: "Decisions backed by keyword research, GA4 session data, and conversion tracking — driving significant domain authority growth within months of publishing." },
                        { t: "Content + design alignment", b: "Blog strategy built in direct coordination with the brand page UI system — content funnel feeds directly into designed product and brand pages." },
                        { t: "Full-stack marketing scope", b: "Strategy → writing → taxonomy → SEO → analytics → iteration. End-to-end content ownership, not just execution." },
                    ].map((o, i) => (
                        <motion.div key={i} whileHover={{ background: "#fff", borderColor: T.pinkL }}
                            style={{ border: `1px solid ${T.border}`, borderRadius: 2, padding: "18px", background: T.bg, position: "relative", overflow: "hidden", transition: "all 0.2s" }}>
                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: [T.pink, T.sand, T.border2, T.pinkL][i] }} />
                            <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 16, textTransform: "uppercase", letterSpacing: "0.06em", color: T.pink, marginBottom: 8 }}>{o.t}</div>
                            <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.0, color: T.ink2, margin: 0}}>{o.b}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// ── ODOO CASE STUDY PANEL ─────────────────────────────────────────────────────
function OdooPanel() {
    const [activeSection, setActiveSection] = useState("sales")
    const [activeSubScreen, setActiveSubScreen] = useState(0)
    const [activeOrderState, setActiveOrderState] = useState(0)
    const [lightbox, setLightbox] = useState(null)

    const SECTIONS = [
        { id: "sales",    label: "Sales Order" },
        { id: "delivery", label: "Delivery" },
        { id: "dropship", label: "Dropship" },
        { id: "invoice",  label: "Invoice" },
        { id: "po",       label: "Purchase Order" },
        { id: "payment",  label: "Payment" },
        { id: "portal",   label: "Customer Portal" },
        { id: "components", label: "Components" },
    ]

    const SCREEN_GROUPS = {
        sales: {
            title: "Sales Order",
            desc: "Custom Odoo sales order redesigned for appliance retail — featuring a persistent cross-module nav bar, inline stock and pricing data, and 5 specialized tabs: Order Lines, Other Info, Spiff Details, Commission Details, and Notes.",
            screens: [
                { label: "Order Lines",   img: OI.sales_order,           desc: "Main order form showing product lines with IC Stock, Vendor Stock, Free to Use, and QTY On Hand surfaced inline — eliminating the need to navigate to Inventory to check availability. Product images, parts grouping, and margin calculation all visible on one screen." },
                { label: "Collapsed view", img: OI.sales_order_collapsed, desc: "Collapsed line view for scanning multiple products at once without scrolling through expanded detail rows. One-click expand per line for full detail." },
                { label: "Other Info",    img: OI.other_info,            desc: "Comprehensive Other Info tab restructured into four logical groups: Sales (salesperson, team, pricelist), Delivery (incoterms, shipping policy, delivery date), Invoicing (fiscal position, workflow), and Tracking (source document, opportunity, campaign)." },
                { label: "Spiff Details", img: OI.spiff,                 desc: "Custom Spiff tracking tab showing Return Spiff Amount, Total Spiff Amount, Spiff State, and Spiff Payment Status — surfaced directly on the order without requiring a separate module visit." },
                { label: "Commission",    img: OI.commission,            desc: "Commission Details tab showing commission tracking per sales rep — custom module built to handle appliance retail commission structures with split and override capabilities." },
                { label: "Notes",         img: OI.notes,                 desc: "Internal notes tab with rich text, @mentions, and activity scheduling — keeping all order communication in context rather than scattered across chatter." },
            ]
        },
        delivery: {
            title: "Delivery",
            desc: "Redesigned delivery management for appliance fulfillment — integrated with DispatchTrack for last-mile logistics, with custom fields for DT Service Unit, shipment ETA, and Send2AM/2TQL/2AMxPacks dispatch actions.",
            screens: [
                { label: "Operations",     img: OI.delivery,      desc: "Main delivery screen showing contact, DT Status, source/destination locations, paid status, and DispatchTrack integration. Action buttons (Send to DispatchTrack, Send2AM, Send2TQL, Check DT Delivery Status) accessible without navigating away. Operations tab shows product demand vs quantity with ETA column." },
                { label: "Additional Info", img: OI.delivery_info, desc: "Additional Info tab restructured into logical groups: Shipping (carrier, tracking, weight), Origin (source document, procurement group), and Misc (responsible, company). All previously buried in a single overwhelming tab." },
            ]
        },
        dropship: {
            title: "Dropship",
            desc: "Separate dropship fulfillment flow with its own document type (DS prefix) — sharing the DispatchTrack integration and delivery UI pattern but routing through vendor direct-ship rather than warehouse.",
            screens: [
                { label: "Operations",      img: OI.dropship,      desc: "Dropship record mirroring the delivery layout with DS prefix numbering. Same DispatchTrack integration, same action buttons, separate from warehouse delivery operations for clean routing logic." },
                { label: "Additional Info", img: OI.dropship_info,  desc: "Dropship-specific additional info with dropship-appropriate source document and procurement group fields." },
            ]
        },
        invoice: {
            title: "Invoice",
            desc: "Redesigned customer invoice linked directly to the sales order — auto-populated product lines, payment terms surfaced on the main form, and Journal Items for accounting reconciliation.",
            screens: [
                { label: "Invoice Lines",   img: OI.invoice,         desc: "Main invoice form showing INV number, customer, invoice/payment/delivery dates, payment terms (30 Days surfaced at top level — not buried in Other Info), and journal. Invoice Lines tab with full product/account/tax breakdown." },
                { label: "Journal Items",   img: OI.invoice_journal,  desc: "Journal Items tab showing debit/credit move lines for accounting reconciliation — accessible in context without leaving the invoice record." },
                { label: "Other Info",      img: OI.invoice_other,    desc: "Invoice Other Info tab with company, bank account, EDI, and auto-posting configuration — reorganized from the default Odoo layout to surface most-used fields first." },
            ]
        },
        po: {
            title: "Purchase Order",
            desc: "Customized purchase order for appliance procurement — mirroring the sales order field structure for consistency, with additional vendor-specific fields: deadline arrival, confirmation date, shipping type, tracking number, and pickup address.",
            screens: [
                { label: "Products",             img: OI.po,              desc: "PO main view matching the sales order layout — same product line structure with IC Stock, Vendor Stock, Qty on Hand inline. Send to InterCounty action for forwarding to distributor. Products, Other Info, and Special Instructions tabs." },
                { label: "Collapsed",            img: OI.po_collapsed,    desc: "Collapsed PO view for multi-product orders — same collapse pattern as the sales order for consistent scanning across document types." },
                { label: "Special Instructions", img: OI.po_instructions, desc: "Custom Special Instructions tab for vendor-specific delivery requirements, handling notes, and installation instructions — replacing free-text notes with structured fields." },
                { label: "Other Info",           img: OI.po_other,        desc: "PO Other Info tab with shipping, reception, and additional information organized into clear groupings. Incoterms, fiscal position, and source document in context." },
            ]
        },
        payment: {
            title: "Payment & Transactions",
            desc: "Payment processing screens covering individual payment records, transaction reconciliation, and freight payment tracking — all linked from the sales order cross-module nav bar.",
            screens: [
                { label: "Payment Record",       img: OI.payment,               desc: "Individual payment record (PBNK prefix) showing customer, amount, payment type (Send/Receive), journal, saved payment token, transaction ID (Stripe memo), and a payment reconcile action with credit/debit/full reconcile lines." },
                { label: "Payment Transactions", img: OI.payment_transactions,   desc: "Payment transactions detail view showing linked Stripe/payment gateway transaction details alongside the Odoo accounting record — eliminating the need to check the payment gateway separately." },
                { label: "Freight Payments",     img: OI.freight,               desc: "Dedicated freight payment tracking record — custom module for managing carrier payment reconciliation separate from customer payments." },
            ]
        },
        portal: {
            title: "Customer Portal — View Your Order",
            desc: "Custom customer-facing order portal showing real-time order status across the full fulfillment pipeline: Ordered → Processed → Allocated → Partially Shipped → Shipped. Designed to reduce inbound support calls by giving customers self-serve order visibility.",
            screens: [
                { label: "Ordered",           img: OI.view_ordered,   desc: "Initial order confirmation state — shows total amount, order pipeline status bar, sale information, invoicing/shipping addresses, contact support column, and full product list with quantities, pricing, and tax breakdown." },
                { label: "Allocated",         img: OI.view_allocated, desc: "Allocated state — inventory has been committed to the order. Status bar advances and messaging updates to reflect allocation confirmation." },
                { label: "Partially Shipped", img: OI.view_partial,   desc: "Partial shipment state — some items have shipped, others still pending. The status bar and product list reflect the split shipment state so customers understand exactly what's in transit." },
                { label: "Shipped",           img: OI.view_shipped,   desc: "Fully shipped state — all items dispatched. Final state in the customer-facing pipeline showing complete order fulfillment confirmation." },
            ]
        },
        components: {
            title: "Component Library",
            desc: "Full Odoo component library built for the custom redesign — covering all UI elements used across Sales Orders, Deliveries, Invoices, Purchase Orders, and the Customer Portal. Designed for consistency across 28+ screens and handoff to the Odoo developer.",
            screens: [
                { label: "All Components", img: OI.components, desc: "Complete component sheet: cross-module nav bar, status badges, action button variants, form field states, tab navigation, pipeline indicators, table rows, and all custom elements. Built to ensure visual consistency across every document type in the redesign." },
            ]
        },
    }

    const group = SCREEN_GROUPS[activeSection]
    const screens = group.screens
    const currentScreen = screens[Math.min(activeSubScreen, screens.length - 1)]

    const IMG_STYLE = {
        width: "100%",
        display: "block",
        height: "auto",
        objectFit: "unset",
    }

    return (
        <div style={{ borderTop: `1px solid ${T.pinkL}` }}>
            {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}

            {/* ── HEADER ── */}
            <div style={{ padding: "52px clamp(40px,8vw,120px) 48px", background: T.pinkBg, borderBottom: `1px solid ${T.pinkL}` }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 40, alignItems: "start" }}>
                    <div>
                        <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: T.pink, marginBottom: 12 }}>
                            UX Design · ERP · Jun – Oct 2025
                        </div>
                        <div style={{ fontFamily: cond, fontWeight: 900, fontSize: "clamp(37px,4vw,63px)", lineHeight: 0.96, textTransform: "uppercase", color: T.ink, marginBottom: 16 }}>
                            Odoo<br />
                            <span style={{ color: T.pink, fontStyle: "italic", fontWeight: 700 }}>Order System</span><br />
                            Redesign
                        </div>
                        <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.1, color: T.ink2, margin: 0, maxWidth: 640}}>
                            End-to-end redesign of Homery's Odoo ERP across the full order lifecycle — from pre-order questionnaire to customer delivery portal. Custom modules for appliance retail: spiff tracking, commission management, DispatchTrack integration, freight payments, and a branded customer order portal.
                        </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 28px" }}>
                            {[
                                { k: "Company",   v: "Homery" },
                                { k: "Platform",  v: "Odoo ERP" },
                                { k: "Modules",   v: "Sales · Purchase · Inventory · Accounting" },
                                { k: "Users",     v: "Ops · Sales · Warehouse · Accounting" },
                                { k: "Role",      v: "Lead UX Designer" },
                                { k: "Timeline",  v: "Jun – Oct 2025" },
                            ].map(m => (
                                <div key={m.k}>
                                    <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: T.border2, marginBottom: 4 }}>{m.k}</div>
                                    <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 18, letterSpacing: "0.04em", color: T.ink }}>{m.v}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── STATS ── */}
            <StatBar stats={[
                { num: "8",   label: "Screen groups",        accent: T.pink },
                { num: "28+", label: "Screens designed",     accent: T.sand },
                { num: "4",   label: "User roles",           accent: T.border2 },
                { num: "5",   label: "Custom modules",       accent: T.pinkL },
                { num: "3",   label: "Fulfillment types",    accent: T.pink },
                { num: "5",   label: "Order states (portal)",accent: T.sand },
            ]} />

            {/* ── PROBLEM ── */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", borderBottom: `1px solid ${T.border}` }}>
                <div style={{ padding: "32px 28px 32px clamp(40px,8vw,120px)", borderRight: `1px solid ${T.border}` }}>
                    <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: T.ink3, marginBottom: 12 }}>01 — The Problem</div>
                    <div style={{ fontFamily: cond, fontWeight: 700, fontSize: "clamp(26px,2.5vw,29px)", textTransform: "uppercase", color: T.ink, marginBottom: 12, lineHeight: 1.1 }}>Stock Odoo wasn't built<br />for appliance retail</div>
                    <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.1, color: T.ink2, margin: "0 0 12px"}}>
                        Homery's operations run across sales, purchasing, warehousing, dropship, accounting, and last-mile delivery — all with appliance-retail-specific requirements that Odoo's default modules don't address. Spiff tracking, commission management, DispatchTrack dispatch, freight payment reconciliation, and a customer-facing order portal all needed to be designed from scratch.
                    </p>
                    <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.1, color: T.ink2, margin: 0}}>
                        Beyond custom modules, the base UX needed a complete rethink — stock availability buried in Inventory, pricing tier hidden in CRM, order status requiring visits to three modules. The team was working around the system rather than through it.
                    </p>
                </div>
                <div style={{ padding: "32px 28px", background: T.bg2 }}>
                    <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: T.ink3, marginBottom: 14 }}>What needed solving</div>
                    {[
                        { t: "No unified order view",       b: "Checking order status required visiting Sales, Inventory, and Accounting separately. No cross-module status bar existed." },
                        { t: "Missing appliance retail fields", b: "No spiff tracking, commission management, distributor fields, or DispatchTrack integration. Teams used workarounds in notes and spreadsheets." },
                        { t: "No customer-facing portal",   b: "Customers called in to ask about order status. No self-serve visibility into the Ordered → Allocated → Shipped pipeline." },
                        { t: "Inventory visibility gap",    b: "Sales reps couldn't see IC Stock, Vendor Stock, or Free to Use quantities while building an order — requiring a tab switch to Inventory." },
                        { t: "Fragmented communications",   b: "No branded email templates for order events. Customers received generic Odoo emails or manual notifications from reps." },
                    ].map((p, i) => (
                        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "flex-start" }}>
                            <div style={{ width: 5, height: 5, borderRadius: "50%", background: T.pink, flexShrink: 0, marginTop: 5 }} />
                            <div>
                                <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 16, textTransform: "uppercase", letterSpacing: "0.06em", color: T.ink, marginBottom: 3 }}>{p.t}</div>
                                <div style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.0, color: T.ink2}}>{p.b}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── MAIN SCREEN EXPLORER ── */}
            <div style={{ borderBottom: `1px solid ${T.border}`, background: T.bg }}>
                <div style={{ padding: "52px clamp(40px,8vw,120px) 28px" }}>
                    <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: T.ink3, marginBottom: 8 }}>02 — Screen Explorer</div>
                    <div style={{ fontFamily: cond, fontWeight: 700, fontSize: "clamp(26px,2.5vw,29px)", textTransform: "uppercase", color: T.ink, marginBottom: 0 }}>28+ screens across 8 document types</div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "clamp(300px,42%,560px) 1fr", borderTop: `1px solid ${T.border}` }}>

                    {/* LEFT — label + description */}
                    <div style={{ padding: "36px clamp(40px,8vw,120px) 36px", borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column", gap: 20 }}>
                        <div style={{ fontFamily: cond, fontWeight: 900, fontSize: "clamp(22px,2vw,28px)", textTransform: "uppercase", color: T.ink, lineHeight: 1.1 }}>{currentScreen.label}</div>
                        <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.0, color: T.ink2, margin: 0 }}>{group.desc}</p>
                        <p style={{ fontFamily: mono, fontSize: 14, lineHeight: 2.0, color: T.ink3, margin: 0 }}>{currentScreen.desc}</p>
                    </div>

                    {/* RIGHT — tabs top, image bottom */}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ padding: "24px 32px", borderBottom: `1px solid ${T.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
                            {/* Section tabs */}
                            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                                {SECTIONS.map(s => (
                                    <button key={s.id} onClick={() => { setActiveSection(s.id); setActiveSubScreen(0) }} style={{
                                        fontFamily: mono, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase",
                                        padding: "6px 12px", borderRadius: 2,
                                        border: `1px solid ${activeSection === s.id ? T.pink : T.border2}`,
                                        background: activeSection === s.id ? T.pink : "transparent",
                                        color: activeSection === s.id ? "#fff" : T.ink3,
                                        cursor: "pointer", transition: "all 0.15s",
                                    }}>{s.label}</button>
                                ))}
                            </div>
                            {/* Sub-screen tabs */}
                            {screens.length > 1 && (
                                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                                    {screens.map((s, i) => (
                                        <button key={i} onClick={() => setActiveSubScreen(i)} style={{
                                            fontFamily: mono, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase",
                                            padding: "4px 10px", borderRadius: 2,
                                            border: `1px solid ${activeSubScreen === i ? T.ink : T.border}`,
                                            background: activeSubScreen === i ? T.ink : "transparent",
                                            color: activeSubScreen === i ? T.bg : T.ink3,
                                            cursor: "pointer", transition: "all 0.15s",
                                        }}>{s.label}</button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Image */}
                        <div style={{ padding: "36px clamp(32px,5vw,64px)", background: T.bg3, flex: 1 }}>
                            {/* Desktop browser chrome frame */}
                            <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 40px rgba(61,53,48,0.13), 0 2px 8px rgba(61,53,48,0.08)", border: `1px solid ${T.border2}` }}>
                                {/* Browser top bar */}
                                <div style={{ background: T.bg2, borderBottom: `1px solid ${T.border}`, padding: "8px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                                    <div style={{ display: "flex", gap: 5 }}>
                                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#e8607a", opacity: 0.6 }} />
                                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.sand, opacity: 0.6 }} />
                                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.sage, opacity: 0.6 }} />
                                    </div>
                                    <div style={{ flex: 1, background: T.bg3, borderRadius: 4, padding: "3px 10px", display: "flex", alignItems: "center", gap: 6 }}>
                                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.border2 }} />
                                        <span style={{ fontFamily: mono, fontSize: 10, color: T.ink3, letterSpacing: "0.04em" }}>homery.odoo.com</span>
                                    </div>
                                </div>
                                {/* Screen — constrained to 16:10 desktop ratio */}
                                <div
                                    onClick={() => currentScreen.img && setLightbox({ src: currentScreen.img, alt: currentScreen.label })}
                                    style={{ aspectRatio: "16/10", overflow: "hidden", cursor: currentScreen.img ? "zoom-in" : "default", background: T.bg2 }}>
                                    {currentScreen.img ? (
                                        <img src={currentScreen.img} alt={currentScreen.label} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
                                    ) : (
                                        <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <span style={{ fontFamily: mono, fontSize: 14, color: T.border2 }}>Image loading...</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {currentScreen.img && <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", color: T.ink3, marginTop: 10, textAlign: "center" }}>Click to view full size</div>}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── KEY DESIGN DECISIONS ── */}
            <div style={{ padding: "52px clamp(40px,8vw,120px)", borderBottom: `1px solid ${T.border}`, background: T.bg2 }}>
                <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: T.ink3, marginBottom: 8 }}>03 — Design Decisions</div>
                <div style={{ fontFamily: cond, fontWeight: 700, fontSize: "clamp(26px,2.5vw,29px)", textTransform: "uppercase", color: T.ink, marginBottom: 24 }}>Decisions that defined the system</div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {[
                        { num: "01", title: "Persistent cross-module nav bar", body: "Every document (Sales Order, PO, Delivery, Dropship, Payment, Invoice, Freight) carries a single top nav bar showing all linked records with counts. Clicking any item navigates directly without going back to a list view. This eliminated the most common navigation pain — 'I'm on the sales order, how do I get to the delivery?' — and made the system feel like one cohesive tool rather than six separate modules." },
                        { num: "02", title: "Inline stock visibility on order lines", body: "IC Stock, Vendor Stock, Free to Use, and QTY On Hand are surfaced directly on each order line row — in both Sales Orders and Purchase Orders. Sales reps no longer need to switch to Inventory to check availability while building a quote. This was the single change that saved the most time per transaction across the team." },
                        { num: "03", title: "Mirrored Sales Order and PO layout", body: "The Purchase Order was redesigned to mirror the Sales Order field structure exactly — same column order, same line row format, same tab layout. Staff working across both document types (most of the ops team) no longer need to mentally context-switch between two different form languages." },
                        { num: "04", title: "Customer portal order pipeline", body: "The 'View Your Order' portal replaced all inbound status calls with a self-serve tracking page. Five pipeline states (Ordered → Processed → Allocated → Partially Shipped → Shipped) are shown as a progress indicator matching the internal order status — so customers see exactly the same state the ops team sees, without delay or manual communication." },
                        { num: "05", title: "Custom tabs for appliance retail specifics", body: "The Sales Order was extended with Spiff Details, Commission Details, and a restructured Notes tab — rather than burying these in custom fields scattered across Other Info. Each business-critical data type gets its own tab with a clear label, making the order record the single source of truth for finance, sales management, and ops simultaneously." },
                        { num: "06", title: "DispatchTrack integrated into delivery flow", body: "Last-mile dispatch (Send to DispatchTrack, Send2AM, Send2TQL, Send2AMxPacks, Check DT Delivery Status) is accessible as action buttons directly on the Delivery and Dropship records — no separate login to the DispatchTrack dashboard. Delivery staff complete the full dispatch workflow without leaving Odoo." },
                    ].map((d, i) => (
                        <div key={d.num} style={{
                            display: "grid",
                            gridTemplateColumns: "clamp(36px,5vw,56px) 1fr",
                            gap: "clamp(12px,2vw,24px)",
                            padding: "20px 0",
                            borderBottom: i < 5 ? `1px solid ${T.border}` : "none",
                        }}>
                            <div style={{ fontFamily: cond, fontWeight: 900, fontSize: "clamp(26px,2.5vw,37px)", color: T.border2, lineHeight: 1 }}>{d.num}</div>
                            <div>
                                <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 18, letterSpacing: "0.06em", textTransform: "uppercase", color: T.ink, marginBottom: 6 }}>{d.title}</div>
                                <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.1, color: T.ink2, margin: 0, maxWidth: 640}}>{d.body}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── PROCESS ── */}
            <div style={{ padding: "52px clamp(40px,8vw,120px)", borderBottom: `1px solid ${T.border}`, background: T.bg }}>
                <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: T.ink3, marginBottom: 8 }}>04 — Process</div>
                <div style={{ fontFamily: cond, fontWeight: 700, fontSize: "clamp(26px,2.5vw,29px)", textTransform: "uppercase", color: T.ink, marginBottom: 20 }}>Jun – Oct 2025 · 4 phases</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 1, background: T.border, border: `1px solid ${T.border}`, borderRadius: 3, overflow: "hidden" }}>
                    {[
                        { num: "01", weeks: "Jun 2025", title: "Discovery & workflow mapping", body: "Embedded with all four user groups. Mapped every task across the full order lifecycle — from pre-order questionnaire to payment reconciliation. Identified where stock Odoo failed and where custom modules were needed.", detail: "Output: workflow map · 5 custom module requirements · friction inventory" },
                        { num: "02", weeks: "Jul 2025", title: "IA & module architecture", body: "Restructured the Odoo IA around the Homery order flow rather than Odoo's module boundaries. Designed the cross-module nav bar architecture. Specified custom module requirements for Spiff, Commission, and portal.", detail: "Output: IA map · nav bar spec · custom module requirements doc" },
                        { num: "03", weeks: "Aug – Sep 2025", title: "Wireframes & flow design", body: "Low-fidelity wireframes for all 8 document types with explicit before/after comparisons. Reviewed with all user groups. Iterated on the inline stock visibility pattern and cross-module nav bar until the ops team could complete all key tasks without module-switching.", detail: "Output: 60+ wireframe screens · 2 rounds of user review sessions" },
                        { num: "04", weeks: "Oct 2025", title: "High-fidelity UI & handoff", body: "Full high-fidelity designs for all screens, component library for Odoo custom views, email templates, and customer portal. Annotated specs for the Odoo developer covering all custom field additions and module requirements.", detail: "Output: 28+ final screens · component library · developer handoff doc" },
                    ].map((s, i) => (
                        <div key={s.num} style={{ background: T.bg, padding: "40px clamp(28px,4vw,52px)", position: "relative" }}>
                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: [T.pink, T.sand, T.border2, T.pinkL][i] }} />
                            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", color: T.pink, marginBottom: 5 }}>{s.weeks}</div>
                            <div style={{ fontFamily: cond, fontWeight: 900, fontSize: 28, color: T.border, lineHeight: 1, marginBottom: 8 }}>{s.num}</div>
                            <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 16, textTransform: "uppercase", letterSpacing: "0.06em", color: T.ink, marginBottom: 8 }}>{s.title}</div>
                            <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.0, color: T.ink2, margin: "0 0 10px"}}>{s.body}</p>
                            <div style={{ borderLeft: `2px solid ${T.pinkL}`, paddingLeft: 10, fontFamily: mono, fontSize: 13, color: T.ink2, lineHeight: 1.9 }}>{s.detail}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── OUTCOMES ── */}
            <div style={{ padding: "52px clamp(40px,8vw,120px)", background: T.pinkBg }}>
                <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: T.ink3, marginBottom: 8 }}>05 — Outcomes</div>
                <div style={{ fontFamily: cond, fontWeight: 700, fontSize: "clamp(26px,2.5vw,29px)", textTransform: "uppercase", color: T.ink, marginBottom: 20 }}>What changed for Homery</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 8, marginBottom: 16 }}>
                    {[
                        { t: "Single system feel", b: "CRM, Sales, Inventory and Accounting now share a unified design language and the cross-module nav bar — no longer feeling like four separate tools." },
                        { t: "Inline stock cuts navigation", b: "IC Stock, Vendor Stock, and Free to Use visible on every order line. Inventory tab visits during order building dropped to near zero." },
                        { t: "Customer portal reduces calls", b: "View Your Order gives customers real-time order pipeline visibility — eliminating the most frequent category of inbound support requests." },
                        { t: "Custom modules in Odoo context", b: "Spiff, Commission, DispatchTrack, Freight Payments, and Pre-Order Questionnaire all live in Odoo — no more spreadsheet workarounds or external tools for these workflows." },
                    ].map((o, i) => (
                        <motion.div key={i}
                            whileHover={{ background: "#fff", borderColor: T.pinkL }}
                            style={{ border: `1px solid ${T.border}`, borderRadius: 2, padding: "18px", background: T.bg, position: "relative", overflow: "hidden", transition: "all 0.2s" }}>
                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: [T.pink, T.sand, T.border2, T.pinkL][i] }} />
                            <div style={{ fontFamily: cond, fontWeight: 900, fontSize: "clamp(34px,3vw,48px)", color: T.border, lineHeight: 1, marginBottom: 8 }}>0{i+1}</div>
                            <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 16, textTransform: "uppercase", letterSpacing: "0.06em", color: T.pink, marginBottom: 6 }}>{o.t}</div>
                            <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.0, color: T.ink2, margin: 0}}>{o.b}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}


// ── SHOP APPLIANCES CASE STUDY PANEL ─────────────────────────────────────────
function ShopAppliancesPanel() {
    const [brandFilter, setBrandFilter] = useState("all")
    const visible = brandFilter === "all" ? SA_BRANDS : SA_BRANDS.filter(b => b.tier === brandFilter)

    return (
        <div style={{ borderTop: `1px solid ${T.pinkL}` }}>

            {/* ── HEADER STRIP ── */}
            <div style={{
                padding: "52px clamp(40px,8vw,120px) 40px",
                background: T.pinkBg,
                borderBottom: `1px solid ${T.pinkL}`,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 40,
                alignItems: "start",
            }}>
                <div>
                    <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: T.pink, marginBottom: 10 }}>
                        Product Design · E-Commerce · Jan 2026 — Ongoing
                    </div>
                    <div style={{ fontFamily: cond, fontWeight: 900, fontSize: "clamp(37px,4vw,59px)", lineHeight: 1, textTransform: "uppercase", color: T.ink, marginBottom: 12 }}>
                        Shop Appliances<br />
                        <span style={{ color: T.pink, fontStyle: "italic", fontWeight: 700 }}>Brand System</span>
                    </div>
                    <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.1, color: T.ink2, margin: 0, maxWidth: 420}}>
                        Designed and delivered a modular brand page system for Shop Appliances. The system covers every brand in their catalog, from mass-market household names to luxury European imports, each with a dedicated editorial landing page, structured category grid, and a comprehensive Figma spec used directly by the development team.
                    </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
                        {[
                            { k: "Company", v: "Homery" },
                            { k: "Product", v: "Shop Appliances" },
                            { k: "Role", v: "UI / UX Designer" },
                            { k: "Timeline", v: "Jan 2026 — Ongoing" },
                        ].map(m => (
                            <div key={m.k}>
                                <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: T.border2, marginBottom: 4 }}>{m.k}</div>
                                <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 18, letterSpacing: "0.06em", color: T.ink }}>{m.v}</div>
                            </div>
                        ))}
                    </div>
                    <a
                        href="https://www.shopappliances.com/brands"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontFamily: mono, fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", color: T.pink, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
                    >
                        shopappliances.com/brands <span>↗</span>
                    </a>
                </div>
            </div>

            {/* ── STATS ── */}
            <StatBar stats={SA_STATS.map((s, i) => ({ ...s, accent: [T.pink, T.sand, T.rust, T.sage][i] }))} cols={4} />

            {/* ── PROBLEM ── */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 0,
                borderBottom: `1px solid ${T.border}`,
            }}>
                <div style={{ padding: "52px clamp(40px,8vw,120px)", borderRight: `1px solid ${T.border}` }}>
                    <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: T.ink3, marginBottom: 12 }}>01 — The Problem</div>
                    <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 24, textTransform: "uppercase", color: T.ink, marginBottom: 12, lineHeight: 1.1 }}>Generic pages,<br />no brand identity</div>
                    <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.1, color: T.ink2, margin: "0 0 12px"}}>
                        Shop Appliances carries 35+ brands spanning three market tiers. Despite their depth of inventory, every brand was funneled through a generic collection page — no storytelling, no differentiation, no editorial hierarchy.
                    </p>
                    <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.1, color: T.ink2, margin: 0}}>
                        High-intent shoppers researching a specific brand were landing on pages identical to a plain filtered product list.
                    </p>
                </div>
                <div style={{ padding: "52px clamp(40px,8vw,120px)", background: T.bg2 }}>
                    <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: T.ink3, marginBottom: 16 }}>Constraints</div>
                    {[
                        "35+ brands with wildly different product depths — 1 category to 6+",
                        "Three tiers each requiring different editorial tone and layout density",
                        "Dev team needed pixel-accurate spec with no ongoing designer involvement",
                        "No existing component library to build on top of",
                        "Each page needed to function as a standalone SEO landing page",
                    ].map((item, i) => (
                        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                            <span style={{ color: T.pink, fontFamily: mono, fontSize: 14, marginTop: 1, flexShrink: 0 }}>—</span>
                            <span style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.0, color: T.ink2}}>{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── UX ROLE ── */}
            <div style={{ padding: "52px clamp(40px,8vw,120px)", borderBottom: `1px solid ${T.border}`, background: T.bg }}>
                <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: T.ink3, marginBottom: 20 }}>02 — UI / UX Thinking</div>
                <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 24, textTransform: "uppercase", color: T.ink, marginBottom: 24, lineHeight: 1.1 }}>Design decisions that shaped the system</div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {SA_UX.map((d, i) => (
                        <div key={d.num} style={{
                            display: "grid",
                            gridTemplateColumns: "clamp(40px,5vw,60px) 1fr",
                            gap: "clamp(12px,2vw,24px)",
                            padding: "20px 0",
                            borderBottom: i < SA_UX.length - 1 ? `1px solid ${T.border}` : "none",
                        }}>
                            <div style={{ fontFamily: cond, fontWeight: 900, fontSize: 30, color: T.border2, lineHeight: 1 }}>{d.num}</div>
                            <div>
                                <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 18, letterSpacing: "0.06em", textTransform: "uppercase", color: T.ink, marginBottom: 6 }}>{d.title}</div>
                                <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.05, color: T.ink2, margin: 0, maxWidth: 580}}>{d.body}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── BRANDS ── */}
            <div style={{ padding: "52px clamp(40px,8vw,120px)", borderBottom: `1px solid ${T.border}`, background: T.bg2 }}>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                    <div>
                        <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: T.ink3, marginBottom: 8 }}>03 — Brand Scope</div>
                        <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 24, textTransform: "uppercase", color: T.ink }}>Every brand, individually mapped</div>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {["all", "luxury", "premium", "mainstream"].map(f => (
                            <button key={f} onClick={() => setBrandFilter(f)} style={{
                                fontFamily: mono, fontSize: 13, letterSpacing: "0.08em", textTransform: "capitalize",
                                padding: "5px 12px", borderRadius: 2,
                                border: `1px solid ${brandFilter === f ? T.pink : T.border2}`,
                                background: brandFilter === f ? T.pink : "transparent",
                                color: brandFilter === f ? "#fff" : T.ink3,
                                cursor: "pointer",
                            }}>
                                {f === "all" ? "All" : f}
                            </button>
                        ))}
                    </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {visible.map(b => (
                        <motion.div key={b.name} whileHover={{ y: -2 }} style={{
                            background: T.bg,
                            border: `1px solid ${T.border}`,
                            borderRadius: 2,
                            padding: "8px 14px",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                        }}>
                            <span style={{ fontFamily: cond, fontWeight: 700, fontSize: 18, color: T.ink, letterSpacing: "0.04em" }}>{b.name}</span>
                            <span style={{
                                fontFamily: mono, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
                                padding: "2px 6px", borderRadius: 2,
                                background: SA_TIER[b.tier].bg,
                                color: SA_TIER[b.tier].color,
                            }}>{SA_TIER[b.tier].label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ── PROCESS ── */}
            <div style={{ padding: "52px clamp(40px,8vw,120px)", borderBottom: `1px solid ${T.border}`, background: T.bg }}>
                <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: T.ink3, marginBottom: 20 }}>04 — Process</div>
                <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 24, textTransform: "uppercase", color: T.ink, marginBottom: 24 }}>How it was built</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 1, background: T.border, border: `1px solid ${T.border}`, borderRadius: 3, overflow: "hidden" }}>
                    {SA_PROCESS.map((s, i) => (
                        <div key={s.num} style={{ background: T.bg, padding: "40px clamp(28px,4vw,52px)", position: "relative" }}>
                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: [T.pink, T.sand, T.rust, T.sage][i] }} />
                            <div style={{ fontFamily: cond, fontWeight: 900, fontSize: 34, color: T.border, lineHeight: 1, marginBottom: 8 }}>{s.num}</div>
                            <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 18, textTransform: "uppercase", letterSpacing: "0.06em", color: T.ink, marginBottom: 8 }}>{s.title}</div>
                            <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.0, color: T.ink2, margin: "0 0 12px"}}>{s.body}</p>
                            <div style={{ borderLeft: `2px solid ${T.pinkL}`, paddingLeft: 10, fontFamily: mono, fontSize: 13, color: T.ink2, lineHeight: 1.9 }}>{s.detail}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── LIVE PAGES ── */}
            <div style={{ padding: "52px clamp(40px,8vw,120px)", borderBottom: `1px solid ${T.border}`, background: T.bg2 }}>
                <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: T.ink3, marginBottom: 8 }}>05 — Published Work</div>
                <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 24, textTransform: "uppercase", color: T.ink, marginBottom: 20 }}>Live brand pages</div>
                <div style={{ display: "flex", flexDirection: "column", border: `1px solid ${T.border}`, borderRadius: 3, overflow: "hidden" }}>
                    {SA_LIVE.map((p, i) => (
                        <motion.div
                            key={p.brand}
                            whileHover={{ background: T.pinkBg }}
                            style={{
                                background: i % 2 === 0 ? T.bg : T.bg2,
                                borderBottom: i < SA_LIVE.length - 1 ? `1px solid ${T.border}` : "none",
                                padding: "16px 24px",
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                                gap: 20,
                                alignItems: "center",
                                transition: "background 0.15s",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <span style={{ fontFamily: cond, fontWeight: 700, fontSize: 20, letterSpacing: "0.04em", textTransform: "uppercase", color: T.ink }}>{p.brand}</span>
                                <span style={{
                                    fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
                                    padding: "3px 8px", borderRadius: 2,
                                    background: SA_TIER[p.tier].bg,
                                    color: SA_TIER[p.tier].color,
                                }}>{p.tier}</span>
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                                {p.cats.map(cat => (
                                    <span key={cat} style={{
                                        fontFamily: mono, fontSize: 11, letterSpacing: "0.05em",
                                        padding: "3px 8px", borderRadius: 2,
                                        border: `1px solid ${T.border}`,
                                        background: T.bg, color: T.ink3,
                                    }}>{cat}</span>
                                ))}
                            </div>
                            <a
                                href={p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    fontFamily: mono, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase",
                                    color: T.pink, textDecoration: "none",
                                    display: "flex", alignItems: "center", gap: 5,
                                    justifyContent: "flex-end",
                                }}
                            >
                                View live ↗
                            </a>
                        </motion.div>
                    ))}
                </div>
                <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}>
                    <a href="https://www.shopappliances.com/brands" target="_blank" rel="noopener noreferrer"
                        style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: T.ink3, textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}>
                        Full brand directory at shopappliances.com/brands ↗
                    </a>
                </div>
            </div>

            {/* ── OUTCOMES ── */}
            <div style={{ padding: "52px clamp(40px,8vw,120px)", background: T.bg }}>
                <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: T.ink3, marginBottom: 20 }}>06 — Outcomes</div>
                <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 24, textTransform: "uppercase", color: T.ink, marginBottom: 20 }}>What this unlocked</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
                    {[
                        { t: "Developer-ready spec", b: "Single Figma file serves as the complete build reference. Developers execute any brand page without a designer in the loop." },
                        { t: "Editorial brand presence", b: "Every brand page now leads with identity before product — increasing time on page and signaling premium positioning." },
                        { t: "Comparison framework", b: "Feature matrix creates standardized product intelligence across the catalog — shoppers understand differentiation at a glance." },
                        { t: "SEO infrastructure", b: "Brand + category queries now resolve to content-rich indexed pages, expanding organic entry points across the full catalog." },
                    ].map((o, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ background: T.pinkBg, borderColor: T.pinkL }}
                            style={{
                                border: `1px solid ${T.border}`,
                                borderRadius: 2,
                                padding: "20px 18px",
                                background: T.bg2,
                                position: "relative",
                                overflow: "hidden",
                                transition: "background 0.2s, border-color 0.2s",
                            }}
                        >
                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: [T.pink, T.sand, T.rust, T.sage][i] }} />
                            <div style={{ fontFamily: cond, fontWeight: 900, fontSize: 38, color: T.border, lineHeight: 1, marginBottom: 10 }}>0{i + 1}</div>
                            <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 18, textTransform: "uppercase", letterSpacing: "0.06em", color: T.ink, marginBottom: 8 }}>{o.t}</div>
                            <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.0, color: T.ink2, margin: 0}}>{o.b}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// ── SHARED COMPONENTS ─────────────────────────────────────────────────────────
function Tag({ label, variant = "pink" }) {
    const s = TAG_STYLES[variant]
    return (
        <motion.span whileHover={{ y: -2 }} style={{
            fontFamily: mono, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase",
            padding: "5px 12px", borderRadius: 2, whiteSpace: "nowrap", flexShrink: 0, ...s,
        }}>{label}</motion.span>
    )
}

function Chip({ label }) {
    const [active, setActive] = useState(false)
    const variants = [TAG_STYLES.pink, TAG_STYLES.sand, TAG_STYLES.mist, TAG_STYLES.sage]
    const [colorIdx, setColorIdx] = useState(0)
    return (
        <motion.span
            onClick={() => { setColorIdx((colorIdx + 1) % variants.length); setActive(true) }}
            onMouseLeave={() => setActive(false)}
            whileHover={{ scale: 1.03 }}
            style={{
                fontFamily: mono, fontSize: 13, letterSpacing: "0.06em", padding: "5px 12px", borderRadius: 2, cursor: "pointer",
                ...(active ? variants[colorIdx] : { background: "transparent", color: T.ink3, border: `1px solid ${T.border}` }),
            }}
        >{label}</motion.span>
    )
}

// ── WORK ROW ──────────────────────────────────────────────────────────────────
function WorkRow({ project, isOpen, onToggle }) {
    const accents = {
        "001": { label: "ERP · Systems Design", dots: ["64%","78%","88%"] },
        "002": { label: "E-Commerce · Brand", dots: ["60%","72%","84%"] },
        "003": { label: "Content · SEO", dots: ["65%","76%","87%"] },
        "004": { label: "Editorial · Print", dots: ["62%","74%","85%"] },
    }
    const accent = accents[project.num] || accents["001"]
    const rowRef = useRef(null)

    const handleToggle = () => {
        const opening = !isOpen
        onToggle()
        if (opening) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (rowRef.current) {
                        const top = rowRef.current.getBoundingClientRect().top + window.scrollY - 52
                        window.scrollTo({ top, behavior: "smooth" })
                    }
                })
            })
        }
    }

    return (
        <div ref={rowRef} style={{ borderBottom: `1px solid ${T.border}` }}>
            <motion.div
                data-cursor="true"
                onClick={handleToggle}
                animate={{ background: isOpen ? T.pinkBg : T.bg }}
                whileHover={{ background: isOpen ? T.pinkBg : T.bg2 }}
                style={{ cursor: "pointer", position: "relative", overflow: "hidden" }}
            >
                {/* Pink left accent bar */}
                <motion.div animate={{ opacity: isOpen ? 1 : 0.3, scaleY: isOpen ? 1 : 0.6 }}
                    style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: T.pink, transformOrigin: "top" }} />

                {/* Decorative dot pattern top-right */}
                <div style={{ position: "absolute", right: "clamp(60px,8vw,120px)", top: 0, bottom: 0, display: "flex", alignItems: "center", gap: 6, pointerEvents: "none" }}>
                    {accent.dots.map((opacity, i) => (
                        <motion.div key={i}
                            animate={{ opacity: isOpen ? 0.5 : 0.12, scale: isOpen ? 1 : 0.7 }}
                            transition={{ delay: i * 0.05 }}
                            style={{ width: 6, height: 6, borderRadius: "50%", background: T.pink }} />
                    ))}
                </div>

                <div style={{ padding: "clamp(22px,3vw,40px) clamp(40px,8vw,120px)" }}>
                    {/* Top row: num + type label */}
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                        <span style={{ fontFamily: serif, fontSize: 15, fontStyle: "italic", color: T.ink3, letterSpacing: "0.02em" }}>{project.num}</span>
                        <span style={{ flex: 1, height: 1, background: T.border }} />
                        <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: T.pink }}>{accent.label}</span>
                        <span style={{ fontFamily: mono, fontSize: 12, color: T.border2, letterSpacing: "0.06em" }}>{project.year}</span>
                        <Tag label={project.type} variant={project.typeVariant} />
                    </div>

                    {/* Title row */}
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20 }}>
                        <div style={{ flex: 1 }}>
                            <motion.div
                                animate={{ color: isOpen ? T.pink : T.ink }}
                                style={{ fontFamily: cond, fontWeight: 900, fontSize: "clamp(32px,3.8vw,64px)", letterSpacing: "0.01em", textTransform: "uppercase", lineHeight: 1.0, marginBottom: 12 }}
                            >{project.title}</motion.div>
                            {/* Description preview — hides when open */}
                            <motion.p
                                animate={{ opacity: isOpen ? 0 : 1, height: isOpen ? 0 : "auto" }}
                                transition={{ duration: 0.25 }}
                                style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.0, color: T.ink2, margin: 0, maxWidth: 560, overflow: "hidden"}}
                            >{project.desc}</motion.p>
                        </div>

                        {/* Right: expand */}
                        <div style={{ display: "flex", alignItems: "flex-end", flexShrink: 0, paddingBottom: 4 }}>
                            <motion.div
                                animate={{ rotate: isOpen ? 45 : 0, color: isOpen ? T.pink : T.ink3 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                style={{ fontSize: 22, lineHeight: 1, fontFamily: mono }}
                            >+</motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                style={{ overflow: "hidden", background: project.bgColor }}
            >
                {project.isTempo ? (
                    <TempoPanel />
                ) : project.isBlog ? (
                    <BlogPanel />
                ) : project.isOdoo ? (
                    <OdooPanel />
                ) : project.isShopAppliances ? (
                    <ShopAppliancesPanel />
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", borderTop: `1px solid ${T.pinkL}` }}>
                        <div style={{ borderRight: `1px solid ${T.pinkL}`, padding: "28px clamp(28px,4vw,56px)" }}>
                            <div style={{ height: 180, background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <span style={{ fontFamily: mono, fontSize: 14, color: T.border2, textAlign: "center", lineHeight: 1.7 }}>Project image<br />640 × 180px</span>
                            </div>
                        </div>
                        <div style={{ padding: "28px clamp(28px,4vw,56px)", display: "flex", flexDirection: "column", gap: 12 }}>
                            <span style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: T.pink }}>{project.tag}</span>
                            <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.05, color: T.ink2, margin: 0}}>{project.desc}</p>
                            <motion.span
                                data-cursor="true"
                                whileHover="hover"
                                initial="rest"
                                style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", gap: 8, fontFamily: cond, fontWeight: 700, fontSize: 16, letterSpacing: "0.1em", textTransform: "uppercase", color: T.pink, cursor: "pointer" }}
                            >
                                View case study
                                <motion.span variants={{ rest: { x: 0 }, hover: { x: 5 } }} transition={{ type: "spring", stiffness: 400 }}>→</motion.span>
                            </motion.span>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    )
}


// ── MAGNETIC PHOTO ────────────────────────────────────────────────────────────
// ── MIFFY-STYLE BUNNY SVG ─────────────────────────────────────────────────────
import BUNNY_GRID from './images_bunny.js'
const PixelBunny = ({ flip = false, color = "#2c2820" }) => {
    const W = 3
    const rows = BUNNY_GRID.length, cols = BUNNY_GRID[0].length
    const pw = cols * W, ph = rows * W
    return (
        <svg width={pw} height={ph} viewBox={`0 0 ${pw} ${ph}`}
            style={{ imageRendering: "pixelated", transform: flip ? "scaleX(-1)" : "none", display: "block" }}>
            {BUNNY_GRID.map((row, r) => row.map((cell, c) =>
                cell ? <rect key={`${r}-${c}`} x={c*W} y={r*W} width={W} height={W} fill={color} /> : null
            ))}
        </svg>
    )
}

function MagneticPhoto() {
    const ref = useRef(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const rotX = useTransform(y, [-80, 80], [6, -6])
    const rotY = useTransform(x, [-80, 80], [-6, 6])
    const [hovered, setHovered] = React.useState(false)

    const handleMove = (e) => {
        const r = ref.current.getBoundingClientRect()
        x.set(e.clientX - r.left - r.width / 2)
        y.set(e.clientY - r.top - r.height / 2)
    }
    const handleLeave = () => {
        animate(x, 0, { type: "spring", stiffness: 300 })
        animate(y, 0, { type: "spring", stiffness: 300 })
        setHovered(false)
    }

    return (
        <div ref={ref}
            onMouseMove={(e) => { handleMove(e); setHovered(true) }}
            onMouseLeave={handleLeave}
            data-cursor="true"
            style={{ flex: 1, position: "relative", overflow: "hidden", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", background: T.bg, cursor: "none", perspective: 1000 }}>



            {/* Flip card */}
            <motion.div
                animate={{ rotateY: hovered ? 180 : 0 }}
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                style={{ width: 280, height: 372, position: "relative", transformStyle: "preserve-3d", zIndex: 2 }}>

                {/* FRONT — pixel bunny card */}
                <div style={{
                    position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
                    background: "#fff8f6", padding: "24px 24px 48px",
                    boxShadow: "0 6px 28px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
                }}>
                    {/* Two pixel bunnies side by side */}
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 6 }}>
                        <PixelBunny color={T.ink} />
                        <PixelBunny color={T.pink} flip={true} />
                    </div>
                    {/* Polaroid caption */}
                    <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.12em", color: T.ink3, textTransform: "uppercase", textAlign: "center", lineHeight: 2.0 }}>
                        <span style={{ color: T.pink, fontSize: 9 }}>hover to meet me ♡</span>
                    </div>
                </div>

                {/* BACK — profile photo */}
                <div style={{
                    position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)", overflow: "hidden",
                }}>
                    <motion.div style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 700, width: "100%", height: "100%" }}>
                        <img src={PROFILE_PHOTO} alt="Sabrina Liu"
                            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

// ── STAT ─────────────────────────────────────────────────────────────────────
// ── UNIVERSAL STAT BAR ───────────────────────────────────────────────────────
const ACCENT_CYCLE = [T.pink, T.sand, T.border2, T.pinkL, T.sage, T.rust]

function StatBar({ stats, cols }) {
    const gridCols = cols ? `repeat(${cols}, 1fr)` : `repeat(auto-fit, minmax(130px,1fr))`
    return (
        <div style={{ display: "grid", gridTemplateColumns: gridCols, borderBottom: `1px solid ${T.border}` }}>
            {stats.map((s, i) => (
                <motion.div key={i} whileHover={{ background: T.pinkBg }}
                    style={{ padding: "44px clamp(32px,4vw,56px)", borderRight: i < stats.length - 1 ? `1px solid ${T.border}` : "none", background: i % 2 === 0 ? T.bg : T.bg2, position: "relative", transition: "background 0.2s" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: s.accent || ACCENT_CYCLE[i % ACCENT_CYCLE.length] }} />
                    <div style={{ fontFamily: cond, fontWeight: 900, fontSize: "clamp(36px,3.5vw,54px)", lineHeight: 1, color: T.pink, marginBottom: 8 }}>{s.num}</div>
                    <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: T.ink3, lineHeight: 1.8 }}>{s.label}</div>
                </motion.div>
            ))}
        </div>
    )
}

function Stat({ num, label }) {
    return (
        <motion.div whileHover={{ background: T.pinkBg }} style={{ padding: "44px clamp(32px,4vw,56px)", cursor: "default", background: T.bg2, transition: "background 0.2s", position: "relative" }}>
            <motion.div whileHover={{ scale: 1.06, originX: 0 }} style={{ fontFamily: bebas, fontSize: 60, lineHeight: 1, color: T.pink, letterSpacing: "0.04em", marginBottom: 8 }}>{num}</motion.div>
            <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: T.ink3, lineHeight: 1.8 }}>{label}</div>
        </motion.div>
    )
}

// ── CURSOR ───────────────────────────────────────────────────────────────────
function Cursor() {
    const x = useMotionValue(-100)
    const y = useMotionValue(-100)
    const [big, setBig] = useState(false)
    useEffect(() => {
        const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
        window.addEventListener("mousemove", move)
        return () => window.removeEventListener("mousemove", move)
    }, [])
    useEffect(() => {
        const targets = document.querySelectorAll("[data-cursor]")
        const on = () => setBig(true); const off = () => setBig(false)
        targets.forEach(el => { el.addEventListener("mouseenter", on); el.addEventListener("mouseleave", off) })
        return () => targets.forEach(el => { el.removeEventListener("mouseenter", on); el.removeEventListener("mouseleave", off) })
    })
    return (
        <motion.div
            style={{ position: "fixed", top: 0, left: 0, x, y, translateX: "-50%", translateY: "-50%", pointerEvents: "none", zIndex: 9999, borderRadius: "50%", mixBlendMode: "multiply" }}
            animate={big ? { width: 56, height: 56, background: "transparent", border: `1.5px solid ${T.pink}` } : { width: 12, height: 12, background: T.pink, border: "none" }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
    )
}

// ── LIGHTBOX ─────────────────────────────────────────────────────────────────
function Lightbox({ src, alt, onClose }) {
    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose() }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [onClose])
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, zIndex: 99999, background: "rgba(30,24,20,0.92)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "zoom-out", padding: 24 }}>
            <motion.img
                initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.25, ease: [0.4,0,0.2,1] }}
                src={src} alt={alt}
                onClick={e => e.stopPropagation()}
                style={{ maxWidth: "92vw", maxHeight: "88vh", objectFit: "contain", borderRadius: 16, boxShadow: "0 24px 80px rgba(0,0,0,0.5)", cursor: "default" }}
            />
            <div onClick={onClose} style={{ position: "absolute", top: 20, right: 24, color: "#fff", fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, letterSpacing: "0.1em", cursor: "pointer", opacity: 0.7 }}>ESC / CLOSE ✕</div>
        </motion.div>
    )
}


export default function Portfolio() {
    const [openRows, setOpenRows] = useState(new Set())
    const [tickerPaused, setTickerPaused] = useState(false)
    const tickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS]
    const toggleRow = (i) => setOpenRows(prev => { const next = new Set(prev); next.has(i) ? next.delete(i) : next.add(i); return next })

    return (
        <>
            <FontImport />
            <Cursor />
            <Grain />
            {/* Scroll-aware gutter — tracks current section bg */}
            {(() => {
                const [gutterColor, setGutterColor] = React.useState(T.bg)
                React.useEffect(() => {
                    const sections = [
                        { id: "nav-sentinel", color: T.bg3 },
                        { id: "work",         color: T.bg },
                        { id: "about",        color: T.bg2 },
                        { id: "contact",      color: T.pinkBg },
                    ]
                    const obs = new IntersectionObserver((entries) => {
                        entries.forEach(e => {
                            if (e.isIntersecting) {
                                const s = sections.find(s => s.id === e.target.id)
                                if (s) setGutterColor(s.color)
                            }
                        })
                    }, { threshold: 0.15 })
                    sections.forEach(s => {
                        const el = document.getElementById(s.id)
                        if (el) obs.observe(el)
                    })
                    return () => obs.disconnect()
                }, [])
                return (
                    <motion.div animate={{ background: gutterColor }} transition={{ duration: 0.6, ease: "easeInOut" }}
                        style={{ minHeight: "100vh", position: "relative" }}>

                        {/* NAV — full width, sits outside the content column */}
                        <div id="nav-sentinel" style={{ position: "sticky", top: 0, zIndex: 100, background: T.bg3, borderBottom: `1px solid ${T.border2}` }}>
                            <div style={{ maxWidth: 1440, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(40px,8vw,120px)", height: 52 }}>
                                <span style={{ fontFamily: "'AcroterionJF', cursive", fontWeight: 700, fontSize: 30, color: T.pink, letterSpacing: "0.01em" }}>Sabrina Liu</span>
                                <div style={{ display: "flex", gap: "clamp(16px,3vw,36px)" }}>
                                    {[["Work","work"],["About","about"],["Lab","lab"],["Contact","contact"]].map(([label, id]) => (
                                        <motion.span key={id} data-cursor="true"
                                            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                                            whileHover={{ color: T.pink }}
                                            style={{ fontFamily: cond, fontWeight: 600, fontSize: 14, letterSpacing: "0.18em", textTransform: "uppercase", color: T.ink3, cursor: "pointer" }}>{label}</motion.span>
                                    ))}
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: mono, fontSize: 12, letterSpacing: "0.1em", color: T.pink }}>
                                    <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} style={{ width: 6, height: 6, borderRadius: "50%", background: T.pink }} />
                                    Open to work
                                </div>
                            </div>
                        </div>

                        {/* Content column with gutters */}
                        <div style={{ background: T.bg, color: T.ink, fontFamily: cond, overflowX: "hidden" }}>

                {/* HERO */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr clamp(320px,38vw,480px)", minHeight: 560, borderBottom: `1px solid ${T.border}` }}>
                    <div style={{ padding: "48px clamp(40px,8vw,120px) 40px", display: "flex", flexDirection: "column", borderRight: `1px solid ${T.border}` }}>
                        <div>
                            <div style={{ fontFamily: mono, fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: T.ink3, display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                                <span style={{ display: "inline-block", width: 22, height: 1, background: T.ink3 }} />
                                Portfolio · 2024–2026
                            </div>
                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                                style={{ fontFamily: cond, fontWeight: 900, fontSize: "clamp(92px,11vw,170px)", lineHeight: 0.87, letterSpacing: "-0.02em", textTransform: "uppercase", color: T.ink }}>
                                SABRINA<br />
                                <span style={{ color: T.pink, fontStyle: "italic", fontWeight: 700 }}>LIU</span>
                            </motion.div>

                        </div>
                        <div style={{ marginTop: "auto", paddingTop: 22, borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
                            <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.15, color: T.ink2, maxWidth: 420, margin: 0}}>
                                UX Designer — ERP, e-commerce, brand systems.<br />Design systems that sell, flows that convert,<br />brands that mean something. Brooklyn, NY.
                            </p>
                            <motion.div data-cursor="true" whileHover={{ y: -2, background: "#d44c68" }} whileTap={{ y: 0 }}
                                style={{ fontFamily: cond, fontWeight: 700, fontSize: 18, letterSpacing: "0.12em", textTransform: "uppercase", background: T.pink, color: "#fff", padding: "13px 28px", borderRadius: 2, cursor: "pointer", flexShrink: 0 }}>
                                See work ↓
                            </motion.div>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <MagneticPhoto />
                        <div style={{ padding: "16px 20px", display: "flex", gap: 10, flexWrap: "nowrap", background: T.bg2, justifyContent: "space-between" }}>
                            <Tag label="UX Design" variant="pink" />
                            <Tag label="Branding" variant="sand" />
                            <Tag label="Systems" variant="mist" />
                            <Tag label="Framer" variant="sage" />
                        </div>
                    </div>
                </div>

                {/* TICKER */}
                <div style={{ height: 32, overflow: "hidden", borderBottom: `1px solid ${T.border}`, background: T.bg3, display: "flex", alignItems: "center" }}
                    onMouseEnter={() => setTickerPaused(true)} onMouseLeave={() => setTickerPaused(false)}>
                    <motion.div
                        animate={{ x: tickerPaused ? undefined : [0, -1200] }}
                        transition={{ duration: 22, repeat: Infinity, ease: "linear", repeatType: "loop" }}
                        style={{ display: "flex", whiteSpace: "nowrap" }}
                    >
                        {tickerItems.map((item, i) => (
                            <span key={i} style={{ fontFamily: mono, fontWeight: 700, fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: item.on ? T.pink : T.border2, padding: "0 20px", borderRight: `1px solid ${T.border}` }}>{item.text}</span>
                        ))}
                    </motion.div>
                </div>

                {/* WORK */}
                <div id="work" style={{ borderBottom: `1px solid ${T.border}` }}>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "16px clamp(40px,8vw,120px)", borderBottom: `1px solid ${T.border}`, flexWrap: "wrap", gap: 8 }}>
                        <span style={{ fontFamily: bebas, fontSize: 30, letterSpacing: "0.12em", textTransform: "uppercase", color: T.ink }}>Selected Work</span>
                        <span style={{ fontFamily: mono, fontSize: 14, color: T.ink3, letterSpacing: "0.1em" }}>click to expand</span>
                    </div>
                    {PROJECTS.map((p, i) => (
                        <WorkRow key={i} project={p} isOpen={openRows.has(i)} onToggle={() => toggleRow(i)} />
                    ))}
                </div>

                {/* ABOUT */}
                <motion.div id="about" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}
                    style={{ display: "grid", gridTemplateColumns: "1fr clamp(280px,38%,480px)", borderBottom: `1px solid ${T.border}` }}>

                    {/* LEFT — bio + principles */}
                    <div style={{ padding: "48px clamp(40px,8vw,120px)", borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column", gap: 28 }}>
                        <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: T.ink3, display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ display: "inline-block", width: 14, height: 1, background: T.ink3 }} />
                            02 — About
                        </div>
                        <div style={{ fontFamily: cond, fontWeight: 900, fontSize: "clamp(48px,5vw,80px)", lineHeight: 0.96, textTransform: "uppercase", color: T.ink }}>
                            The designer<br />behind<br /><em style={{ color: T.pink, fontStyle: "italic", fontWeight: 700 }}>the work.</em>
                        </div>
                        <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.1, color: T.ink2, maxWidth: 680, margin: 0}}>
                            I'm Sabrina, a UX and UI designer shaped by both studio art and data driven marketing.
                        </p>
                        <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.1, color: T.ink2, maxWidth: 680, margin: 0}}>
                            I started in studio art and later moved into data and marketing, where I learned how products perform in real contexts and how people actually interact with them. That experience still shapes how I design today. I think about how things look, but just as much about how they behave, how they scale, and what they ask of the people using them.
                        </p>
                        <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.1, color: T.ink2, maxWidth: 680, margin: 0}}>
                            I am most interested in the space where brand meets function. ERP workflows that still feel considered, e commerce experiences that sell without being loud, and editorial systems with clear hierarchy. To me, design is not just visual polish. It is structure, clarity, and a series of decisions that make something feel intuitive or frustrating.
                        </p>

                        {/* Design principles */}
                        <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 28 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                                <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.pink }}>Design principles</div>
                                <div style={{ flex: 1, height: 1, background: T.pinkL }} />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                                {[
                                    { n: "I", title: "Start with the right questions", body: "Good work comes from understanding what actually matters. I focus on identifying the most important gaps, shaping what needs to be explored, and connecting that back to product decisions." },
                                    { n: "II", title: "Structure and clarity come first", body: "Before thinking about visuals, I care about flows, hierarchy, and how something works end to end. The goal is to make things feel clear and usable, especially in real conditions where people are busy or distracted." },
                                    { n: "III", title: "Design should feel considered and intentional", body: "Every detail contributes to how a product feels. I think about tone, rhythm, and restraint, and use data as a tool to support decisions, not just to validate them." },
                                ].map((p, i, arr) => (
                                    <div key={p.n} style={{ display: "flex", gap: 0, borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none", paddingBottom: 18, paddingTop: i === 0 ? 0 : 18 }}>
                                        <div style={{ width: 36, flexShrink: 0 }}>
                                            <span style={{ fontFamily: serif, fontSize: 15, fontStyle: "italic", color: T.pink }}>{p.n}</span>
                                        </div>
                                        <div>
                                            <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 16, textTransform: "uppercase", letterSpacing: "0.06em", color: T.ink, marginBottom: 5 }}>{p.title}</div>
                                            <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.0, color: T.ink2, margin: 0}}>{p.body}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {["UX Research", "Systems Design", "Figma", "Framer", "SQL", "Python", "Tableau", "Data Analytics", "ERP Design", "Prototyping"].map(s => <Chip key={s} label={s} />)}
                        </div>
                    </div>

                    {/* RIGHT — editorial art+market panel */}
                    <div style={{ display: "flex", flexDirection: "column" }}>

                        {/* Pull quote — oversized editorial */}
                        <div style={{ padding: "40px 36px", background: T.pinkBg, borderBottom: `3px solid ${T.pink}`, position: "relative", overflow: "hidden" }}>
                            {/* decorative large quote mark */}
                            <div style={{ position: "absolute", top: -20, right: 24, fontFamily: serif, fontSize: 160, lineHeight: 1, color: T.pink, opacity: 0.25, pointerEvents: "none", userSelect: "none" }}>"</div>
                            <div style={{ fontFamily: cond, fontWeight: 900, fontSize: "clamp(22px,2.8vw,34px)", lineHeight: 1.15, color: T.pink, textTransform: "uppercase", fontStyle: "italic", marginBottom: 16, position: "relative" }}>
                                Where art direction meets systems thinking, and brand meets function.
                            </div>
                            <div style={{ width: 32, height: 2, background: T.pink, marginBottom: 14 }} />
                            <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.12em", color: T.ink3, textTransform: "uppercase" }}>Sabrina Liu · Brooklyn</div>
                        </div>

                        {/* Stats — horizontal with big type */}
                        <StatBar cols={2} stats={[
                            { num: "3+",  label: "Years in UX" },
                            { num: "40+", label: "Screens shipped" },
                            { num: "35%", label: "ROI uplift" },
                            { num: "4",   label: "Live products" },
                        ]} />

                        {/* Approach tags — market/brand language */}
                        <div style={{ padding: "24px 32px", borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, background: T.bg2 }}>
                            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.ink3, marginBottom: 14 }}>Approach</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                {[
                                    { icon: "◆", label: "Brand aware systems thinking" },
                                    { icon: "◆", label: "Data informed decision making" },
                                    { icon: "◆", label: "Editorial hierarchy in UI" },
                                    { icon: "◆", label: "Research before visual design" },
                                    { icon: "◆", label: "Art direction as part of UX" },
                                ].map((a, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <span style={{ color: T.pink, fontSize: 7 }}>◆</span>
                                        <span style={{ fontFamily: mono, fontSize: 13, color: T.ink2, letterSpacing: "0.02em" }}>{a.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Currently + Education stacked */}
                        <div style={{ padding: "24px 32px", borderBottom: `1px solid ${T.border}`, background: T.bg }}>
                            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.ink3, marginBottom: 14 }}>Currently</div>
                            {[
                                { dot: T.pink, label: "Open to full-time UX roles" },
                                { dot: T.sage, label: "Based in Brooklyn, NY" },
                                { dot: T.sand, label: "Available for freelance" },
                            ].map((item, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < 2 ? 9 : 0 }}>
                                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.dot, flexShrink: 0 }} />
                                    <span style={{ fontFamily: mono, fontSize: 13, color: T.ink2 }}>{item.label}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ padding: "24px 32px", background: T.bg2 }}>
                            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.ink3, marginBottom: 14 }}>Education</div>
                            {[
                                { school: "Columbia University", degree: "MS Applied Analytics", year: "2024" },
                                { school: "UW–Madison", degree: "BS Statistics · Studio Art Minor", year: "2023" },
                            ].map((e, i) => (
                                <div key={i} style={{ marginBottom: i === 0 ? 14 : 0, paddingBottom: i === 0 ? 14 : 0, borderBottom: i === 0 ? `1px solid ${T.border}` : "none" }}>
                                    <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 15, textTransform: "uppercase", letterSpacing: "0.04em", color: T.ink }}>{e.school}</div>
                                    <div style={{ fontFamily: mono, fontSize: 12, color: T.ink3, marginTop: 3 }}>{e.degree} · {e.year}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>


                {/* LAB SECTION */}
                <div id="lab">
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "16px clamp(40px,8vw,120px)", borderBottom: `1px solid ${T.border}`, borderTop: `1px solid ${T.border}`, flexWrap: "wrap", gap: 8, background: T.bg2 }}>
                        <span style={{ fontFamily: bebas, fontSize: 30, letterSpacing: "0.12em", textTransform: "uppercase", color: T.ink }}>Lab & Side Projects</span>
                        <span style={{ fontFamily: mono, fontSize: 14, color: T.ink3, letterSpacing: "0.1em" }}>editorial · print · experiments</span>
                    </div>
                    {/* Self-Care Scoop lab entry */}
                    <div style={{ borderBottom: `1px solid ${T.border}` }}>
                        <div style={{ padding: "clamp(22px,3vw,40px) clamp(40px,8vw,120px)", background: T.bg2, display: "flex", alignItems: "flex-start", gap: 32, flexWrap: "wrap" }}>
                            <div style={{ flex: 1, minWidth: 260 }}>
                                <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: T.sand, marginBottom: 10 }}>Editorial Design · Newsletter · Nov 2024</div>
                                <div style={{ fontFamily: cond, fontWeight: 900, fontSize: "clamp(28px,3vw,42px)", lineHeight: 0.96, textTransform: "uppercase", color: T.ink, marginBottom: 14 }}>
                                    The Self-Care Scoop
                                </div>
                                <p style={{ fontFamily: mono, fontSize: 15, lineHeight: 2.0, color: T.ink2, maxWidth: 560, margin: "0 0 16px" }}>
                                    Sole designer for Columbia SPS Office of Student Wellness newsletter. 17-page editorial layout borrowing hierarchy from consumer wellness magazines. Delivered 6 reusable templates for future issues.
                                </p>
                                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                    {["Editorial Design", "Typography", "Layout Systems", "Columbia SPS"].map(t => (
                                        <span key={t} style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 2, background: T.bg3, border: `1px solid ${T.border2}`, color: T.ink3 }}>{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <SelfCarePanel />
                    </div>
                </div>

                {/* CTA */}
                <motion.div id="contact" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}
                    style={{ padding: "72px clamp(40px,8vw,120px)", background: T.pinkBg, borderTop: `1px solid ${T.pinkL}`, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 28, flexWrap: "wrap" }}>
                    <div style={{ fontFamily: cond, fontWeight: 900, fontSize: "clamp(55px,7vw,110px)", lineHeight: 0.88, textTransform: "uppercase", color: T.ink }}>
                        Let's make<br />something that<br /><span style={{ color: T.pink, fontStyle: "italic" }}>feels like you.</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-end", flexShrink: 0 }}>
                        {[["jiayisabrina@gmail.com", "mailto:jiayisabrina@gmail.com"], ["LinkedIn", "https://www.linkedin.com/in/jiayisabrina/"], ["Resume PDF", "/Sabrina_Liu_Resume.pdf"]].map(([label, href]) => (
                            <motion.a key={label} href={href} download={label === "Resume PDF"} target={label === "Resume PDF" ? "_self" : "_blank"} data-cursor="true"
whileHover={{ color: T.pink }} style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: T.ink3, display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                                {label} <span style={{ color: T.pink }}>↗</span>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                </div>{/* end content column */}

                {/* FOOTER — full width */}
                <div style={{ background: T.bg3, borderTop: `1px solid ${T.border2}` }}>
                    <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 clamp(40px,8vw,120px)", height: 44, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontFamily: "'AcroterionJF', cursive", fontWeight: 600, fontSize: 16, color: T.ink3 }}>© 2026 Sabrina Liu — UX/UI Designer · Brooklyn, NY</span>
                        <span onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.1em", color: T.ink3, cursor: "pointer" }}>↑ Top</span>
                    </div>
                </div>

                    </motion.div>
                )
            })()}
        </>

    )
}