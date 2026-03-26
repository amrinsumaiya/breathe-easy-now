import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { AirQualityEntry } from "@/data/airQualityData";

interface Props {
  data: AirQualityEntry[];
}

function getBarColor(aqi: number) {
  if (aqi > 200) return "hsl(280, 67%, 44%)";
  if (aqi > 150) return "hsl(0, 84%, 60%)";
  if (aqi > 50) return "hsl(45, 93%, 47%)";
  return "hsl(142, 71%, 45%)";
}

export default function AqiChart({ data }: Props) {
  return (
    <div className="glass-card rounded-xl p-6 border border-border">
      <h2 className="font-display text-lg font-semibold mb-4">AQI by Location</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
            <XAxis dataKey="location" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                borderRadius: "0.75rem",
                border: "1px solid hsl(var(--border))",
                background: "hsl(var(--card))",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="aqi" radius={[6, 6, 0, 0]}>
              {data.map((entry, i) => (
                <Cell key={i} fill={getBarColor(entry.aqi)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
