import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { SYMPTOMS, type SymptomReport } from "@/data/airQualityData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function SymptomForm() {
  const [name, setName] = useState("");
  const [symptom, setSymptom] = useState(SYMPTOMS[0]);
  const [severity, setSeverity] = useState<"low" | "medium" | "high">("low");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const report: SymptomReport = {
      id: crypto.randomUUID(),
      name: name || "Anonymous",
      symptom,
      severity,
      timestamp: new Date().toISOString(),
    };
    // Store in localStorage
    const existing = JSON.parse(localStorage.getItem("symptom-reports") || "[]");
    existing.unshift(report);
    localStorage.setItem("symptom-reports", JSON.stringify(existing));
    toast.success("Symptom report submitted!");
    setName("");
    setSeverity("low");
  };

  const severityColors = {
    low: "border-aqi-good text-aqi-good",
    medium: "border-aqi-moderate text-aqi-moderate",
    high: "border-aqi-unhealthy text-aqi-unhealthy",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6 border border-border"
    >
      <h2 className="font-display text-lg font-semibold mb-4">Report Symptoms</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Name (optional)</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Anonymous" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Symptom</label>
          <select
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
          >
            {SYMPTOMS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Severity</label>
          <div className="flex gap-2">
            {(["low", "medium", "high"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSeverity(s)}
                className={`flex-1 rounded-lg border-2 py-2 text-xs font-semibold capitalize transition-all ${
                  severity === s ? severityColors[s] + " bg-background" : "border-border text-muted-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <Button type="submit" className="w-full gap-2">
          <Send className="w-4 h-4" /> Submit Report
        </Button>
      </form>
    </motion.div>
  );
}
