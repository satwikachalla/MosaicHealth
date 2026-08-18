import { useState } from "react";
import { motion } from "motion/react";
import { FileText, Download, CheckCircle, AlertTriangle, User, Calendar, FlaskConical, Microscope, UserCheck, Brain } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { toast } from "sonner";

const summaryData = {
  generatedAt: "08 October 2024",
  confidence: 86,
  patient: {
    name: "Jane Smith",
    dob: "15 March 1985",
    age: "39 years",
    bloodGroup: "B+",
    id: "MH-2024-0847",
    gender: "Female",
  },
  keyFindings: [
    { label: "Autoimmune marker (ANA) positive at 1:160", severity: "critical" as const },
    { label: "Anti-dsDNA elevated — consistent with SLE", severity: "critical" as const },
    { label: "Chronic anemia — Hb 9.8 g/dL (persistent 5 years)", severity: "critical" as const },
    { label: "Vitamin D deficiency — 12 ng/mL", severity: "warning" as const },
    { label: "Elevated CRP 32.5 mg/L — active inflammation", severity: "critical" as const },
    { label: "Bilateral synovial joint inflammation (knee MRI)", severity: "warning" as const },
    { label: "Moderate drug interaction: Ibuprofen + Aspirin", severity: "warning" as const },
  ],
  clinicalTimeline: [
    { year: "2019", event: "Mild anemia detected on routine CBC (Hb 11.8)" },
    { year: "2020", event: "Recurring fatigue. Iron supplementation commenced" },
    { year: "2021", event: "Iron deficiency confirmed. Ferritin critically low (8 ng/mL)" },
    { year: "2022", event: "Bilateral knee synovitis on MRI. NSAIDs prescribed" },
    { year: "2023", event: "Vitamin D deficiency (12 ng/mL). Fatigue persists" },
    { year: "2024", event: "ANA+ and Anti-dsDNA elevated. Hydroxychloroquine initiated" },
  ],
  abnormalLabs: [
    { test: "Hemoglobin", value: "9.8 g/dL", normal: "12–16 g/dL", flag: "Low" },
    { test: "Serum Ferritin", value: "8 ng/mL", normal: "12–150 ng/mL", flag: "Low" },
    { test: "Vitamin D", value: "12 ng/mL", normal: "20–100 ng/mL", flag: "Deficient" },
    { test: "CRP", value: "32.5 mg/L", normal: "<10 mg/L", flag: "High" },
    { test: "ANA Titer", value: "1:160", normal: "<1:40", flag: "Positive" },
    { test: "Anti-dsDNA", value: "Elevated", normal: "Negative", flag: "Positive" },
  ],
  followUp: [
    "Repeat ANA panel and complement levels (C3, C4) in 4 weeks",
    "Monitor CBC and iron studies monthly",
    "Ophthalmology baseline exam before continued Hydroxychloroquine",
    "Discontinue Ibuprofen; prescribe Celecoxib with Omeprazole 20mg for gastroprotection",
    "Consider renal function tests (urinalysis + eGFR) for SLE workup",
  ],
  referral: {
    specialist: "Rheumatology",
    urgency: "Urgent — within 2 weeks",
    reason: "Suspected systemic lupus erythematosus (SLE). ANA+ with multi-system involvement.",
  },
};

export default function DoctorSummaryPage() {
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    toast.success("PDF exported successfully!", {
      description: "Physician_Summary_JaneSmith_Oct2024.pdf saved.",
    });
    setExported(true);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto pb-20 md:pb-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-start justify-between gap-4 mb-1">
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI Doctor Summary</h1>
            <p className="text-muted-foreground">Generated: {summaryData.generatedAt}</p>
          </div>
          <Button
            onClick={handleExport}
            className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer flex-shrink-0"
          >
            {exported ? <CheckCircle className="w-4 h-4 mr-2" /> : <Download className="w-4 h-4 mr-2" />}
            Export PDF
          </Button>
        </div>
      </motion.div>

      {/* Confidence */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="mt-4 flex items-center gap-4 p-4 rounded-xl border border-primary/20 bg-primary/5"
      >
        <Brain className="w-5 h-5 text-primary flex-shrink-0" />
        <div className="flex-1">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-foreground font-medium">AI Confidence Score</span>
            <span className="text-primary font-bold">{summaryData.confidence}%</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${summaryData.confidence}%` }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
        </div>
      </motion.div>

      <div className="mt-8 space-y-8">
        {/* Patient Overview */}
        <Section icon={User} title="Patient Overview" delay={0.15}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(summaryData.patient).map(([k, v]) => (
              <div key={k} className="p-3 rounded-lg bg-secondary border border-border">
                <div className="text-xs text-muted-foreground capitalize mb-0.5">{k.replace(/([A-Z])/g, " $1")}</div>
                <div className="text-sm font-semibold text-foreground">{v}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Key Findings */}
        <Section icon={AlertTriangle} title="Key Findings" delay={0.2}>
          <div className="space-y-2">
            {summaryData.keyFindings.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  f.severity === "critical" ? "bg-red-500/20" : "bg-yellow-500/20"
                }`}>
                  <div className={`w-2 h-2 rounded-full ${f.severity === "critical" ? "bg-red-400" : "bg-yellow-400"}`} />
                </div>
                <span className="text-sm text-foreground">{f.label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Clinical Timeline */}
        <Section icon={Calendar} title="Clinical Timeline" delay={0.25}>
          <div className="space-y-3">
            {summaryData.clinicalTimeline.map((t) => (
              <div key={t.year} className="flex gap-4">
                <div className="w-12 text-xs font-bold text-primary flex-shrink-0 mt-0.5">{t.year}</div>
                <div className="flex-1 text-sm text-foreground pb-3 border-b border-border last:border-0">{t.event}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Abnormal Lab Results */}
        <Section icon={FlaskConical} title="Abnormal Laboratory Results" delay={0.3}>
          <div className="space-y-2">
            {summaryData.abnormalLabs.map((lab) => (
              <div key={lab.test} className="flex items-center gap-3 p-3 rounded-lg border border-red-500/20 bg-red-500/5">
                <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                <span className="text-sm text-foreground font-medium flex-1">{lab.test}</span>
                <span className="text-sm text-red-400 font-semibold">{lab.value}</span>
                <span className="text-xs text-muted-foreground hidden md:inline">(Normal: {lab.normal})</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-400">{lab.flag}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Follow-Up */}
        <Section icon={Microscope} title="Suggested Follow-Up Investigations" delay={0.35}>
          <div className="space-y-2">
            {summaryData.followUp.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <span className="text-sm text-foreground">{f}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Referral */}
        <Section icon={UserCheck} title="Recommended Specialist Referral" delay={0.4}>
          <div className="p-5 rounded-xl border border-red-500/30 bg-red-500/5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-bold text-red-400">Urgent Referral Required</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Specialist</div>
                <div className="text-sm font-semibold text-foreground">{summaryData.referral.specialist}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Urgency</div>
                <div className="text-sm font-semibold text-red-400">{summaryData.referral.urgency}</div>
              </div>
              <div className="md:col-span-1">
                <div className="text-xs text-muted-foreground mb-1">Reason</div>
                <div className="text-sm text-foreground">{summaryData.referral.reason}</div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Export footer */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="mt-10 p-6 rounded-xl border border-border bg-card text-center"
      >
        <FileText className="w-8 h-8 text-primary mx-auto mb-3" />
        <p className="text-sm text-muted-foreground mb-4">
          Export this summary as a formatted PDF for clinical records or specialist referral.
        </p>
        <Button
          onClick={handleExport}
          className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
        >
          <Download className="w-4 h-4 mr-2" />
          Export as PDF
        </Button>
      </motion.div>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  delay,
  children,
}: {
  icon: React.ElementType;
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-3.5 h-3.5 text-primary" />
        </div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
      </div>
      <div className="p-5 rounded-xl border border-border bg-card">
        {children}
      </div>
    </motion.div>
  );
}
