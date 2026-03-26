// Dummy dataset for air quality monitoring
export interface AirQualityEntry {
  location: string;
  aqi: number;
  pm25: number;
  co: number;
  status: "Good" | "Moderate" | "Unhealthy" | "Hazardous";
  timestamp: string;
}

export interface SymptomReport {
  id: string;
  name: string;
  symptom: string;
  severity: "low" | "medium" | "high";
  timestamp: string;
}

export const initialData: AirQualityEntry[] = [
  { location: "Chennai", aqi: 180, pm25: 95, co: 1.2, status: "Unhealthy", timestamp: "2026-03-26T10:00:00" },
  { location: "Madurai", aqi: 90, pm25: 40, co: 0.8, status: "Moderate", timestamp: "2026-03-26T10:00:00" },
  { location: "Coimbatore", aqi: 45, pm25: 18, co: 0.3, status: "Good", timestamp: "2026-03-26T10:00:00" },
  { location: "Trichy", aqi: 160, pm25: 82, co: 1.1, status: "Unhealthy", timestamp: "2026-03-26T10:00:00" },
  { location: "Salem", aqi: 75, pm25: 35, co: 0.6, status: "Moderate", timestamp: "2026-03-26T10:00:00" },
  { location: "Vellore", aqi: 210, pm25: 120, co: 1.8, status: "Hazardous", timestamp: "2026-03-26T10:00:00" },
  { location: "Erode", aqi: 30, pm25: 12, co: 0.2, status: "Good", timestamp: "2026-03-26T10:00:00" },
  { location: "Tirunelveli", aqi: 55, pm25: 25, co: 0.4, status: "Moderate", timestamp: "2026-03-26T10:00:00" },
];

// Simulate fluctuation in AQI data
export function simulateUpdate(data: AirQualityEntry[]): AirQualityEntry[] {
  return data.map((entry) => {
    const delta = Math.floor(Math.random() * 21) - 10; // -10 to +10
    const newAqi = Math.max(0, Math.min(500, entry.aqi + delta));
    const newPm25 = Math.max(0, +(entry.pm25 + (Math.random() * 6 - 3)).toFixed(1));
    const newCo = Math.max(0, +(entry.co + (Math.random() * 0.2 - 0.1)).toFixed(2));
    let status: AirQualityEntry["status"] = "Good";
    if (newAqi > 200) status = "Hazardous";
    else if (newAqi > 150) status = "Unhealthy";
    else if (newAqi > 50) status = "Moderate";
    return {
      ...entry,
      aqi: newAqi,
      pm25: newPm25,
      co: newCo,
      status,
      timestamp: new Date().toISOString(),
    };
  });
}

export const SYMPTOMS = [
  "Coughing",
  "Shortness of breath",
  "Eye irritation",
  "Headache",
  "Throat irritation",
  "Chest tightness",
  "Nausea",
  "Fatigue",
];

export function getStatusColor(status: string): string {
  switch (status) {
    case "Good": return "text-aqi-good";
    case "Moderate": return "text-aqi-moderate";
    case "Unhealthy": return "text-aqi-unhealthy";
    case "Hazardous": return "text-aqi-hazardous";
    default: return "text-muted-foreground";
  }
}

export function getStatusBg(status: string): string {
  switch (status) {
    case "Good": return "aqi-good";
    case "Moderate": return "aqi-moderate";
    case "Unhealthy": return "aqi-unhealthy";
    case "Hazardous": return "aqi-hazardous";
    default: return "bg-muted";
  }
}
