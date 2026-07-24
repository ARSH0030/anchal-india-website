export const productGroups = [
  "Engine","Transmission","Electrical & Electronics","Suspension & Steering","Braking",
  "Fuel & Intake","Controls & Cables","Wheels","Body & Frame","Filters & Consumables"
] as const;

export const partnerBrands = ["Gabriel","UCAL","Pricol","Champion","Goetze","Suprajit","Flash","Uno Minda","Spark Minda","MK","Makino","Hero Rockman","IFB","Varroc","INEL"];
export const markets = ["Latin America","Turkey","Middle East","Egypt","Philippines"];

export type VehicleType = "Motorcycle" | "3-Wheeler";
export type Vehicle = {
  id: string; type: VehicleType; brand: string; model: string; variants: string[];
  groups: readonly string[];
};

export const vehicles: Vehicle[] = [
  {id:"bajaj-pulsar-ns200",type:"Motorcycle",brand:"Bajaj",model:"Pulsar NS200",variants:["BS4","BS6 / FI"],groups:productGroups},
  {id:"bajaj-ct100",type:"Motorcycle",brand:"Bajaj",model:"CT100",variants:["ES","KS"],groups:productGroups},
  {id:"bajaj-boxer",type:"Motorcycle",brand:"Bajaj",model:"Boxer",variants:["BM100","BM150"],groups:productGroups},
  {id:"bajaj-platina",type:"Motorcycle",brand:"Bajaj",model:"Platina",variants:["100","110"],groups:productGroups},
  {id:"bajaj-discover",type:"Motorcycle",brand:"Bajaj",model:"Discover",variants:["125","125 ST","150"],groups:productGroups},
  {id:"bajaj-dominar",type:"Motorcycle",brand:"Bajaj",model:"Dominar 400",variants:["BS4","BS6"],groups:productGroups},
  {id:"bajaj-pulsar-135",type:"Motorcycle",brand:"Bajaj",model:"Pulsar 135 LS",variants:["LS"],groups:productGroups},
  {id:"tvs-raider-125",type:"Motorcycle",brand:"TVS",model:"Raider 125",variants:["Drum","Disc"],groups:productGroups},
  {id:"tvs-apache",type:"Motorcycle",brand:"TVS",model:"Apache",variants:["RTR 160","RTR 180","RTR 200 4V"],groups:productGroups},
  {id:"tvs-hlx",type:"Motorcycle",brand:"TVS",model:"HLX 150",variants:["5 Speed"],groups:productGroups},
  {id:"tvs-sport",type:"Motorcycle",brand:"TVS",model:"Sport 100",variants:["ELS","KLS"],groups:productGroups},
  {id:"honda-navi",type:"Motorcycle",brand:"Honda",model:"Navi",variants:["110"],groups:productGroups},
  {id:"ktm-duke",type:"Motorcycle",brand:"KTM",model:"Duke",variants:["200","250","390"],groups:productGroups},
  {id:"ktm-rc",type:"Motorcycle",brand:"KTM",model:"RC",variants:["200","390"],groups:productGroups},
  {id:"ktm-adventure",type:"Motorcycle",brand:"KTM",model:"Adventure",variants:["250","390"],groups:productGroups},
  {id:"hero-xpulse",type:"Motorcycle",brand:"Hero",model:"Xpulse 200",variants:["BS4","BS6"],groups:productGroups},
  {id:"royal-enfield-himalayan",type:"Motorcycle",brand:"Royal Enfield",model:"Himalayan 410",variants:["BS4"],groups:productGroups},
  {id:"husqvarna-250",type:"Motorcycle",brand:"Husqvarna",model:"Svartpilen / Vitpilen 250",variants:["250"],groups:productGroups},
  {id:"yamaha-fz",type:"Motorcycle",brand:"Yamaha",model:"FZ",variants:["FZ-S","FZ25"],groups:productGroups},
  {id:"tvs-king",type:"3-Wheeler",brand:"TVS",model:"King",variants:["Petrol","CNG","LPG"],groups:productGroups},
  {id:"bajaj-re",type:"3-Wheeler",brand:"Bajaj",model:"RE",variants:["Compact","Maxima"],groups:productGroups},
  {id:"piaggio-ape",type:"3-Wheeler",brand:"Piaggio",model:"Ape",variants:["City","Xtra","E-City"],groups:productGroups},
  {id:"atul-gem",type:"3-Wheeler",brand:"Atul",model:"Gem",variants:["Cargo","Passenger"],groups:productGroups},
];

export interface CatalogRepository {
  listVehicles(): Promise<Vehicle[]>;
  getVehicle(id: string): Promise<Vehicle | null>;
}

export const mockCatalogRepository: CatalogRepository = {
  async listVehicles() { return vehicles; },
  async getVehicle(id) { return vehicles.find(v => v.id === id) ?? null; },
};
