import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  Activity, Brain, FileText, Upload, TrendingUp, Pill,
  AlertTriangle, CheckCircle, Clock, ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";

const sections = [
  {
    icon: Upload,
    title: "Upload Medical Records",
    description: "Upload blood reports, MRIs, prescriptions & discharge summaries",
    path: "/dashboard/upload",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    badge: "4 Files Ready",
  },
  {
    icon: Activity,
    title: "AI Health Timeline",
    description: "Chronological view of patient health events from 2019–2024",
    path: "/dashboard/timeline",
    color: "text-primary",
    bg: "bg-primary/10",
    badge: "6 Events",
  },
  {
    icon: Brain,
    title: "Clinical Insights",
    description: "AI-detected patterns and diagnostic flags",
    path: "/dashboard/insights",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    badge: "6 Insights",
  },
  {
    icon: TrendingUp,
    title: "Disease Progress",
    description: "Track Hemoglobin, Vitamin D, Inflammation Markers over time",
    path: "/dashboard/disease-progress",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    badge: "3 Abnormal",
  },
  {
    icon: Pill,
    title: "Medication Analysis",
    description: "Interaction checks, duplicate detection and review suggestions",
    path: "/dashboard/medication",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    badge: "1 Warning",
  },
  {
    icon: FileText,
    title: "Doctor Summary",
    description: "AI-generated professional physician report ready to export",
    path: "/dashboard/doctor-summary",
    color: "text-green-400",
    bg: "bg-green-400/10",
    badge: "Ready",
  },
];

const recentReports = [
  { name: "Blood_Report.pdf", date: "12 Jan 2024", status: "Processed", icon: CheckCircle, color: "text-green-400" },
  { name: "Prescription.pdf", date: "15 Mar 2024", status: "Processed", icon: CheckCircle, color: "text-green-400" },
  { name: "MRI_Report.pdf", date: "22 Jun 2024", status: "Processed", icon: CheckCircle, color: "text-green-400" },
  { name: "Discharge_Summary.pdf", date: "08 Sep 2024", status: "Processed", icon: CheckCircle, color: "text-green-400" },
];

const patientStats = [
  { label: "Age", value: "39 yrs" },
  { label: "Blood Group", value: "B+" },
  { label: "Records", value: "4" },
  { label: "Alerts", value: "6" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto pb-20 md:pb-6">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-foreground">Patient Dashboard</h1>
        <p className="text-muted-foreground mt-1">Jane Smith — Complete health analysis powered by AI</p>
      </motion.div>

      {/* Patient Overview */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Patient Overview</h2>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold text-primary flex-shrink-0">
                  JS
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Jane Smith</h3>
                  <p className="text-muted-foreground text-sm">Patient ID: MH-2024-0847</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-xs text-green-400">Active Case</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 flex-1 md:ml-8">
                {patientStats.map((s) => (
                  <div key={s.label} className="text-center p-3 rounded-lg bg-secondary">
                    <div className="text-lg font-bold text-primary">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Alert Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center gap-3 p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/10"
      >
        <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
        <div className="flex-1">
          <span className="text-sm font-semibold text-yellow-400">Clinical Alert: </span>
          <span className="text-sm text-muted-foreground">Autoimmune marker positive detected in 2024 records. Specialist referral recommended.</span>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="text-yellow-400 hover:text-yellow-300 cursor-pointer"
          onClick={() => navigate("/dashboard/insights")}
        >
          Review <ChevronRight className="w-3 h-3 ml-1" />
        </Button>
      </motion.div>

      {/* Dashboard Sections Grid */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, i) => (
            <motion.div
              key={section.path}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.07 }}
            >
              <Card
                className="bg-card border-border hover:border-primary/30 transition-all cursor-pointer group"
                onClick={() => navigate(section.path)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 rounded-lg ${section.bg} flex items-center justify-center`}>
                      <section.icon className={`w-5 h-5 ${section.color}`} />
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${section.bg} ${section.color} font-medium`}>
                      {section.badge}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-base mb-1 group-hover:text-primary transition-colors">
                    {section.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                  <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                    Open <ChevronRight className="w-3 h-3" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Recent Reports */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Recent Reports</h2>
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            {recentReports.map((r, i) => (
              <div
                key={r.name}
                className={`flex items-center gap-4 px-6 py-4 ${i < recentReports.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{r.name}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    <Clock className="w-3 h-3" /> {r.date}
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 text-xs ${r.color}`}>
                  <r.icon className="w-3.5 h-3.5" />
                  {r.status}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
}
