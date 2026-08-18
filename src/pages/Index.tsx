import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Activity, Brain, FileText, Shield, TrendingUp, Users, ChevronRight, Heart, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

const stats = [
  { label: "Patients Analyzed", value: "50,000+" },
  { label: "Clinical Insights Generated", value: "1.2M+" },
  { label: "Diagnostic Accuracy", value: "94.7%" },
  { label: "Time Saved per Report", value: "2.4 hrs" },
];

const features = [
  {
    icon: Brain,
    title: "AI Health Timeline",
    description: "Automatically convert fragmented medical records into a unified chronological health story.",
  },
  {
    icon: TrendingUp,
    title: "Clinical Pattern Detection",
    description: "Identify hidden patterns across years of records that human review might miss.",
  },
  {
    icon: FileText,
    title: "Physician Summary",
    description: "Generate professional, structured reports ready for immediate clinical use.",
  },
  {
    icon: Shield,
    title: "Medication Safety",
    description: "Detect drug interactions and duplicate prescriptions across all records.",
  },
  {
    icon: Activity,
    title: "Lab Trend Analysis",
    description: "Track Hemoglobin, Vitamin D, inflammation markers and flag abnormal trends.",
  },
  {
    icon: Users,
    title: "Multi-Record Fusion",
    description: "Seamlessly merge blood reports, MRIs, prescriptions and discharge summaries.",
  },
];

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Heart className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">Mosaic Health</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground cursor-pointer">
            About
          </Button>
          <Button
            onClick={() => navigate("/dashboard")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
          >
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute top-2/3 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/8 blur-[80px]" />
          {/* Grid lines */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(114,215,207,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(114,215,207,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8"
          >
            <Zap className="w-3.5 h-3.5" />
            AI-Powered Healthcare Intelligence
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight"
          >
            <span className="text-primary">Mosaic</span> Health
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-2xl md:text-3xl text-muted-foreground font-light mb-4 text-balance"
          >
            Connecting Every Piece of a Patient's Health Story.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 text-balance"
          >
            Transform fragmented medical records into an intelligent health timeline. Detect hidden clinical patterns. Generate AI-powered physician summaries in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6 cursor-pointer group"
            >
              Get Started
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-muted-foreground hover:text-foreground text-base px-8 py-6 border border-border cursor-pointer"
            >
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="relative z-10 mt-16 w-full max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/10">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
              alt="Healthcare Dashboard"
              className="w-full h-auto object-cover opacity-60"
            />
            {/* Overlay UI elements */}
            <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
              <div className="flex gap-3 flex-wrap">
                {["AI Timeline Active", "4 Records Processed", "3 Insights Found"].map((tag, i) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + i * 0.15 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/90 border border-border text-sm text-foreground backdrop-blur-sm"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    {tag}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 border-y border-border">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Intelligent Healthcare Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything a physician needs to understand a patient's complete health journey — in one place.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center rounded-2xl border border-primary/30 bg-primary/5 p-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
          <Clock className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Start Analyzing Patient Records Today
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Upload any medical document and let Mosaic Health reveal the complete clinical picture.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-base cursor-pointer"
          >
            Get Started Free
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-8 py-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <Heart className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground">Mosaic Health</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Connecting Every Piece of a Patient's Health Story. &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
