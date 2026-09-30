import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Activity, BarChart3, Bell, Boxes, ChevronDown, CircleDollarSign, Database,
  Droplet, FileText, Flame, Gauge, GitBranch, Network, PanelLeftClose, Play,
  Plus, Radio, RefreshCw, Search, Settings, Shield, SlidersHorizontal,
  Sparkles, Target, Thermometer, TrendingUp, Wrench, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-oilfield.jpg";
import twinImg from "@/assets/digital-twin.jpg";

export const Route = createFileRoute("/optimization")({
  head: () => ({
    meta: [
      { title: "Optimization — Baghewala Heavy-Oil Asset" },
      { name: "description", content: "Optimize Baghewala production, energy use, equipment risk, and reservoir protection." },
      { property: "og:title", content: "Optimization — Baghewala Heavy-Oil Asset" },
      { property: "og:description", content: "Optimize Baghewala production, energy use, equipment risk, and reservoir protection." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OptimizationPage,
});

const navItems = [
  { icon: Gauge, label: "Dashboard", to: "/" as const },
  { icon: Boxes, label: "Digital Twin" },
  { icon: Activity, label: "Well Dynamics", to: "/well-dynamics" as const },
  { icon: SlidersHorizontal, label: "Simulation" },
  { icon: Network, label: "Optimization", to: "/optimization" as const },
  { icon: Radio, label: "Live Monitoring" },
  { icon: FileText, label: "Reports" },
];

function Sidebar() {
  return <aside className="fixed inset-y-0 left-0 z-40 hidden w-[196px] flex-col bg-sidebar text-sidebar-foreground lg:flex">
    <div className="flex items-center gap-2 px-5 pb-5 pt-4"><Flame className="h-7 w-7 text-sidebar-primary" fill="currentColor"/><div><p className="text-sm font-bold text-sidebar-accent-foreground">BAGHEWALA</p><p className="text-[9px] text-sidebar-foreground/60">HEAVY-OIL ASSET</p></div><PanelLeftClose className="ml-auto h-4 w-4 text-sidebar-foreground/50"/></div>
    <nav className="space-y-1 px-2">{navItems.map(item => item.to ? <Link key={item.label} to={item.to} className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-xs ${item.label === "Optimization" ? "bg-sidebar-primary font-semibold text-sidebar-primary-foreground" : "text-sidebar-foreground/85 hover:bg-sidebar-accent"}`}><item.icon className="h-4 w-4"/>{item.label}</Link> : <div key={item.label} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-xs text-sidebar-foreground/85"><item.icon className="h-4 w-4"/>{item.label}</div>)}
      <p className="border-t border-sidebar-border px-3 pb-2 pt-5 text-[9px] tracking-wider text-sidebar-foreground/45">TOOLS</p>
      <div className="flex items-center gap-3 px-3 py-2 text-xs"><Database className="h-4 w-4"/>Data Explorer</div><div className="flex items-center gap-3 px-3 py-2 text-xs"><GitBranch className="h-4 w-4"/>Scenarios</div>
    </nav>
    <div className="mx-3 mb-3 mt-auto overflow-hidden rounded-lg border border-sidebar-border bg-sidebar-accent/35"><img src={twinImg} alt="Field digital twin geological model" className="h-24 w-full object-cover"/><div className="p-3"><p className="text-sm font-semibold text-sidebar-accent-foreground">Field Digital Twin</p><p className="mt-1 text-[10px] leading-relaxed text-sidebar-foreground/65">Integrated simulation &amp; real-time data for better decisions.</p></div></div>
  </aside>;
}

function Topbar() {
  return <header className="flex h-11 items-center border-b border-border bg-card px-5"><div className="flex w-[420px] items-center gap-2 rounded-md border border-input bg-background px-3 py-1.5"><Search className="h-3.5 w-3.5 text-muted-foreground"/><input aria-label="Search" placeholder="Search wells, scenarios, or parameters..." className="min-w-0 flex-1 bg-transparent text-[10px] outline-none"/><kbd className="text-[9px] text-muted-foreground">Ctrl + K</kbd></div><div className="ml-auto flex items-center gap-3"><Button size="icon" variant="ghost" className="relative h-8 w-8" aria-label="Notifications"><Bell/><span className="absolute right-1.5 top-1 h-2 w-2 rounded-full bg-destructive"/></Button><Button size="icon" variant="ghost" className="h-8 w-8" aria-label="Settings"><Settings/></Button><div className="flex items-center gap-2 border-l border-border pl-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">OI</span><div><p className="text-[10px] font-bold">Oil India Limited</p><p className="text-[8px] text-muted-foreground">Operator</p></div><ChevronDown className="ml-2 h-3.5 w-3.5"/></div></div></header>;
}

const toneClasses = {
  rose: "bg-rose-soft text-rose-foreground",
  sky: "bg-sky-soft text-sky-foreground",
  mint: "bg-mint text-mint-foreground",
  violet: "bg-violet-soft text-violet-foreground",
  amber: "bg-amber-soft text-accent-foreground",
};
type Tone = keyof typeof toneClasses;

function Sparkline({ tone }: { tone: Tone }) {
  const stroke = { rose:"var(--rose-foreground)", sky:"var(--sky-foreground)", mint:"var(--mint-foreground)", violet:"var(--violet-foreground)", amber:"var(--amber-brand)" }[tone];
  return <svg viewBox="0 0 100 28" className="h-7 w-24" fill="none"><path d="M1 24 C12 25 17 20 25 20 S38 9 47 16 S60 10 68 13 S82 8 99 6" stroke={stroke} strokeWidth="1.7"/><path d="M1 24 C12 25 17 20 25 20 S38 9 47 16 S60 10 68 13 S82 8 99 6 L99 28 L1 28Z" fill={stroke} opacity=".1"/></svg>;
}

const stateMetrics: Array<{ label:string; value:string; unit?:string; note?:string; badge:string; icon:typeof Gauge; tone:Tone }> = [
  { label:"TEMPERATURE", value:"58.0", unit:"°C", badge:"MODELLED", icon:Thermometer, tone:"rose" },
  { label:"VISCOSITY", value:"5,014.1", unit:"cP", badge:"MODELLED", icon:Droplet, tone:"sky" },
  { label:"PRODUCTION", value:"0.8", unit:"BOPD", note:"+0.0 vs baseline", badge:"BASELINE", icon:Database, tone:"mint" },
  { label:"SRP LOAD", value:"58", unit:"/100", badge:"MODELLED", icon:Zap, tone:"violet" },
  { label:"ROD FLOATING", value:"20", unit:"/100", note:"LOW", badge:"MODELLED", icon:Wrench, tone:"amber" },
  { label:"RISK", value:"LOW", badge:"MODELLED", icon:Shield, tone:"amber" },
];

function CurrentState() {
  return <section className="rounded-md border border-border bg-card p-2 shadow-sm"><div className="mb-2 flex items-center gap-2"><Network className="h-4 w-4 text-primary"/><div><h2 className="text-[11px] font-bold">Current operating state</h2><p className="text-[9px] text-muted-foreground">Live model outputs for the selected scenario.</p></div></div><div className="grid grid-cols-6 gap-2">{stateMetrics.map(m => <div key={m.label} className="flex h-[65px] items-center rounded-md border border-border bg-background px-2"><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${toneClasses[m.tone]}`}><m.icon className="h-4 w-4"/></span><div className="ml-2"><p className="text-[8px] font-semibold text-muted-foreground">{m.label}</p><p className="text-[17px] font-bold leading-tight">{m.value} <span className="text-[9px] font-medium">{m.unit}</span></p>{m.note&&<p className={`text-[8px] font-semibold ${m.tone === "mint" ? "text-mint-foreground" : "text-accent-foreground"}`}>{m.note}</p>}</div><div className="ml-auto self-stretch pt-1"><span className={`block text-right text-[7px] font-bold ${m.tone === "amber" ? "text-accent-foreground" : "text-violet-foreground"}`}>{m.badge}</span><div className="mt-1"><Sparkline tone={m.tone}/></div></div></div>)}</div></section>;
}

type Variable = { name:string; value:number; min:number; max:number; unit:string; tone:Tone; icon:typeof Gauge; description:string };
const initialVariables: Variable[] = [
  { name:"Pumping Rate", value:8, min:2, max:20, unit:"m³/d", tone:"sky", icon:Network, description:"Controls the flow rate of the well by adjusting the surface VFD motor speed." },
  { name:"Sucker Rod Stroke Length", value:120, min:60, max:200, unit:"inch", tone:"amber", icon:TrendingUp, description:"Adjusts the displacement per stroke and affects total production capacity." },
  { name:"Stroke Frequency", value:8, min:4, max:14, unit:"spm", tone:"violet", icon=Zap, description:"Sets the number of pump strokes each minute." },
  { name:"Tubing Head Pressure", value:220, min:100, max:400, unit:"bar", tone:"mint", icon:Gauge, description:"Controls the surface backpressure acting on the production tubing." },
  { name:"Inflow Control Valve", value:75, min:0, max:100, unit:"%", tone:"rose", icon:Droplet, description:"Regulates reservoir inflow to balance production and reservoir protection." },
  { name:"Gas Lift Rate", value:0, min:0, max:500, unit:"m³/d", tone:"sky", icon:Activity, description:"Sets supplemental gas injection used to reduce fluid column density." },
];

function Range({ value, min, max, onChange, label }: { value:number; min:number; max:number; onChange:(value:number)=>void; label:string }) {
  return <input aria-label={label} type="range" min={min} max={max} step={(max-min)/100} value={value} onChange={e=>onChange(Number(e.target.value))} className="h-1.5 w-full cursor-pointer accent-primary"/>;
}

function VariableWorkbench({ variables, setVariables }: { variables:Variable[]; setVariables:(v:Variable[])=>void }) {
  const [selected, setSelected] = useState(0); const current = variables[selected] ?? variables[0];
  const update = (index:number, value:number) => setVariables(variables.map((item,i)=>i===index?{...item,value}:item));
  if (!current) return null;
  const impacts = [{name:"Production",value:"+12%",tone:"mint",width:"78%"},{name:"Energy/Cost",value:"+8%",tone:"sky",width:"62%"},{name:"Equipment Risk",value:"-5%",tone:"rose",width:"34%"},{name:"Reservoir Risk",value:"-3%",tone:"amber",width:"25%"},{name:"Well Stability",value:"+6%",tone:"violet",width:"57%"}] as const;
  return <section className="grid grid-cols-[1.55fr_.77fr_.52fr] gap-2"><div className="rounded-md border border-border bg-card p-2 shadow-sm"><div className="mb-2 flex items-center gap-2"><Network className="h-4 w-4 text-primary"/><div><h2 className="text-xs font-bold">Key optimization variables</h2><p className="text-[9px] text-muted-foreground">Adjustable parameters for optimization. Ranges are defined based on equipment limits and field constraints.</p></div><Button size="sm" variant="outline" className="ml-auto h-7 text-[9px]"><SlidersHorizontal/>View constraints</Button></div><div className="overflow-hidden rounded-md border border-border"><div className="grid grid-cols-[1.25fr_.45fr_2.8fr_.45fr] bg-muted/60 px-3 py-1.5 text-[9px] font-bold"><span>Parameter</span><span>Current</span><span/><span>Unit</span></div>{variables.map((v,i)=><button key={v.name} onClick={()=>setSelected(i)} className={`grid w-full grid-cols-[1.25fr_.45fr_2.8fr_.45fr] items-center border-t border-border px-3 py-1.5 text-left text-[9px] ${selected===i?"bg-sky-soft/60":"bg-card hover:bg-muted/50"}`}><span className="flex items-center gap-2 font-semibold"><i className={`flex h-5 w-5 items-center justify-center rounded-full not-italic ${toneClasses[v.tone]}`}><v.icon className="h-3 w-3"/></i>{v.name}</span><span className="rounded border border-border bg-background py-1 text-center font-semibold">{v.value.toFixed(v.value<10?1:0)}</span><span className="grid grid-cols-[32px_1fr_32px] items-center gap-3 px-4"><small className="text-right">{v.min.toFixed(v.min<10?1:0)}</small><Range label={v.name} value={v.value} min={v.min} max={v.max} onChange={value=>update(i,value)}/><small>{v.max.toFixed(v.max<10?1:0)}</small></span><span>{v.unit}</span></button>)}</div></div>
    <div className="rounded-md border border-border bg-card p-3 shadow-sm"><h2 className="text-xs font-bold text-sky-foreground">Parameter details</h2><div className="mt-3 flex items-center gap-2"><span className={`flex h-9 w-9 items-center justify-center rounded-full ${toneClasses[current.tone]}`}><current.icon className="h-4 w-4"/></span><div><p className="text-[11px] font-bold">{current.name}</p><p className="text-[9px] text-muted-foreground">Surface VFD motor speed control.</p></div></div><div className="mt-2 grid grid-cols-[42px_1fr_42px] items-center gap-2"><span className="rounded border border-border py-1 text-center text-[10px] font-bold">{current.min}</span><Range label={`${current.name} detail`} value={current.value} min={current.min} max={current.max} onChange={value=>update(selected,value)}/><span className="rounded border border-border py-1 text-center text-[10px] font-bold">{current.max}</span></div><div className="mt-3 grid grid-cols-3 gap-1.5">{[["Current Value",current.value,current.tone],["Min Limit",current.min,"violet"],["Max Limit",current.max,"amber"]].map(([label,value,tone])=><div key={String(label)} className={`rounded-md border border-border p-2 ${toneClasses[tone as Tone]}`}><p className="text-[8px]">{label}</p><p className="text-[12px] font-bold">{Number(value).toFixed(Number(value)<10?1:0)} <span className="text-[8px]">{current.unit}</span></p></div>)}</div><p className="mt-3 text-[9px] font-bold">Description</p><p className="mt-1 text-[9px] text-muted-foreground">{current.description}</p><div className="mt-3 rounded-md border border-primary/25 bg-amber-soft/55 p-2"><p className="text-[9px] font-bold text-accent-foreground">Note</p><p className="text-[8px] text-muted-foreground">Changes in pumping rate directly affect production, pressure behavior and energy consumption.</p></div></div>
    <div className="rounded-md border border-border bg-card p-3 shadow-sm"><h2 className="text-xs font-bold">Parameter impact <span className="font-normal text-muted-foreground">(from model)</span></h2><div className="mt-4 space-y-3">{impacts.map(x=><div key={x.name} className="grid grid-cols-[82px_1fr_34px] items-center gap-2 text-[9px]"><span>{x.name}</span><span className="h-2 overflow-hidden rounded-full bg-muted"><i className={`block h-full rounded-full ${toneClasses[x.tone]}`} style={{width:x.width}}/></span><strong className={x.value.startsWith("+")?"text-mint-foreground":"text-rose-foreground"}>{x.value}</strong></div>)}</div><Button variant="outline" size="sm" className="mt-5 w-full text-[9px] text-sky-foreground"><BarChart3/>View sensitivity analysis</Button></div></section>;
}

type Weight = { name:string; subtitle:string; value:number; tone:Tone; icon:typeof Gauge };
const initialWeights:Weight[] = [
  {name:"Production Weight",subtitle:"Maximize oil production",value:.30,tone:"rose",icon:Target},
  {name:"Energy/Cost Weight",subtitle:"Minimize energy consumption and cost",value:.25,tone:"sky",icon:Droplet},
  {name:"Equipment Risk Weight",subtitle:"Minimize equipment wear and failure risk",value:.25,tone:"mint",icon:Database},
  {name:"Reservoir Risk Weight",subtitle:"Minimize reservoir damage",value:.20,tone:"amber",icon:Shield},
];

function TradeOff({ weights, setWeights }: { weights:Weight[]; setWeights:(v:Weight[])=>void }) {
  return <section className="rounded-md border border-border bg-card p-2 shadow-sm"><div className="mb-2 flex items-center"><Shield className="mr-2 h-4 w-4 text-primary"/><h2 className="text-xs font-bold">Trade-Off Engine – Multi-objective Optimization (Adjust Weights)</h2><Button variant="outline" size="sm" className="ml-auto h-7 text-[9px]" onClick={()=>setWeights(initialWeights)}><RefreshCw/>Reset to default</Button></div><div className="grid grid-cols-4 gap-2">{weights.map((w,i)=><div key={w.name} className={`grid grid-cols-[38px_1fr_40px] items-center rounded-md border border-border p-2 ${toneClasses[w.tone]}`}><span className={`flex h-8 w-8 items-center justify-center rounded-full bg-card/70`}><w.icon className="h-4 w-4"/></span><div><p className="text-[9px] font-bold">{w.name}</p><p className="text-[8px] text-muted-foreground">{w.subtitle}</p><Range label={w.name} min={0} max={1} value={w.value} onChange={value=>setWeights(weights.map((x,j)=>j===i?{...x,value}:x))}/></div><strong className="ml-2 rounded border border-border bg-card px-1 py-1 text-center text-[9px]">{w.value.toFixed(2)}</strong></div>)}</div></section>;
}

type ScenarioState = "CURRENT"|"READY"|"NOT RUN"|"COMPLETE";
const scenarioSeed = [
  {name:"Baseline (Current)",desc:"Current operating condition as a reference.",state:"CURRENT" as ScenarioState,tone:"sky" as Tone},
  {name:"Max Production",desc:"Optimize for maximum oil production.",state:"READY" as ScenarioState,tone:"mint" as Tone},
  {name:"Min Energy / Max Efficiency",desc:"Minimize energy consumption while maintaining stability.",state:"NOT RUN" as ScenarioState,tone:"violet" as Tone},
  {name:"Low Risk Operation",desc:"Conservative operation with minimum equipment risk.",state:"NOT RUN" as ScenarioState,tone:"amber" as Tone},
  {name:"Custom Scenario 1",desc:"User defined operating condition.",state:"NOT RUN" as ScenarioState,tone:"sky" as Tone},
];

function Scenarios() {
  const [states,setStates]=useState(scenarioSeed.map(x=>x.state)); const run=(i:number)=>setStates(states.map((s,j)=>j===i?"COMPLETE":s));
  return <section className="rounded-md border border-border bg-card p-2 shadow-sm"><div className="flex items-center"><Sparkles className="mr-2 h-4 w-4 text-primary"/><div><h2 className="text-xs font-bold">Optimization scenarios</h2><p className="text-[9px] text-muted-foreground">Predefined and custom scenarios for analysis.</p></div><div className="ml-auto flex gap-2"><Button size="sm" variant="outline" className="h-7 text-[9px]" onClick={()=>setStates(states.map(()=>"COMPLETE"))}><Play/>Run All Scenarios</Button><Button size="sm" variant="outline" className="h-7 text-[9px]"><Plus/>Add Scenario</Button></div></div><div className="mt-2 grid grid-cols-5 gap-2">{scenarioSeed.map((x,i)=><div key={x.name} className="rounded-md border border-border bg-background p-2"><div className="flex min-h-10 gap-2"><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${toneClasses[x.tone]}`}><Target className="h-3.5 w-3.5"/></span><div className="min-w-0"><p className="text-[9px] font-bold">{i+1}. {x.name}</p><p className="truncate text-[8px] text-muted-foreground">{x.desc}</p></div><span className={`ml-auto h-fit rounded px-1 py-0.5 text-[7px] font-bold ${states[i]==="COMPLETE"||states[i]==="READY"?"bg-mint text-mint-foreground":"bg-sky-soft text-sky-foreground"}`}>{states[i]}</span></div><div className="mt-2 grid grid-cols-3 divide-x divide-border rounded bg-muted/50 py-1 text-center"><div><p className="text-[7px] text-muted-foreground">Production</p><b className="text-[9px]">{states[i]==="COMPLETE"?"1.1 BOPD":i===0?"0.8 BOPD":"–"}</b></div><div><p className="text-[7px] text-muted-foreground">Energy/Cost</p><b className="text-[9px]">{states[i]==="COMPLETE"?"82":"–"}</b></div><div><p className="text-[7px] text-muted-foreground">Risk</p><b className="text-[9px]">{states[i]==="COMPLETE"?"LOW":i===0?"LOW":"–"}</b></div></div><div className="mt-1.5 flex gap-2"><Button size="sm" className="h-6 flex-1 text-[8px]" onClick={()=>run(i)}><Play/>Run</Button><Button size="sm" variant="outline" className="h-6 flex-1 text-[8px]"><BarChart3/>View Results</Button></div></div>)}</div></section>;
}

function Results({ variables }: { variables:Variable[] }) {
  const production = useMemo(()=>Math.max(.8,variables[0]?.value??8)/8*.8,[variables]);
  return <section className="grid grid-cols-[1fr_1.05fr] gap-2"><div className="rounded-md border border-border bg-card p-2 shadow-sm"><div className="mb-2 flex items-center gap-2"><Network className="h-4 w-4 text-primary"/><div><h2 className="text-xs font-bold">Optimization results</h2><p className="text-[8px] text-muted-foreground">Best operating condition based on selected weights and constraints.</p></div></div><div className="grid grid-cols-4 gap-2">{[["Optimal Production",`${production.toFixed(1)} BOPD`,"mint"],["Energy/Cost","82 /100","sky"],["Equipment Risk","LOW","amber"],["Reservoir Risk","LOW","violet"]].map(([a,b,t])=><div key={a} className={`rounded-md border border-border p-2 ${toneClasses[t as Tone]}`}><p className="text-[8px] font-semibold">{a}</p><p className="mt-1 text-[12px] font-bold">{b}</p></div>)}</div></div><div className="rounded-md border border-border bg-card p-2 shadow-sm"><div className="flex items-center gap-2"><Shield className="h-4 w-4 text-mint-foreground"/><div><h2 className="text-xs font-bold">Engineering recommendations</h2><p className="text-[8px] text-muted-foreground">System recommendations based on optimization results.</p></div></div><ul className="mt-2 rounded-md bg-mint/60 p-2 text-[8px] leading-relaxed">{["Increase pumping rate within optimal range to improve production.","Consider optimizing stroke frequency for better energy efficiency.","Monitor tubing head pressure to avoid exceeding equipment limits."].map(x=><li key={x} className="flex gap-2"><span className="font-bold text-mint-foreground">✓</span>{x}</li>)}</ul></div></section>;
}

function OptimizationPage() {
  const [variables,setVariables]=useState(initialVariables); const [weights,setWeights]=useState(initialWeights); const [live,setLive]=useState(true);
  return <div className="min-h-screen bg-background"><Sidebar/><div className="lg:pl-[196px]"><div className="min-w-[1120px]"><Topbar/><main className="space-y-2.5 p-3"><section className="relative min-h-[66px] overflow-hidden border-b border-border"><img src={heroImg} alt="Baghewala field pumpjacks" className="absolute inset-0 h-full w-full object-cover opacity-55"/><div className="absolute inset-0 bg-gradient-to-r from-background via-background/65 to-background/15"/><div className="relative flex min-h-[66px] items-center px-5"><div className="flex items-center gap-3 border-l-2 border-primary pl-4"><Network className="h-9 w-9 text-primary"/><div><h1 className="text-[26px] font-bold leading-none">Optimization</h1><p className="mt-1 text-[10px]">Find optimal operating conditions for maximum production, minimum risk and efficient resource utilization.</p></div></div><Button size="sm" className="ml-auto h-7 text-[9px]"><CircleDollarSign/>Advisory mode</Button></div></section><div className="flex justify-end gap-2"><Button size="sm" variant="outline" className="h-8 min-w-24 text-[9px] text-mint-foreground" onClick={()=>setLive(!live)}>{live?"Real-time":"Paused"}<ChevronDown/></Button><Button size="sm" variant="outline" className="h-8 text-[9px]">Base Case (Current)<ChevronDown/></Button><Button size="sm" variant="outline" className="h-8 text-[9px]"><BarChart3/>Compare</Button></div><CurrentState/><VariableWorkbench variables={variables} setVariables={setVariables}/><TradeOff weights={weights} setWeights={setWeights}/><Scenarios/><Results variables={variables}/></main></div></div></div>;
}