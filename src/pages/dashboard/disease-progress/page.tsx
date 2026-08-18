"use client";
import { motion } from "motion/react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer, Legend
} from "recharts";
import { AlertTriangle, CheckCircle, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";

const labData = [
  { year: "2019", hemoglobin: 11.8, vitaminD: null, crp: 4.2 },
  { year: "2020", hemoglobin: 11.2, vitaminD: null, crp: 6.1 },
  { year: "2021", hemoglobin: 10.2, vitaminD: 18, crp: 9.4 },
  { year: "2022", hemoglobin: 10.8, vitaminD: 15, crp: 14.7 },
  { year: "2023", hemoglobin: 10.5, vitaminD: 12, crp: 18.2 },
  { year: "2024", hemoglobin: 9.8, vitaminD: 16, crp: 32.5 },
];

const referenceRanges = {
  hemoglobin: { min: 12.0, max: 16.0, unit: "g/dL", label: "Hemoglobin" },
  vitaminD: { min: 20, max: 100, unit: "ng/mL", label: "Vitamin D" },
  crp: { min: 0, max: 10, unit: "mg/L", label: "CRP (Inflammation)" },
};

const metrics = [
  {
    key: "hemoglobin" as const,
    color: "#4DD9D0",
    latest: 9.8,
    trend: "Declining",
    status: "critical",
    description: "Below normal for 5 consecutive years",
  },
  {
    key: "vitaminD" as const,
    color: "#F5A623",
    latest: 16,
    trend: "Improving slightly",
    status: "warning",
    description: "Still below optimal range (>30 ng/mL recommended)",
  },
  {
    key: "crp" as const,
    color: "#E05252",
    latest: 32.5,
    trend: "Rising",
    status: "critical",
    description: "Significant elevation — active inflammation marker",
  },
];

// Custom tooltip
type TooltipProps = {
  active?: boolean;
  payload?: Array<{ color: string; name: string; value: number; unit?: string }>;
  label?: string;
};

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-lg">
      <p className="text-xs font-bold text-foreground mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="text-foreground font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function DiseaseProgressPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto pb-20 md:pb-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground mb-1">Disease Progress</h1>
        <p className="text-muted-foreground">Lab value trends across all patient records (2019–2024)</p>
      </motion.div>

      {/* Metric Cards */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
      >
        {metrics.map((m) => {
          const ref = referenceRanges[m.key];
          const isAbnormal = m.status !== "normal";
          return (
            <Card key={m.key} className={`bg-card border ${isAbnormal ? "border-red-500/30" : "border-border"}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{ref.label}</span>
                  {m.status === "critical" ? (
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  ) : m.status === "warning" ? (
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  )}
                </div>
                <div className={`text-2xl font-bold mb-1 ${m.status === "critical" ? "text-red-400" : m.status === "warning" ? "text-yellow-400" : "text-primary"}`}>
                  {m.latest} <span className="text-sm font-normal text-muted-foreground">{ref.unit}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                  <TrendingDown className="w-3 h-3" /> {m.trend}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{m.description}</p>
                <div className="mt-3 text-xs text-muted-foreground">
                  Normal: {ref.min}–{ref.max} {ref.unit}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </motion.div>

      {/* Main Chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8"
      >
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Hemoglobin Levels (g/dL)</CardTitle>
            <p className="text-xs text-muted-foreground">Normal range: 12–16 g/dL</p>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={labData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" tick={{ fill: "oklch(0.6 0.04 220)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "oklch(0.6 0.04 220)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[8, 14]} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={12} stroke="#E05252" strokeDasharray="4 2" label={{ value: "Min Normal", fill: "#E05252", fontSize: 10 }} />
                <Line
                  type="monotone"
                  dataKey="hemoglobin"
                  stroke="#4DD9D0"
                  strokeWidth={2.5}
                  dot={{ fill: "#4DD9D0", strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, fill: "#4DD9D0" }}
                  name="Hemoglobin"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Vitamin D + CRP */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm">Vitamin D (ng/mL)</CardTitle>
              <p className="text-xs text-muted-foreground">Normal: 20–100 ng/mL</p>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={labData.filter((d) => d.vitaminD !== null)} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="year" tick={{ fill: "oklch(0.6 0.04 220)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "oklch(0.6 0.04 220)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={20} stroke="#E05252" strokeDasharray="4 2" />
                  <Line type="monotone" dataKey="vitaminD" stroke="#F5A623" strokeWidth={2.5} dot={{ fill: "#F5A623", r: 4 }} name="Vitamin D" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm">CRP — Inflammation (mg/L)</CardTitle>
              <p className="text-xs text-muted-foreground">Normal: {'<'}10 mg/L</p>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={labData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="year" tick={{ fill: "oklch(0.6 0.04 220)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "oklch(0.6 0.04 220)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={10} stroke="#E05252" strokeDasharray="4 2" />
                  <Line type="monotone" dataKey="crp" stroke="#E05252" strokeWidth={2.5} dot={{ fill: "#E05252", r: 4 }} name="CRP" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Abnormal flags */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="mt-6 p-5 rounded-xl border border-red-500/20 bg-red-500/5"
      >
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <h3 className="text-sm font-semibold text-red-400">Abnormal Values Highlighted</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-muted-foreground">
          <div className="p-3 rounded-lg bg-background/50 border border-border">
            <span className="text-red-400 font-semibold">Hemoglobin 9.8 g/dL</span> — Below 12 (normal min)
          </div>
          <div className="p-3 rounded-lg bg-background/50 border border-border">
            <span className="text-yellow-400 font-semibold">Vitamin D 12 ng/mL</span> — Deficient ({'<'}20)
          </div>
          <div className="p-3 rounded-lg bg-background/50 border border-border">
            <span className="text-red-400 font-semibold">CRP 32.5 mg/L</span> — 3× above upper limit
          </div>
        </div>
      </motion.div>
    </div>
  );
}
