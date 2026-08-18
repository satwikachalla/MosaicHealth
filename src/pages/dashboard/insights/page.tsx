import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle, Clock, Repeat, TrendingUp, Pill, CheckCircle,
  FileText, Activity, ChevronRight, X, Brain
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";

type InsightSeverity = "high" | "medium" | "low";

type Insight = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  severity: InsightSeverity;
  icon: React.ElementType;
  sources: string[];
  confidence: number;
  reasoning: string;
};

const insights: Insight[] = [
  {
    id: "1",
    title: "Potential Diagnostic Delay",
    summary: "Autoimmune condition may have been present since 2019 but undetected for 5 years.",
    detail: "Patient showed recurring anemia (Hb < 12) from 2019. Combined with joint pain in 2022 and fatigue episodes in 2020, these could be early autoimmune indicators. ANA positivity confirmed only in 2024 — a 5-year diagnostic gap.",
    severity: "high",
    icon: Clock,
    sources: ["Blood_Report.pdf", "MRI_Report.pdf", "Discharge_Summary.pdf"],
    confidence: 87,
    reasoning: "Cross-referenced recurring anemia, joint inflammation, and fatigue against autoimmune disease progression patterns in medical literature (SLE, RA criteria).",
  },
  {
    id: "2",
    title: "Recurring Anemia — Multiple Years",
    summary: "Hemoglobin below normal range detected in 2019, 2021, and 2024 blood reports.",
    detail: "Three consecutive blood reports show persistent anemia (Hb: 11.8, 10.2, 9.8 g/dL). Iron supplementation prescribed in 2020 did not resolve the underlying cause.",
    severity: "high",
    icon: Repeat,
    sources: ["Blood_Report.pdf"],
    confidence: 95,
    reasoning: "Three data points from blood reports showing consistent below-normal hemoglobin, with downward trend despite treatment.",
  },
  {
    id: "3",
    title: "Repeated Fatigue Episodes",
    summary: "Fatigue reported in 2020, 2021, and 2023 — likely linked to nutritional deficiencies.",
    detail: "Fatigue correlated with Vitamin D deficiency (12 ng/mL in 2023) and iron deficiency anemia. Multi-year pattern suggests chronic underlying condition.",
    severity: "medium",
    icon: Activity,
    sources: ["Prescription.pdf", "Blood_Report.pdf"],
    confidence: 82,
    reasoning: "Fatigue mentions extracted from prescription notes and discharge summary; correlates temporally with lab abnormalities.",
  },
  {
    id: "4",
    title: "Possible Autoimmune Progression",
    summary: "Symptom cluster consistent with early-stage lupus or rheumatoid arthritis.",
    detail: "ANA 1:160 + Anti-dsDNA elevation + joint synovitis + anemia + fatigue forms a complete picture consistent with SLE (SLICC criteria). Rheumatology referral urgent.",
    severity: "high",
    icon: TrendingUp,
    sources: ["Discharge_Summary.pdf", "MRI_Report.pdf", "Blood_Report.pdf"],
    confidence: 79,
    reasoning: "AI matched symptom cluster against SLICC (Systemic Lupus International Collaborating Clinics) classification criteria.",
  },
  {
    id: "5",
    title: "Medication Conflict Detected",
    summary: "Concurrent NSAIDs and anticoagulant prescription may increase bleeding risk.",
    detail: "Patient prescribed Ibuprofen (anti-inflammatory for joint pain) alongside Aspirin 75mg. Combined use increases GI bleeding risk. Clinical review recommended.",
    severity: "medium",
    icon: Pill,
    sources: ["Prescription.pdf"],
    confidence: 91,
    reasoning: "Drug interaction database cross-reference: NSAIDs + antiplatelet agents — known elevated GI bleed risk.",
  },
  {
    id: "6",
    title: "Duplicate Blood Test Detected",
    summary: "CBC ordered twice within 21 days — one test may be redundant.",
    detail: "Complete Blood Count ordered on 14 Jan 2024 and again on 04 Feb 2024. Results similar. No clinical event between orders suggests possible administrative duplication.",
    severity: "low",
    icon: CheckCircle,
    sources: ["Blood_Report.pdf"],
    confidence: 88,
    reasoning: "Date extraction from two CBC reports: 21-day gap with no hospitalization or clinical change event between orders.",
  },
];

const severityConfig = {
  high: { border: "border-red-500/30", bg: "bg-red-500/5", text: "text-red-400", badge: "bg-red-500/10 text-red-400", label: "High Risk" },
  medium: { border: "border-yellow-500/30", bg: "bg-yellow-500/5", text: "text-yellow-400", badge: "bg-yellow-500/10 text-yellow-400", label: "Medium" },
  low: { border: "border-primary/30", bg: "bg-primary/5", text: "text-primary", badge: "bg-primary/10 text-primary", label: "Low" },
};

export default function InsightsPage() {
  const navigate = useNavigate();
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);

  return (
    <div className="p-6 max-w-3xl mx-auto pb-20 md:pb-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl font-bold text-foreground">Clinical Insights</h1>
          <Button
            size="sm"
            onClick={() => navigate("/dashboard/doctor-summary")}
            className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
          >
            Doctor Summary <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
        <p className="text-muted-foreground">AI-detected clinical patterns across all patient records</p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3 mt-6"
      >
        {[
          { label: "High Risk", count: 3, color: "text-red-400", bg: "bg-red-500/10" },
          { label: "Medium", count: 2, color: "text-yellow-400", bg: "bg-yellow-500/10" },
          { label: "Low", count: 1, color: "text-primary", bg: "bg-primary/10" },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl border border-border ${s.bg} p-4 text-center`}>
            <div className={`text-2xl font-bold ${s.color}`}>{s.count}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Insights list */}
      <div className="mt-8 space-y-4">
        {insights.map((insight, i) => {
          const config = severityConfig[insight.severity];
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className={cn(
                "p-5 rounded-xl border cursor-pointer transition-all",
                config.border,
                config.bg,
                "hover:opacity-90"
              )}
              onClick={() => setSelectedInsight(insight)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center flex-shrink-0`}>
                  <insight.icon className={`w-5 h-5 ${config.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{insight.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${config.badge}`}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{insight.summary}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Brain className="w-3 h-3" />
                      {insight.confidence}% confidence
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <FileText className="w-3 h-3" />
                      {insight.sources.length} source{insight.sources.length > 1 ? "s" : ""}
                    </div>
                    <span className={`text-xs ${config.text} ml-auto`}>Why? →</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Explainability modal */}
      <AnimatePresence>
        {selectedInsight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedInsight(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="w-full max-w-lg bg-card border border-border rounded-2xl p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Brain className="w-4 h-4 text-primary" />
                  Why was this generated?
                </h2>
                <button onClick={() => setSelectedInsight(null)} className="cursor-pointer text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-5">
                {/* Insight */}
                <div className={`p-4 rounded-xl border ${severityConfig[selectedInsight.severity].border} ${severityConfig[selectedInsight.severity].bg}`}>
                  <div className={`text-xs font-semibold ${severityConfig[selectedInsight.severity].text} mb-1`}>
                    {selectedInsight.title}
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedInsight.detail}</p>
                </div>

                {/* Supporting docs */}
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Supporting Documents</h3>
                  <div className="space-y-2">
                    {selectedInsight.sources.map((s) => (
                      <div key={s} className="flex items-center gap-3 p-3 rounded-lg bg-secondary border border-border">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">{s}</span>
                        <CheckCircle className="w-3.5 h-3.5 text-green-400 ml-auto" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Confidence */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-muted-foreground font-semibold uppercase tracking-widest">Confidence Score</span>
                    <span className="text-primary font-bold">{selectedInsight.confidence}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedInsight.confidence}%` }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    />
                  </div>
                </div>

                {/* Reasoning */}
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">AI Reasoning</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed bg-secondary p-3 rounded-lg border border-border">
                    {selectedInsight.reasoning}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
