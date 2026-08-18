import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, CheckCircle, Loader2, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";

type ProcessingStep = {
  id: string;
  label: string;
  duration: number;
};

const processingSteps: ProcessingStep[] = [
  { id: "ocr", label: "OCR — Extracting text from documents", duration: 1200 },
  { id: "entities", label: "Medical Entity Extraction", duration: 1400 },
  { id: "timeline", label: "Timeline Generation", duration: 1200 },
  { id: "patterns", label: "Clinical Pattern Analysis", duration: 1500 },
  { id: "summary", label: "Generating Physician Summary", duration: 1400 },
];

const sampleFiles = [
  { name: "Blood_Report.pdf", size: "1.2 MB", type: "Laboratory Report" },
  { name: "Prescription.pdf", size: "0.4 MB", type: "Prescription" },
  { name: "MRI_Report.pdf", size: "3.8 MB", type: "Imaging Report" },
  { name: "Discharge_Summary.pdf", size: "2.1 MB", type: "Discharge Summary" },
];

type UploadState = "idle" | "uploaded" | "processing" | "done";

export default function UploadPage() {
  const navigate = useNavigate();
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [activeStep, setActiveStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  const handleUpload = useCallback(() => {
    setUploadState("uploaded");
  }, []);

  const startProcessing = useCallback(async () => {
    setUploadState("processing");
    setActiveStep(0);

    for (let i = 0; i < processingSteps.length; i++) {
      setActiveStep(i);
      setProgress(Math.round((i / processingSteps.length) * 100));
      await new Promise<void>((r) => setTimeout(r, processingSteps[i].duration));
      setCompletedSteps((prev) => [...prev, i]);
    }

    setProgress(100);
    await new Promise<void>((r) => setTimeout(r, 600));
    setUploadState("done");
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto pb-20 md:pb-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground mb-1">Upload Medical Records</h1>
        <p className="text-muted-foreground">Upload patient documents for AI analysis and timeline generation.</p>
      </motion.div>

      <div className="mt-8 space-y-6">
        {/* Drop zone */}
        {uploadState === "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div
              onClick={handleUpload}
              className="border-2 border-dashed border-border hover:border-primary/50 rounded-2xl p-16 text-center cursor-pointer transition-colors group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Upload className="w-7 h-7 text-primary" />
              </div>
              <p className="text-lg font-semibold text-foreground mb-2">Drop files here or click to upload</p>
              <p className="text-sm text-muted-foreground">Supports PDF, DICOM, JPG, PNG — up to 50MB per file</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {["Blood Report", "Prescription", "MRI Report", "Discharge Summary"].map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Uploaded files list */}
        {(uploadState === "uploaded" || uploadState === "processing" || uploadState === "done") && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
              Uploaded Files ({sampleFiles.length})
            </h2>
            {sampleFiles.map((file, i) => (
              <motion.div
                key={file.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">{file.name}</div>
                  <div className="text-xs text-muted-foreground">{file.type} · {file.size}</div>
                </div>
                {uploadState === "uploaded" && (
                  <X className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                )}
                {(uploadState === "processing" || uploadState === "done") && (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Analyze button */}
        {uploadState === "uploaded" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Button
              onClick={startProcessing}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base cursor-pointer"
            >
              Analyze Medical Records
            </Button>
          </motion.div>
        )}

        {/* Processing screen */}
        <AnimatePresence>
          {uploadState === "processing" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full border-2 border-primary/30 flex items-center justify-center mx-auto mb-4 relative">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" style={{ animationDuration: "1.5s" }} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">Analyzing Medical Records...</h3>
                <p className="text-sm text-muted-foreground">AI is processing your patient's documents</p>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-secondary rounded-full overflow-hidden mb-8">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {processingSteps.map((step, i) => {
                  const isCompleted = completedSteps.includes(i);
                  const isActive = activeStep === i && !isCompleted;
                  return (
                    <motion.div
                      key={step.id}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border transition-colors",
                        isCompleted ? "border-green-400/30 bg-green-400/5" :
                        isActive ? "border-primary/30 bg-primary/5" :
                        "border-border bg-transparent opacity-40"
                      )}
                    >
                      <div className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold",
                        isCompleted ? "bg-green-400 text-background" :
                        isActive ? "bg-primary text-primary-foreground" :
                        "bg-secondary text-muted-foreground"
                      )}>
                        {isCompleted ? <CheckCircle className="w-4 h-4" /> : i + 1}
                      </div>
                      <span className={cn(
                        "text-sm font-medium",
                        isCompleted ? "text-green-400" :
                        isActive ? "text-primary" :
                        "text-muted-foreground"
                      )}>
                        {step.label}
                      </span>
                      {isActive && <Loader2 className="w-4 h-4 text-primary animate-spin ml-auto" />}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Done */}
        {uploadState === "done" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-green-400/30 bg-green-400/5 p-10 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-green-400/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Analysis Complete!</h3>
            <p className="text-sm text-muted-foreground mb-8">
              All 4 records processed. 6 clinical insights detected. Health timeline generated.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => navigate("/dashboard/timeline")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
              >
                View Health Timeline <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/dashboard")}
                className="border border-border cursor-pointer"
              >
                Back to Dashboard
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
