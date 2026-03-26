import { motion } from "framer-motion";
import type { AirQualityEntry } from "@/data/airQualityData";
import { getStatusBg } from "@/data/airQualityData";

interface Props {
  data: AirQualityEntry[];
}

export default function HeatmapGrid({ data }: Props) {
  return (
    <div className="glass-card rounded-xl p-6 border border-border">
      <h2 className="font-display text-lg font-semibold mb-4">Pollution Heatmap</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {data.map((entry, i) => (
          <motion.div
            key={entry.location}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`${getStatusBg(entry.status)} rounded-lg p-4 text-center transition-colors duration-500`}
          >
            <div className="text-xs font-semibold text-white/90 uppercase tracking-wide">{entry.location}</div>
            <div className="text-2xl font-display font-bold text-white mt-1">{entry.aqi}</div>
            <div className="text-[10px] text-white/70 mt-0.5">{entry.status}</div>
          </motion.div>
        ))}
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 text-xs text-muted-foreground">
        {[
          { label: "Good (0-50)", cls: "aqi-good" },
          { label: "Moderate (51-150)", cls: "aqi-moderate" },
          { label: "Unhealthy (151-200)", cls: "aqi-unhealthy" },
          { label: "Hazardous (200+)", cls: "aqi-hazardous" },
        ].map((l) => (
          <span key={l.label} className="flex items-center gap-1.5">
            <span className={`w-3 h-3 rounded-sm ${l.cls}`} />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
}
