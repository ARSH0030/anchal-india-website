"use client";

import Link from "next/link";
import {
  FormEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  partnerBrands,
  vehicles,
  type VehicleType,
} from "@/data/catalog";

export type RfqContext = {
  vehicle?: string;
  group?: string;
  code?: string;
  brand?: string;
  sector?: string;
};

export function SectionTitle({
  kicker,
  title,
  copy,
  center = false,
}: {
  kicker: string;
  title: string;
  copy?: string;
  center?: boolean;
}) {
  return (
    <div className={`section-title ${center ? "center" : ""}`}>
      <p>{kicker}</p>
      <h2>{title}</h2>
      {copy && <span>{copy}</span>}
    </div>
  );
}

export function GlassModal({
  open,
  onClose,
  label,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = oldOverflow;
      previous?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
      role="presentation"
    >
      <section
        className="glass-modal"
        role="dialog"
        aria-modal="true"
        aria-label={label}
        ref={dialogRef}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close dialog"
          ref={closeRef}
        >
          ×
        </button>
        {children}
      </section>
    </div>
  );
}

export const systemDetails: Record<string, { parts: string[]; copy: string }> = {
  Engine: {
    parts: ["Pistons & rings", "Cylinder kits", "Valves", "Gaskets", "Oil pumps", "Timing components"],
    copy: "The power-generating core of the vehicle, supported through precision components selected around application and operating conditions.",
  },
  Transmission: {
    parts: ["Clutch plates", "Clutch assemblies", "Chains & sprockets", "Gears", "Shift components"],
    copy: "Transfers engine power efficiently to the road through matched clutch, gear and final-drive components.",
  },
  "Electrical & Electronics": {
    parts: ["Ignition", "Regulators", "Magnetos", "Switches", "Sensors", "Instrument clusters"],
    copy: "Starting, charging, control and information systems that keep modern two- and three-wheelers dependable.",
  },
  "Suspension & Steering": {
    parts: ["Shock absorbers", "Front forks", "Bush kits", "Steering races", "Cone sets"],
    copy: "Ride-control components engineered to manage road forces, stability and rider comfort.",
  },
  Braking: {
    parts: ["Brake shoes", "Disc pads", "Discs", "Control components", "Cables"],
    copy: "Friction and control products that support consistent stopping performance across applications.",
  },
  "Fuel & Intake": {
    parts: ["Carburettors", "Fuel pumps", "Throttle bodies", "Valves", "Air-intake components"],
    copy: "Fuel delivery and air-management systems selected around vehicle application and market requirements.",
  },
  "Controls & Cables": {
    parts: ["Control cables", "Throttle controls", "Levers", "Switchgear", "Gear shifters"],
    copy: "The physical and electronic control interfaces connecting the rider with the machine.",
  },
  Wheels: {
    parts: ["Alloy wheels", "Rims", "Hubs", "Bearings", "Related hardware"],
    copy: "Rotating and load-bearing components for stable, efficient vehicle movement.",
  },
  "Body & Frame": {
    parts: ["Body panels", "Chassis parts", "Mirrors", "Rubber parts", "Locks"],
    copy: "Structural, protection and finish components that complete the vehicle.",
  },
  "Filters & Consumables": {
    parts: ["Air filters", "Oil filters", "Fuel filters", "Bulbs", "Service parts"],
    copy: "Routine service products that help preserve performance throughout the vehicle lifecycle.",
  },
};

export function PartFinder({ expanded = false }: { expanded?: boolean }) {
  const [type, setType] = useState<VehicleType>("Motorcycle");
  const brands = useMemo(
    () => Array.from(new Set(vehicles.filter((vehicle) => vehicle.type === type).map((vehicle) => vehicle.brand))),
    [type],
  );
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [group, setGroup] = useState("");
  const [code, setCode] = useState("");
  const [modal, setModal] = useState(false);
  const models = vehicles.filter((vehicle) => vehicle.type === type && vehicle.brand === brand);
  const selected = vehicles.find((vehicle) => vehicle.id === model);

  function reset(next: VehicleType) {
    setType(next);
    setBrand("");
    setModel("");
    setGroup("");
  }

  return (
    <div className={`finder-island ${expanded ? "expanded" : ""}`}>
      <div className="finder-head">
        <div><small>APPLICATION INTELLIGENCE</small><h3>Find the right part. Fast.</h3></div>
        <div className="segmented" aria-label="Vehicle type">
          <button className={type === "Motorcycle" ? "active" : ""} onClick={() => reset("Motorcycle")}>Motorcycle</button>
          <button className={type === "3-Wheeler" ? "active" : ""} onClick={() => reset("3-Wheeler")}>3-Wheeler</button>
        </div>
      </div>
      <div className="finder-grid">
        <label><span>01 · Brand</span><select value={brand} onChange={(event) => { setBrand(event.target.value); setModel(""); setGroup(""); }}><option value="">Choose brand</option>{brands.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label><span>02 · Model</span><select value={model} disabled={!brand} onChange={(event) => { setModel(event.target.value); setGroup(""); }}><option value="">Choose model</option>{models.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.model}</option>)}</select></label>
        <label><span>03 · Product group</span><select value={group} disabled={!model} onChange={(event) => setGroup(event.target.value)}><option value="">Choose system</option>{(selected?.groups ?? []).map((value) => <option key={value}>{value}</option>)}</select></label>
        <button className="action-button" disabled={!group} onClick={() => setModal(true)}>View solutions <span>→</span></button>
      </div>
      {expanded && <div className="code-search" id="code"><div><small>KNOW THE CODE?</small><strong>Find part by OEM / reference code</strong></div><input value={code} onChange={(event) => setCode(event.target.value)} placeholder="Enter OEM, supplier or part reference" aria-label="OEM or reference code"/>{code ? <Link href={`/contact?code=${encodeURIComponent(code)}`} className="code-action active">Search / request →</Link> : <span className="code-action" aria-disabled="true">Enter a code to continue</span>}</div>}
      <p className="finder-note">{selected ? <><b>{selected.brand} {selected.model}</b> · Model-specific catalogue support is available on request.</> : <>Select a vehicle to reveal application and catalogue support.</>} <Link href={model ? `/contact?vehicle=${encodeURIComponent(model)}` : "/contact"}>Request catalogue ↗</Link></p>
      <GlassModal open={modal} onClose={() => setModal(false)} label={`${group} solutions`}>
        <div className="modal-visual part-visual"><span>{group.slice(0, 1)}</span></div>
        <p className="modal-kicker">{selected?.brand} · {selected?.model}</p><h2>{group}</h2><p>{systemDetails[group]?.copy}</p>
        <div className="part-list">{systemDetails[group]?.parts.map((part) => <span key={part}>{part}</span>)}</div>
        <div className="modal-note"><b>OEM / reference intelligence</b><span>Exact codes are confirmed against the relevant source catalogue.</span></div>
        <Link className="action-button" href={`/contact?vehicle=${encodeURIComponent(model)}&group=${encodeURIComponent(group)}`}>Add to requirement →</Link>
      </GlassModal>
    </div>
  );
}

export function VehicleExplorer() {
  const [vehicle, setVehicle] = useState<"bike" | "tuktuk">("bike");
  const [selected, setSelected] = useState<string | null>(null);
  const systems = ["Engine", "Transmission", "Electrical & Electronics", "Suspension & Steering", "Braking", "Controls & Cables"];
  return (
    <div className="vehicle-explorer">
      <div className="vehicle-tabs" aria-label="Vehicle illustration">
        <button className={vehicle === "bike" ? "active" : ""} onClick={() => setVehicle("bike")}>Motorcycle</button>
        <button className={vehicle === "tuktuk" ? "active" : ""} onClick={() => setVehicle("tuktuk")}>3-Wheeler</button>
      </div>
      <div className={`vehicle-stage ${vehicle}`}>
        <div className="vehicle-silhouette" aria-hidden="true">{vehicle === "bike" ? <><span className="bike-body"/><i className="tyre t1"/><i className="tyre t2"/></> : <><span className="tuk-body"/><i className="tyre t1"/><i className="tyre t2"/></>}</div>
        {systems.map((system, index) => <button key={system} className={`hotspot hot-${index + 1}`} onClick={() => setSelected(system)} aria-label={`Explore ${system}`}><b>+</b><span>{system}</span></button>)}
      </div>
      <GlassModal open={Boolean(selected)} onClose={() => setSelected(null)} label={`${selected ?? "Vehicle"} system`}>{selected && <><p className="modal-kicker">VEHICLE SYSTEM</p><h2>{selected}</h2><p>{systemDetails[selected]?.copy}</p><div className="part-list">{systemDetails[selected]?.parts.map((part) => <span key={part}>{part}</span>)}</div><Link className="action-button" href={`/contact?group=${encodeURIComponent(selected)}`}>Enquire about this system →</Link></>}</GlassModal>
    </div>
  );
}

export function BrandMarquee() {
  const doubled = [...partnerBrands, ...partnerBrands];
  return <div className="logo-marquee" aria-label="Selected automotive network brands"><div>{doubled.map((brand, index) => <span className="brand-logo" key={`${brand}-${index}`}><i aria-hidden="true">{brand.slice(0, 1)}</i><b>{brand}</b></span>)}</div></div>;
}

export function WorldMap() {
  return <div className="world-stage" aria-label="Anchal India global reach visual"><div className="world-grid"/><div className="continent c-americas"/><div className="continent c-europe"/><div className="continent c-africa"/><div className="continent c-asia"/><span className="origin">INDIA<i/></span>{["LATIN AMERICA", "MIDDLE EAST", "TURKEY", "EGYPT", "PHILIPPINES"].map((destination, index) => <span key={destination} className={`destination d${index + 1}`}>{destination}</span>)}{[1, 2, 3, 4, 5].map((index) => <i key={index} className={`route r${index}`}><b>▰</b></i>)}<span className="china-node">CHINA · SUPPLY NODE</span></div>;
}

export const sectors = [
  { name: "Textiles", mark: "TX", tag: "Yarn · Fabrics · Made-ups", copy: "Selected textile opportunities spanning yarn, woven and knitted fabrics, home textiles and finished made-ups." },
  { name: "Electrical Appliances", mark: "EA", tag: "Kitchen · Home · Electrical", copy: "Product-led sourcing across selected kitchen, household and electrical appliance categories." },
  { name: "Building Materials", mark: "BM", tag: "Tiles · Granite · Marble", copy: "Architectural surfaces and building materials selected around project specifications and destination-market needs." },
  { name: "Healthcare", mark: "HC", tag: "Pharma · Consumables · Supplies", copy: "Selected healthcare and pharmaceutical requirements, subject to product and market-specific regulatory verification." },
  { name: "Solar Kit", mark: "SK", tag: "Panels · Inverters · Batteries", copy: "Solar modules, storage, inverters and balance-of-system components for defined energy requirements." },
];

export function BeyondGrid() {
  const [selected, setSelected] = useState<(typeof sectors)[number] | null>(null);
  return <><div className="sector-grid">{sectors.map((sector, index) => <button key={sector.name} className={`sector-card sector-${index + 1}`} onClick={() => setSelected(sector)}><i aria-hidden="true">{sector.mark}</i><small>{sector.tag}</small><strong>{sector.name}</strong><span>Explore ↗</span></button>)}</div><GlassModal open={Boolean(selected)} onClose={() => setSelected(null)} label={`${selected?.name ?? "Sector"} details`}>{selected && <><div className="modal-sector-mark" aria-hidden="true">{selected.mark}</div><p className="modal-kicker">BEYOND AUTOMOTIVE</p><h2>{selected.name}</h2><p>{selected.copy}</p><div className="part-list">{selected.tag.split(" · ").map((item) => <span key={item}>{item}</span>)}</div><Link href={`/contact?sector=${encodeURIComponent(selected.name)}`} className="action-button">Discuss a requirement →</Link></>}</GlassModal></>;
}

const enquiryTypes = ["Vehicle / Model Parts", "OEM / Part Number", "Complete Requirement List", "Brand / Network", "Beyond Automotive", "General Enquiry"];

function initialEnquiryType(context: RfqContext) {
  if (context.code) return "OEM / Part Number";
  if (context.sector) return "Beyond Automotive";
  if (context.brand) return "Brand / Network";
  if (context.vehicle || context.group) return "Vehicle / Model Parts";
  return enquiryTypes[0];
}

export function SmartRfq({ initialContext = {} }: { initialContext?: RfqContext }) {
  const [type, setType] = useState(() => initialEnquiryType(initialContext));
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");
  const contextEntries = Object.entries(initialContext).filter((entry): entry is [string, string] => Boolean(entry[1]));

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");
    try {
      const response = await fetch("/api/rfq", { method: "POST", body: new FormData(event.currentTarget) });
      const result = await response.json() as { error?: string; reference?: string };
      if (!response.ok) throw new Error(result.error || "We could not send your requirement.");
      setReference(result.reference ?? "");
      setStatus("success");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "We could not send your requirement.");
      setStatus("error");
    }
  }

  if (status === "success") return <div className="rfq-success" role="status"><span>✓</span><h3>Your requirement has been sent.</h3><p>Our team will review it and reply using the contact details provided.</p>{reference && <small>Reference: {reference}</small>}<a href="https://wa.me/919999029920">Continue on WhatsApp →</a></div>;

  return <form className="smart-rfq" onSubmit={submit} encType="multipart/form-data">
    <input type="hidden" name="enquiryType" value={type}/>
    {contextEntries.map(([key, value]) => <input key={key} type="hidden" name={key} value={value}/>)}
    <label className="website-field" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
    <div className="rfq-types" aria-label="Enquiry type">{enquiryTypes.map((item) => <button type="button" className={type === item ? "active" : ""} onClick={() => setType(item)} key={item}>{item}</button>)}</div>
    {contextEntries.length > 0 && <div className="rfq-context"><b>Added from your selection</b>{contextEntries.map(([key, value]) => <span key={key}><small>{key}</small>{value}</span>)}</div>}
    <div className="rfq-fields"><label>Name *<input required name="name" autoComplete="name" maxLength={100}/></label><label>Company *<input required name="company" autoComplete="organization" maxLength={120}/></label><label>Email *<input type="email" required name="email" autoComplete="email" maxLength={160}/></label><label>Country *<input required name="country" autoComplete="country-name" maxLength={100}/></label></div>
    <label className="wide">Phone / WhatsApp<input name="phone" type="tel" autoComplete="tel" maxLength={40}/></label>
    <label className="wide">Tell us what you need *<textarea required name="message" rows={4} maxLength={5000} placeholder={type === "OEM / Part Number" ? "Enter OEM / reference code, vehicle and quantity" : "Vehicle, model, products, quantities or destination market…"}/></label>
    <label className="upload">＋ <b>Attach requirement list or product images</b><span>XLSX · XLS · CSV · PDF · JPG · PNG · up to 3 files / 5 MB each</span><input name="attachments" type="file" multiple accept=".xlsx,.xls,.csv,.pdf,.jpg,.jpeg,.png,image/jpeg,image/png"/></label>
    <label className="consent"><input type="checkbox" name="consent" value="yes" required/><span>I agree that Anchal India may use these details to respond to my enquiry, as described in the <Link href="/privacy">Privacy Policy</Link>.</span></label>
    {status === "error" && <p className="rfq-error" role="alert">{message} You can also email <a href="mailto:info@anchalpiston.com">info@anchalpiston.com</a> or use WhatsApp.</p>}
    <button className="action-button" disabled={status === "submitting"}>{status === "submitting" ? "Sending…" : "Send requirement →"}</button>
  </form>;
}

export function PageCta({ title, copy }: { title: string; copy: string }) {
  return <section className="page-cta"><div className="shell"><p>START A CONVERSATION</p><h2>{title}</h2><span>{copy}</span><div><Link href="/contact" className="action-button light">Tell us what you need →</Link><a href="https://wa.me/919999029920">WhatsApp</a></div></div></section>;
}
