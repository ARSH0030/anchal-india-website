export type GlobalMarket = {
  id: string;
  name: string;
  region: "Latin America" | "Selected Markets" | "Supply Network";
  type: "export-market" | "supply-node";
  x: number;
  y: number;
  description: string;
  capabilities: string[];
};

const exportDescription = "Automotive requirements supported through coordinated sourcing, consolidation and export execution from India.";
const exportCapabilities = ["Application support", "Multi-brand consolidation", "Export coordination"];

export const indiaHub = { id: "india", name: "India", x: 638, y: 188.5 } as const;

export const globalMarkets: GlobalMarket[] = [
  { id: "colombia", name: "Colombia", region: "Latin America", type: "export-market", x: 269.7, y: 233.7, description: exportDescription, capabilities: exportCapabilities },
  { id: "guatemala", name: "Guatemala", region: "Latin America", type: "export-market", x: 233.4, y: 202.1, description: exportDescription, capabilities: exportCapabilities },
  { id: "peru", name: "Peru", region: "Latin America", type: "export-market", x: 268.5, y: 272.3, description: exportDescription, capabilities: exportCapabilities },
  { id: "chile", name: "Chile", region: "Latin America", type: "export-market", x: 286.8, y: 347.1, description: exportDescription, capabilities: exportCapabilities },
  { id: "ecuador", name: "Ecuador", region: "Latin America", type: "export-market", x: 260.1, y: 251.7, description: exportDescription, capabilities: exportCapabilities },
  { id: "mexico", name: "Mexico", region: "Latin America", type: "export-market", x: 207.4, y: 179.9, description: exportDescription, capabilities: exportCapabilities },
  { id: "dominican-republic", name: "Dominican Republic", region: "Latin America", type: "export-market", x: 282.4, y: 193.8, description: exportDescription, capabilities: exportCapabilities },
  { id: "honduras", name: "Honduras", region: "Latin America", type: "export-market", x: 242.8, y: 203.8, description: exportDescription, capabilities: exportCapabilities },
  { id: "argentina", name: "Argentina", region: "Latin America", type: "export-market", x: 306.5, y: 354.9, description: exportDescription, capabilities: exportCapabilities },
  { id: "uruguay", name: "Uruguay", region: "Latin America", type: "export-market", x: 321.4, y: 338.2, description: exportDescription, capabilities: exportCapabilities },
  { id: "bolivia", name: "Bolivia", region: "Latin America", type: "export-market", x: 297.4, y: 292.3, description: exportDescription, capabilities: exportCapabilities },
  { id: "nicaragua", name: "Nicaragua", region: "Latin America", type: "export-market", x: 244.6, y: 210.3, description: exportDescription, capabilities: exportCapabilities },
  { id: "haiti", name: "Haiti", region: "Latin America", type: "export-market", x: 277.4, y: 193.1, description: exportDescription, capabilities: exportCapabilities },
  { id: "turkey", name: "Turkey", region: "Selected Markets", type: "export-market", x: 529.3, y: 136.6, description: exportDescription, capabilities: exportCapabilities },
  { id: "egypt", name: "Egypt", region: "Selected Markets", type: "export-market", x: 522.3, y: 170.9, description: exportDescription, capabilities: exportCapabilities },
  { id: "middle-east", name: "Middle East", region: "Selected Markets", type: "export-market", x: 556.4, y: 178.9, description: exportDescription, capabilities: exportCapabilities },
  { id: "philippines", name: "Philippines", region: "Selected Markets", type: "export-market", x: 743.5, y: 210.3, description: exportDescription, capabilities: exportCapabilities },
  { id: "china", name: "China", region: "Supply Network", type: "supply-node", x: 687.5, y: 145.4, description: "A supporting supply connection within Anchal India’s wider coordination network.", capabilities: ["Supply coordination", "Requirement alignment", "India consolidation"] },
];
