import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Loader2 } from "lucide-react";
import { initialData, simulateUpdate, type AirQualityEntry } from "@/data/airQualityData";
import DashboardCards from "@/components/DashboardCards";
import HeatmapGrid from "@/components/HeatmapGrid";
import AlertsSection from "@/components/AlertsSection";
import SymptomForm from "@/components/SymptomForm";
import HistoryTable from "@/components/HistoryTable";
import AqiChart from "@/components/AqiChart";
import ThemeToggle from "@/components/ThemeToggle";

export default function Index() {
  const [data, setData] = useState<AirQualityEntry[]>(initialData);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Simulate real-time updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => simulateUpdate(prev));
      setLastUpdated(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <span className="text-muted-foreground font-display">Loading air quality data…</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold leading-tight">AirWatch</h1>
              <p className="text-[10px] text-muted-foreground leading-tight">Crowdsourced Air Quality Monitor</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-muted-foreground hidden sm:block">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aqi-good opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-aqi-good" />
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Dashboard Cards */}
        <section>
          <DashboardCards data={data} />
        </section>

        {/* Alerts */}
        <section>
          <h2 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
            🚨 Active Alerts
          </h2>
          <AlertsSection data={data} />
        </section>

        {/* Chart + Heatmap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AqiChart data={data} />
          <HeatmapGrid data={data} />
        </div>

        {/* Symptom Form + History */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <SymptomForm />
          </div>
          <div className="lg:col-span-2">
            <HistoryTable data={data} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          AirWatch — Crowdsourced Air Quality Monitoring System · Data updates every 5 seconds (simulated)
        </div>
      </footer>
    </div>
  );
}
