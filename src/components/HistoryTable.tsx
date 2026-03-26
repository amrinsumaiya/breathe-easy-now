import { motion } from "framer-motion";
import type { AirQualityEntry } from "@/data/airQualityData";
import { getStatusColor } from "@/data/airQualityData";

interface Props {
  data: AirQualityEntry[];
}

export default function HistoryTable({ data }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card rounded-xl border border-border overflow-hidden"
    >
      <div className="p-6 pb-3">
        <h2 className="font-display text-lg font-semibold">Air Quality History</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">AQI</th>
              <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">PM2.5</th>
              <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">CO</th>
              <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, i) => (
              <tr key={`${entry.location}-${i}`} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                <td className="px-6 py-3 font-medium">{entry.location}</td>
                <td className={`px-6 py-3 font-bold font-display ${getStatusColor(entry.status)}`}>{entry.aqi}</td>
                <td className="px-6 py-3">{entry.pm25}</td>
                <td className="px-6 py-3">{entry.co}</td>
                <td className="px-6 py-3">
                  <span className={`text-xs font-semibold ${getStatusColor(entry.status)}`}>{entry.status}</span>
                </td>
                <td className="px-6 py-3 text-muted-foreground text-xs">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
