import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity, ArrowLeft, BarChart3, Bell, Box, Boxes, Check, ChevronDown,
  Database, Droplet, Expand, FileText, Flame, Gauge, GitBranch, Home,
  Info, Lightbulb, PanelLeftClose, Radio, RefreshCw, Search,
  Settings, SlidersHorizontal, SquareActivity, Thermometer, TrendingDown,
  TrendingUp, Waves,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import heroImg from "@/assets/hero-oilfield.jpg";
import twinImg from "@/assets/digital-twin.jpg";

export const Route = createFileRoute("/well-dynamics")({
  head: () => ({
    meta: [
      { title: "Well Dynamics — Baghewala Heavy-Oil Asset" },
      { name: "description", content: "Analyze Baghewala well performance, flow behavior, operating conditions, and model recommendations." },
      { property: "og:title", content: "Well Dynamics — Baghewala Heavy-Oil Asset" },
      { property: "og:description", content: "Analyze Baghewala well performance, flow behavior, operating conditions, and model recommendations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WellDynamicsPage,
});

type Condition = "normal" | "thermal" | "viscosity" | "drawdown" | "inflow";

type ConditionConfig = {
  label: string;
  description: string;
  icon: typeof Activity;
  tint: string;
};

const conditions: Array<[Condition, ConditionConfig]> = [
  ["normal", { label: "Normal Operation", description: "Baseline operating condition with current field parameters.", icon: TrendingUp, tint: "bg-amber-soft text-accent-foreground" }],
  ["thermal", { label: "Temperature / Thermal Variation", description: "Effect of temperature changes on fluids and well performance.", icon: Thermometer, tint: "bg-rose-soft text-rose-foreground" }],
  ["viscosity", { label: "High Viscosity Conditions", description: "Evaluate performance under increased viscosity and heavy oil flow.", icon: Droplet, tint: "bg-sky-soft text-sky-foreground" }],
  ["drawdown", { label: "Decline/Reduced Drawdown", description: "Low drawdown scenarios and reduced production conditions.", icon: BarChart3, tint: "bg-mint text-mint-foreground" }],
  ["inflow", { label: "Inflow / Pump Optimization", description: "Different inflow and artificial lift configurations.", icon: Settings, tint: "bg-sky-soft text-sky-foreground" }],
];

const navItems = [
  { icon: Home, label: "Dashboard", to: "/" as const },
  { icon: Activity, label: "Well Dynamics", to: "/well-dynamics" as const },
  { icon: Boxes, label: "Digital Twin" },
  { icon: SlidersHorizontal, label: "Simulation" },
  { icon: Gauge, label: "Optimization", to: "/optimization" as const },
  { icon: Radio, label: "Live Monitoring" },
  { icon: FileText, label: "Reports" },
];

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[208px] flex-col bg-sidebar text-sidebar-foreground lg:flex">
      <div className="flex items-center gap-2.5 px-5 pb-6 pt-4">
        <Flame className="h-6 w-6 text-sidebar-primary" fill="currentColor" />
        <div><p className="text-sm font-bold text-sidebar-accent-foreground">BAGHEWALA</p><p className="text-[9px] text-sidebar-foreground/60">HEAVY-OIL ASSET</p></div>
        <PanelLeftClose className="ml-auto h-4 w-4 text-sidebar-foreground/50" />
      </div>
      <nav className="space-y-1 px-2">
        {navItems.map((item) => item.to ? (
          <Link key={item.label} to={item.to} className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-xs ${item.label === "Well Dynamics" ? "bg-sidebar-primary font-semibold text-sidebar-primary-foreground" : "text-sidebar-foreground/85 hover:bg-sidebar-accent"}`}>
            <item.icon className="h-4 w-4" />{item.label}
          </Link>
        ) : (
          <div key={item.label} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-xs text-sidebar-foreground/85"><item.icon className="h-4 w-4" />{item.label}</div>
        ))}
        <p className="border-t border-sidebar-border px-3 pb-2 pt-5 text-[9px] tracking-wider text-sidebar-foreground/45">TOOLS</p>
        <div className="flex items-center gap-3 px-3 py-2 text-xs"><Database className="h-4 w-4" />Data Explorer</div>
        <div className="flex items-center gap-3 px-3 py-2 text-xs"><GitBranch className="h-4 w-4" />Scenarios</div>
      </nav>
      <div className="mx-3 mb-3 mt-auto overflow-hidden rounded-lg border border-sidebar-border bg-sidebar-accent/35">
        <img src={twinImg} alt="Field digital twin geological model" className="h-24 w-full object-cover" />
        <div className="p-3"><p className="text-sm font-semibold text-sidebar-accent-foreground">Field Digital Twin</p><p className="mt-1 text-[10px] leading-relaxed text-sidebar-foreground/65">Integrated simulation &amp; real-time data for better decisions.</p></div>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="flex h-14 items-center border-b border-border bg-card/95 px-4 lg:px-7">
      <div className="flex w-full max-w-[430px] items-center gap-2 rounded-md border border-input bg-background px-3 py-1.5">
        <Search className="h-4 w-4 text-muted-foreground" /><input aria-label="Search" placeholder="Search wells, parameters, or scenarios..." className="min-w-0 flex-1 bg-transparent text-xs outline-none" /><kbd className="rounded border border-border px-1.5 py-0.5 text-[9px] text-muted-foreground">Ctrl + K</kbd>
      </div>
      <div className="ml-auto flex items-center gap-3"><Button variant="ghost" size="icon" aria-label="Notifications" className="relative"><Bell /><span className="absolute right-2 top-1.5 h-2 w-2 rounded-full bg-destructive" /></Button><Button variant="ghost" size="icon" aria-label="Settings"><Settings /></Button><div className="hidden items-center gap-2 border-l border-border pl-4 sm:flex"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-[11px] font-bold text-background">OI</div><div><p className="text-xs font-bold">Oil India Limited</p><p className="text-[9px] text-muted-foreground">Operator</p></div><ChevronDown className="ml-3 h-4 w-4" /></div></div>
    </header>
  );
}

function SoftSparkline({ tone }: { tone: "red" | "blue" | "green" | "amber" }) {
  const colors = { red: "var(--rose-foreground)", blue: "var(--sky-foreground)", green: "var(--mint-foreground)", amber: "var(--amber-brand)" };
  return <svg viewBox="0 0 140 34" className="h-8 w-36" fill="none"><path d="M2 27 C12 28 16 18 27 20 S40 11 50 18 S65 26 74 18 S88 22 98 15 S112 18 122 12 S133 12 139 8" stroke={colors[tone]} strokeWidth="1.8" /><path d="M2 27 C12 28 16 18 27 20 S40 11 50 18 S65 26 74 18 S88 22 98 15 S112 18 122 12 S133 12 139 8 L139 34 L2 34 Z" fill={colors[tone]} opacity=".1" /></svg>;
}

const liveMetrics = [
  { label: "BHT / TEMPERATURE", value: "85.6", unit: "°C", icon: Thermometer, tint: "bg-rose-soft text-rose-foreground", tone: "red" as const },
  { label: "VISCOSITY", value: "2,233", unit: "cP", icon: Droplet, tint: "bg-sky-soft text-sky-foreground", tone: "blue" as const },
  { label: "ANNULAR PRESSURE", value: "2.1", unit: "bar", icon: Gauge, tint: "bg-mint text-mint-foreground", tone: "green" as const },
  { label: "WELL RATE", value: "87", unit: "m³/d", detail: "2,100 bbl/d (OIL)", icon: Waves, tint: "bg-amber-soft text-accent-foreground", tone: "amber" as const },
];

function MetricCards() {
  return <section className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">{liveMetrics.map((m) => <div key={m.label} className="flex min-h-[82px] items-center rounded-lg border border-border bg-card px-4 shadow-sm"><div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${m.tint}`}><m.icon className="h-5 w-5" /></div><div className="ml-3"><p className="text-[9px] font-semibold text-muted-foreground">{m.label}</p><p className="text-xl font-bold">{m.value} <span className="text-xs font-medium text-muted-foreground">{m.unit}</span></p>{m.detail && <p className="text-[10px] font-medium text-muted-foreground">{m.detail}</p>}</div><div className="ml-auto self-end pb-2"><span className="mb-2 block text-right text-[8px] font-bold text-violet-foreground">MODELLED</span><SoftSparkline tone={m.tone} /></div></div>)}</section>;
}

function Conditions({ active, onChange }: { active: Condition; onChange: (value: Condition) => void }) {
  return <section className="rounded-lg border border-border bg-card p-2.5 shadow-sm"><div className="mb-2 flex items-center"><div className="mr-2 flex h-7 w-7 items-center justify-center rounded-md bg-amber-soft text-accent-foreground"><SquareActivity className="h-4 w-4" /></div><div><h2 className="text-xs font-bold">Choose an operating condition</h2><p className="text-[9px] text-muted-foreground">Select a scenario to analyze well performance under different conditions.</p></div><Button variant="outline" size="sm" className="ml-auto h-7 text-[10px]" onClick={() => onChange("normal")}><RefreshCw />Reset to default</Button></div><div className="grid gap-2 md:grid-cols-2 xl:grid-cols-5">{conditions.map(([id, c]) => <button key={id} onClick={() => onChange(id)} className={`relative flex min-h-[66px] items-center gap-3 rounded-md border p-2 text-left transition-colors ${active === id ? "border-primary bg-amber-soft/35" : "border-border bg-background hover:bg-muted"}`}><div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${c.tint}`}><c.icon className="h-5 w-5" /></div><div><p className="text-[10px] font-bold leading-tight">{c.label}</p><p className="mt-1 text-[9px] leading-tight text-muted-foreground">{c.description}</p></div>{active === id && <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-2.5 w-2.5" /></span>}</button>)}</div></section>;
}

function OperationCard({ active }: { active: Condition }) {
  const chosen = conditions.find(([id]) => id === active)?.[1];
  return <section className="rounded-lg border border-border bg-card p-3 shadow-sm"><div className="flex items-start gap-2"><span className="mt-0.5 h-3 w-3 rounded-full bg-mint-foreground ring-8 ring-mint" /><div><h2 className="text-sm font-bold">Current well operation</h2><p className="text-[10px] text-muted-foreground">Live model outputs for the selected scenario.</p></div></div><div className="mt-2 rounded-md border border-mint-foreground/10 bg-mint/70 p-3"><div className="flex gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mint text-mint-foreground"><TrendingUp /></div><div><span className="rounded bg-mint px-2 py-1 text-[9px] font-bold text-mint-foreground">{chosen?.label.toUpperCase()}</span><p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">The well is operating under {chosen?.label.toLowerCase()} conditions. The current BHT is within the expected range and flow appears stable with no major deviations.</p></div></div></div><div className="mt-2 divide-y divide-border text-[10px]">{[
    ["Status", "Stable", "Current operation is stable with no critical deviations.", "status"],
    ["Expected behavior", "", "Fluid mobility is consistent with model predictions.", "trend"],
    ["Remarks", "", "Continue monitoring key parameters for early detection of anomalies.", "note"],
  ].map(([label, value, text, kind]) => <div key={label} className="grid grid-cols-[84px_70px_1fr] items-center gap-2 py-3"><strong>{label}</strong><span className="flex items-center gap-2 font-semibold">{kind === "status" ? <span className="h-3 w-3 rounded-full bg-mint-foreground" /> : kind === "trend" ? <TrendingUp className="h-4 w-4 text-sky-foreground" /> : <FileText className="h-4 w-4 text-accent-foreground" />}{value}</span><span className="text-muted-foreground">{text}</span></div>)}</div></section>;
}

function WellDiagram() {
  return <svg viewBox="0 0 760 310" className="h-full min-h-[290px] w-full" preserveAspectRatio="none" aria-label="Well cross-section from surface to reservoir">
    <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop stopColor="var(--background)"/><stop offset="1" stopColor="var(--sky-soft)"/></linearGradient><linearGradient id="oil" x1="0" y1="0" x2="1" y2="0"><stop stopColor="var(--amber-soft)"/><stop offset=".7" stopColor="var(--amber-brand)"/><stop offset="1" stopColor="var(--rose-foreground)"/></linearGradient></defs>
    <rect width="760" height="310" fill="url(#sky)" />
    {[0,1,2,3,4,5].map(i => <g key={i}><path d={`M70 ${42+i*43} C180 ${27+i*43}, 270 ${61+i*42}, 370 ${44+i*43} S560 ${61+i*42}, 665 ${46+i*43} L665 ${84+i*43} C550 ${99+i*42}, 460 ${66+i*43}, 350 ${84+i*43} S170 ${70+i*43},70 ${86+i*43} Z`} fill={i===4 ? "url(#oil)" : i%2 ? "var(--amber-soft)" : "var(--muted)"} opacity={i===4 ? .8 : .9}/><path d={`M70 ${63+i*43} C180 ${45+i*43}, 270 ${78+i*42}, 370 ${61+i*43} S560 ${78+i*42}, 665 ${63+i*43}`} fill="none" stroke="var(--border)" strokeWidth="1"/></g>)}
    {[0,500,1000,1500,2000,2500,3000].map((d,i)=><g key={d}><text x="8" y={32+i*42} fontSize="11" fill="var(--muted-foreground)">{d.toLocaleString()} m</text><line x1="59" y1={28+i*42} x2="67" y2={28+i*42} stroke="var(--border)"/></g>)}
    <g transform="translate(552,2)"><path d="M27 34 L54 75 H0 Z M27 34 V255 M8 75 H47 M5 88 H50" fill="none" stroke="var(--sky-foreground)" strokeWidth="3"/><rect x="15" y="74" width="24" height="191" rx="3" fill="var(--card)" stroke="var(--foreground)" strokeWidth="3"/><rect x="21" y="75" width="12" height="190" fill="var(--sky-soft)" stroke="var(--sky-foreground)"/><path d="M27 78 V260" stroke="var(--rose-foreground)" strokeWidth="4"/><rect x="11" y="239" width="32" height="33" fill="var(--card)" stroke="var(--amber-brand)" strokeWidth="3"/><path d="M8 246 H0 M8 254 H0 M46 246 H54 M46 254 H54" stroke="var(--amber-brand)" strokeWidth="3"/><path d="M27 260 V291" stroke="var(--sky-foreground)" strokeWidth="3"/></g>
    {[["Wellhead",75],["Conductor",96],["Surface Casing",122],["Production Casing",168],["Tubing",213],["Perforation Zone",252],["Reservoir (Heavy Oil)",274],["TD (Total Depth)",302]].map(([label,y],i)=><g key={String(label)}><line x1="590" y1={Number(y)} x2="700" y2={Number(y)} stroke={i===6 ? "var(--amber-brand)" : "var(--sky-foreground)"} strokeWidth="1"/><circle cx="700" cy={Number(y)} r="3" fill={i===6 ? "var(--amber-brand)" : "var(--sky-foreground)"}/><text x="709" y={Number(y)+4} fontSize="10" fontWeight="600" fill={i===6 ? "var(--amber-brand)" : "var(--sky-foreground)"}>{label}</text></g>)}
  </svg>;
}

function WellPanel() {
  const [unit, setUnit] = useState<"m" | "ft">("m"); const [view, setView] = useState("2D View"); const [overlays, setOverlays] = useState([true,true,false,true]);
  return <section className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"><div className="flex min-h-10 flex-wrap items-center gap-2 border-b border-border px-3"><Box className="h-4 w-4 text-sky-foreground"/><h2 className="text-[11px] font-bold">2D/3D INTERACTIVE WELL (DYNAMICIZED VIEW)</h2><div className="ml-auto flex gap-1"><div className="flex overflow-hidden rounded-md border border-border">{(["m","ft"] as const).map(v=><Button key={v} size="sm" variant={unit===v?"default":"ghost"} className="h-7 rounded-none px-3 text-[9px]" onClick={()=>setUnit(v)}>{v}</Button>)}</div><div className="ml-4 flex overflow-hidden rounded-md border border-border">{["2D View","3D View","PIP","Well Section"].map(v=><Button key={v} size="sm" variant={view===v?"default":"ghost"} className="h-7 rounded-none px-3 text-[9px]" onClick={()=>setView(v)}>{v}</Button>)}</div><Button size="icon" variant="outline" className="h-7 w-7" aria-label="Expand"><Expand /></Button><Button size="sm" variant="outline" className="h-7 text-[9px]"><RefreshCw />Reset</Button></div></div><div className="grid xl:grid-cols-[1fr_250px]"><div className="overflow-hidden"><WellDiagram /></div><aside className="border-t border-border p-3 xl:border-l xl:border-t-0"><h3 className="flex items-center gap-2 text-[11px] font-bold text-sky-foreground"><Info className="h-3.5 w-3.5"/>Layer Information</h3><dl className="mt-2 grid grid-cols-[85px_1fr] gap-y-1.5 text-[9px]"><dt className="text-muted-foreground">Formation</dt><dd className="truncate font-medium">Baghewala (Lower Paleozoic)</dd><dt className="text-muted-foreground">Depth (TVD)</dt><dd className="font-medium">2,850 – 3,050 m</dd><dt className="text-muted-foreground">Temperature</dt><dd className="font-medium">85.6 °C</dd><dt className="text-muted-foreground">Pressure</dt><dd className="font-medium">220 bar</dd><dt className="text-muted-foreground">Lithology</dt><dd className="font-medium">Sandstone</dd><dt className="text-muted-foreground">Fluid</dt><dd className="font-medium">Heavy Oil</dd></dl><Button size="sm" variant="secondary" className="mt-2 w-full text-[9px]">View detailed properties →</Button><div className="my-2 border-t border-border"/><h3 className="text-[10px] font-bold">Model overlays</h3><div className="mt-2 space-y-1">{[["Temperature profile","bg-rose-foreground"],["Pressure profile","bg-sky-foreground"],["Flow regime","bg-mint-foreground"],["Reservoir layers","bg-amber-brand"]].map(([label,tint],i)=><div key={label} className="flex items-center gap-2 text-[9px]"><span className={`h-2.5 w-2.5 rounded-full ${tint}`}/><span className="flex-1">{label}</span><Switch checked={overlays[i] ?? false} onCheckedChange={(checked)=>setOverlays(old=>old.map((v,j)=>j===i?checked:v))} className="scale-75"/></div>)}</div></aside></div></section>;
}

const scores = [
  { label:"Production rate", value:"87", unit:"m³/d", detail:"2,100 bbl/d", icon: SquareActivity, tint:"bg-amber-soft text-accent-foreground", tone:"green" as const },
  { label:"Drawdown", value:"45", unit:"bar", icon: TrendingDown, tint:"bg-sky-soft text-sky-foreground", tone:"blue" as const },
  { label:"Reservoir pressure", value:"220", unit:"bar", icon: Gauge, tint:"bg-amber-soft text-accent-foreground", tone:"amber" as const },
  { label:"Thermal gradient", value:"2.8", unit:"°C/100m", icon: Thermometer, tint:"bg-rose-soft text-rose-foreground", tone:"blue" as const },
];

function BottomPanels() {
  return <section className="grid gap-2 xl:grid-cols-[1.35fr_1fr]"><div className="rounded-lg border border-border bg-card p-3 shadow-sm"><div className="flex items-center gap-2"><div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-soft text-accent-foreground"><SquareActivity className="h-4 w-4"/></div><div><h2 className="text-xs font-bold">Well performance scorecard</h2><p className="text-[9px] text-muted-foreground">Key indicators for the selected operating condition.</p></div></div><div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{scores.map(s=><div key={s.label} className="flex min-h-[65px] items-center rounded-md border border-border bg-background p-2"><div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.tint}`}><s.icon className="h-5 w-5"/></div><div className="ml-2"><p className="text-[9px] text-muted-foreground">{s.label}</p><p className="text-sm font-bold">{s.value} <span className="text-[9px] font-medium text-muted-foreground">{s.unit}</span></p>{s.detail&&<p className="text-[8px] text-muted-foreground">{s.detail}</p>}</div><div className="ml-auto self-end"><SoftSparkline tone={s.tone}/></div></div>)}</div></div><div className="rounded-lg border border-border bg-card p-3 shadow-sm"><div className="flex items-center gap-2"><div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-soft text-accent-foreground"><Lightbulb className="h-4 w-4"/></div><div><h2 className="text-xs font-bold">Suggestions / Recommendations</h2><p className="text-[9px] text-muted-foreground">Model based insights for improved performance.</p></div></div><ul className="mt-2 rounded-md border border-sky-foreground/10 bg-sky-soft/45 px-4 py-2 text-[9px] leading-relaxed text-muted-foreground">{["Current operation is within stable range.","Consider optimizing drawdown to improve recovery.","Monitor temperature trends for early detection of heavy oil viscosity increase.","Evaluate artificial lift options if production starts declining."].map(t=><li key={t} className="flex gap-2"><span className="text-sky-foreground">•</span>{t}</li>)}</ul></div></section>;
}

function WellDynamicsPage() {
  const [condition, setCondition] = useState<Condition>("normal"); const [mode, setMode] = useState<"model"|"combined">("combined");
  return <div className="min-h-screen bg-background"><Sidebar/><div className="lg:pl-[208px]"><Topbar/><main className="min-w-[720px] space-y-2.5 p-3"><section className="relative min-h-[100px] overflow-hidden border-b border-border"><img src={heroImg} alt="Baghewala oil field" className="absolute inset-0 h-full w-full object-cover opacity-55"/><div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20"/><div className="relative flex h-full items-center justify-between gap-6 px-6 py-3"><div className="border-l-2 border-primary pl-6"><Link to="/" className="flex items-center gap-2 text-xs font-semibold text-accent-foreground"><ArrowLeft className="h-4 w-4"/>Baghewala Heavy-Oil Asset</Link><h1 className="mt-1 text-3xl font-bold">Well Dynamics</h1><p className="text-xs text-muted-foreground">Track well performance, understand flow behavior and predict operating conditions.</p></div><div className="flex gap-2 rounded-lg border border-border bg-card/85 p-1.5 shadow-sm backdrop-blur"><Button variant={mode==="model"?"default":"ghost"} size="sm" onClick={()=>setMode("model")}><Box/>Model only view</Button><Button variant={mode==="combined"?"default":"ghost"} size="sm" onClick={()=>setMode("combined")}><BarChart3/>Data + Model view</Button></div></div></section><Conditions active={condition} onChange={setCondition}/><MetricCards/><section className="grid gap-2 xl:grid-cols-[34%_66%]"><OperationCard active={condition}/><WellPanel/></section><BottomPanels/></main></div></div>;
}
