import { motion } from "framer-motion";
import { Wind, Droplets, Gauge } from "lucide-react";
import type { AirQualityEntry } from "@/data/airQualityData";
import { getStatusColor } from "@/data/airQualityData";

interface Props {
  data: AirQualityEntry[];
}

export default function DashboardCards({ data }: Props) {
  // Average values across all locations
  const avgAqi = Math.round(data.reduce((s, d) => s + d.aqi, 0) / data.length);
  const avgPm25 = +(data.reduce((s, d) => s + d.pm25, 0) / data.length).toFixed(1);
  const avgCo = +(data.reduce((s, d) => s + d.co, 0) / data.length).toFixed(2);

  const overallStatus = avgAqi > 200 ? "Hazardous" : avgAqi > 150 ? "Unhealthy" : avgAqi > 50 ? "Moderate" : "Good";

  const cards = [
    { label: "Average AQI", value: avgAqi, icon: Gauge, unit: "", status: overallStatus },
    { label: "PM2.5", value: avgPm25, icon: Droplets, unit: "µg/m³", status: avgPm25 > 55 ? "Unhealthy" : avgPm25 > 35 ? "Moderate" : "Good" },
    { label: "CO Level", value: avgCo, icon: Wind, unit: "mg/m³", status: avgCo > 1.0 ? "Unhealthy" : avgCo > 0.5 ? "Moderate" : "Good" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass-card rounded-xl p-6 border border-border"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">{card.label}</span>
            <card.icon className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className={`text-3xl font-display font-bold ${getStatusColor(card.status)}`}>
            {card.value}
            <span className="text-sm font-body font-normal text-muted-foreground ml-1">{card.unit}</span>
          </div>
          <div className={`text-xs font-medium mt-2 ${getStatusColor(card.status)}`}>{card.status}</div>
        </motion.div>
      ))}
    </div>
  );
}
