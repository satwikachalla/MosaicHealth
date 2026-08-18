import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  Droplets, Zap, Search, Bone, Sun, AlertTriangle, ChevronRight, Info
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";

type TimelineEvent = {
  year: string;
  title: string;
  description: string;
  severity: "normal" | "warning" | "critical";
  icon: React.ElementType;
  source: string;
};

const timelineEvents: TimelineEvent[] = [
  {
    year: "2019",
    title: "Routine Blood Test",
    description: "Annual checkup. Hemoglobin 11.8 g/dL (slightly below normal). No immediate action taken.",
    severity: "warning",
    icon: Droplets,
    source: "Blood_Report.pdf",
  },
  {
    year: "2020",
    title: "Recurring Fatigue Episodes",
    description: "Patient reports persistent tiredness over 6 months. Prescription: Iron supplement 65mg/day.",
    severity: "warning",
    icon: Zap,
    source: "Prescription.pdf",
  },
  {
    year: "2021",
    title: "Iron Deficiency Confirmed",
    description: "Serum ferritin 8 ng/mL (critically low). Hemoglobin 10.2 g/dL. Oral iron therapy increased.",
    severity: "critical",
    icon: Droplets,
    source: "Blood_Report.pdf",
  },
  {
    year: "2022",
    title: "Joint Pain — Bilateral",
    description: "MRI reveals mild synovial inflammation in both knees. Anti-inflammatory prescribed.",
    severity: "warning",
    icon: Bone,
    source: "MRI_Report.pdf",
  },
  {
    year: "2023",
    title: "Vitamin D Deficiency",
    description: "25-OH Vitamin D: 12 ng/mL (deficient). Supplementation started. Fatigue continues.",
    severity: "warning",
    icon: Sun,
    source: "Blood_Report.pdf",
  },
  {
    year: "2024",
    title: "Autoimmune Marker Positive",
    description: "ANA positive (1:160), Anti-dsDNA elevated. Hospital admission. Specialist referral urgently required.",
    severity: "critical",
    icon: AlertTriangle,
    source: "Discharge_Summary.pdf",
  },
];

const severityConfig = {
  normal: { border: "border-primary/30", bg: "bg-primary/5", dot: "bg-primary", text: "text-primary", badge: "bg-primary/10 text-primary" },
  warning: { border: "border-yellow-500/30", bg: "bg-yellow-500/5", dot: "bg-yellow-400", text: "text-yellow-400", badge: "bg-yellow-500/10 text-yellow-400" },
  critical: { border: "border-red-500/30", bg: "bg-red-500/5", dot: "bg-red-400", text: "text-red-400", badge: "bg-red-500/10 text-red-400" },
};

export default function TimelinePage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="p-6 max-w-3xl mx-auto pb-20 md:pb-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl font-bold text-foreground">AI Health Timeline</h1>
          <Button
            size="sm"
            onClick={() => navigate("/dashboard/insights")}
            className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
          >
            View Insights <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
        <p className="text-muted-foreground">Jane Smith's chronological health events (2019–2024)</p>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="flex gap-4 mt-6 flex-wrap"
      >
        {(["normal", "warning", "critical"] as const).map((s) => (
          <div key={s} className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className={`w-2.5 h-2.5 rounded-full ${severityConfig[s].dot}`} />
            <span className="capitalize">{s === "normal" ? "Noted" : s}</span>
          </div>
        ))}
      </motion.div>

      {/* Timeline */}
      <div className="mt-8 relative">
        {/* Vertical line */}
        <div className="absolute left-7 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-6">
          {timelineEvents.map((event, i) => {
            const config = severityConfig[event.severity];
            const isSelected = selected === i;
            return (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-16"
              >
                {/* Year bubble */}
                <div className={`absolute left-0 w-14 h-14 rounded-full border-2 ${config.border} ${config.bg} flex flex-col items-center justify-center z-10 bg-background`}>
                  <div className={`w-2 h-2 rounded-full ${config.dot} mb-0.5`} />
                  <span className="text-xs font-bold text-foreground">{event.year}</span>
                </div>

                {/* Card */}
                <div
                  className={cn(
                    `p-5 rounded-xl border transition-all cursor-pointer`,
                    isSelected ? `${config.border} ${config.bg}` : "border-border bg-card hover:border-primary/20"
                  )}
                  onClick={() => setSelected(isSelected ? null : i)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                        <event.icon className={`w-4 h-4 ${config.text}`} />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{event.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${config.badge} mt-0.5 inline-block`}>
                          {event.severity === "critical" ? "Critical Finding" : event.severity === "warning" ? "Abnormal" : "Noted"}
                        </span>
                      </div>
                    </div>
                    <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  </div>

                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 pt-4 border-t border-border"
                    >
                      <p className="text-sm text-foreground leading-relaxed mb-3">{event.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Search className="w-3 h-3" />
                        Source: <span className="text-primary">{event.source}</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="mt-8 p-6 rounded-xl border border-primary/20 bg-primary/5 text-center"
      >
        <p className="text-sm text-muted-foreground mb-4">
          <span className="text-primary font-semibold">2 critical</span> and <span className="text-yellow-400 font-semibold">4 warning</span> events detected across 5 years of records.
        </p>
        <Button
          onClick={() => navigate("/dashboard/insights")}
          className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
        >
          View Clinical Insights
        </Button>
      </motion.div>
    </div>
  );
}
