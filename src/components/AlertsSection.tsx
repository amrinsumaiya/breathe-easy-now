import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ShieldAlert } from "lucide-react";
import type { AirQualityEntry } from "@/data/airQualityData";

interface Props {
  data: AirQualityEntry[];
}

export default function AlertsSection({ data }: Props) {
  const alerts = data.filter((d) => d.aqi > 150);

  if (alerts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card rounded-xl p-5 border border-border flex items-center gap-3"
      >
        <ShieldAlert className="w-5 h-5 text-aqi-good" />
        <span className="text-sm text-muted-foreground">All locations are within safe AQI limits.</span>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {alerts.map((a) => (
          <motion.div
            key={a.location}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`rounded-xl p-4 border flex items-start gap-3 ${
              a.aqi > 200
                ? "bg-aqi-hazardous/10 border-aqi-hazardous/30"
                : "bg-aqi-unhealthy/10 border-aqi-unhealthy/30"
            }`}
          >
            <AlertTriangle className={`w-5 h-5 mt-0.5 shrink-0 ${a.aqi > 200 ? "text-aqi-hazardous" : "text-aqi-unhealthy"}`} />
            <div>
              <p className="text-sm font-semibold">
                ⚠️ {a.location} — AQI {a.aqi} ({a.status})
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                PM2.5: {a.pm25} µg/m³ · CO: {a.co} mg/m³. Limit outdoor activities.
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
