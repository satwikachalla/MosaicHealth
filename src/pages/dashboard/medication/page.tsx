import { motion } from "motion/react";
import { CheckCircle, AlertTriangle, Info, Pill, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { cn } from "@/lib/utils.ts";

const medications = [
  {
    name: "Ibuprofen 400mg",
    frequency: "Twice daily",
    prescribed: "Mar 2022",
    indication: "Joint pain / anti-inflammatory",
    status: "active",
    flagType: null as null | string,
  },
  {
    name: "Aspirin 75mg",
    frequency: "Once daily",
    prescribed: "Jan 2024",
    indication: "Antiplatelet (low dose)",
    status: "active",
    flagType: "interaction",
  },
  {
    name: "Ferrous Sulfate 65mg",
    frequency: "Once daily",
    prescribed: "Feb 2020",
    indication: "Iron deficiency anemia",
    status: "active",
    flagType: "duplicate",
  },
  {
    name: "Ferrous Gluconate 324mg",
    frequency: "Once daily",
    prescribed: "Mar 2021",
    indication: "Iron supplementation",
    status: "review",
    flagType: "duplicate",
  },
  {
    name: "Cholecalciferol 1000 IU",
    frequency: "Once daily",
    prescribed: "Sep 2023",
    indication: "Vitamin D deficiency",
    status: "active",
    flagType: null,
  },
  {
    name: "Hydroxychloroquine 200mg",
    frequency: "Twice daily",
    prescribed: "Oct 2024",
    indication: "Autoimmune — SLE management",
    status: "active",
    flagType: null,
  },
];

const flags = [
  {
    type: "safe",
    icon: CheckCircle,
    color: "text-green-400",
    border: "border-green-400/30",
    bg: "bg-green-400/5",
    title: "No Severe Drug Interactions Found",
    detail: "All prescribed medications have been cross-referenced. No life-threatening interactions detected.",
  },
  {
    type: "warning",
    icon: AlertTriangle,
    color: "text-yellow-400",
    border: "border-yellow-500/30",
    bg: "bg-yellow-500/5",
    title: "Moderate Interaction: Ibuprofen + Aspirin",
    detail: "Combined use of NSAIDs (Ibuprofen) and antiplatelet agents (Aspirin 75mg) may increase risk of GI bleeding. Monitor for symptoms. Consider Omeprazole 20mg for gastroprotection.",
  },
  {
    type: "duplicate",
    icon: RefreshCw,
    color: "text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/5",
    title: "Duplicate Prescription Detected",
    detail: "Ferrous Sulfate 65mg (Feb 2020) and Ferrous Gluconate 324mg (Mar 2021) are both iron supplements. Concurrent use may cause iron overload. Review which is clinically indicated.",
  },
  {
    type: "info",
    icon: Info,
    color: "text-primary",
    border: "border-primary/30",
    bg: "bg-primary/5",
    title: "Suggested Medication Review",
    detail: "With new Hydroxychloroquine prescription for autoimmune management, consider baseline ophthalmological exam. Annual eye screening recommended for long-term use.",
  },
];

export default function MedicationPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto pb-20 md:pb-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground mb-1">Medication Analysis</h1>
        <p className="text-muted-foreground">AI-powered drug interaction check and prescription review</p>
      </motion.div>

      {/* Flags */}
      <div className="mt-8 space-y-4">
        {flags.map((flag, i) => (
          <motion.div
            key={flag.type}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className={cn("p-5 rounded-xl border", flag.border, flag.bg)}
          >
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-lg bg-background/50 flex items-center justify-center flex-shrink-0`}>
                <flag.icon className={`w-5 h-5 ${flag.color}`} />
              </div>
              <div>
                <h3 className={`text-sm font-semibold mb-1 ${flag.color}`}>{flag.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{flag.detail}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Medications list */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-10"
      >
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          Current Medications ({medications.length})
        </h2>
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            {medications.map((med, i) => (
              <div
                key={med.name}
                className={cn(
                  "flex items-center gap-4 px-5 py-4",
                  i < medications.length - 1 ? "border-b border-border" : ""
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                  med.flagType === "interaction" ? "bg-yellow-500/10" :
                  med.flagType === "duplicate" ? "bg-orange-500/10" :
                  "bg-primary/10"
                )}>
                  <Pill className={cn(
                    "w-4 h-4",
                    med.flagType === "interaction" ? "text-yellow-400" :
                    med.flagType === "duplicate" ? "text-orange-400" :
                    "text-primary"
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-foreground">{med.name}</span>
                    {med.flagType === "interaction" && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400">
                        Interaction
                      </span>
                    )}
                    {med.flagType === "duplicate" && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400">
                        Duplicate
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {med.indication} · {med.frequency} · Since {med.prescribed}
                  </div>
                </div>
                <div className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  med.status === "active" ? "bg-green-400/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                )}>
                  {med.status === "active" ? "Active" : "Review"}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
