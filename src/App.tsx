import { useRef, useState, type ReactNode } from "react";

type IconName =
  | "upload"
  | "spark"
  | "refresh"
  | "camera"
  | "download"
  | "book"
  | "grid"
  | "check"
  | "chevron"
  | "file"
  | "info";

const textilePhoto =
  "https://images.unsplash.com/photo-1606885118474-c8baf907e998?auto=format&fit=crop&w=1400&q=90";
const loomPhoto =
  "https://images.unsplash.com/photo-1638310533874-6c124c012e1d?auto=format&fit=crop&w=1200&q=85";
const fiberPhoto =
  "https://images.unsplash.com/photo-1655149238677-9b5cb1a0afc6?auto=format&fit=crop&w=1200&q=85";
const weavePhoto =
  "https://images.unsplash.com/photo-1739173502526-de6efeb0b30c?auto=format&fit=crop&w=1200&q=85";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    upload: (
      <>
        <path d="M12 16V4m0 0L7 9m5-5 5 5" />
        <path d="M5 15v4h14v-4" />
      </>
    ),
    spark: <path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3ZM5 15l.7 2.3L8 18l-2.3.7L5 21l-.7-2.3L2 18l2.3-.7L5 15Z" />,
    refresh: (
      <>
        <path d="M20 11a8 8 0 1 0-2.3 5.7" />
        <path d="M20 5v6h-6" />
      </>
    ),
    camera: (
      <>
        <path d="M4 7h3l1.5-2h7L17 7h3v12H4V7Z" />
        <circle cx="12" cy="13" r="3.5" />
      </>
    ),
    download: (
      <>
        <path d="M12 4v11m0 0 4-4m-4 4-4-4" />
        <path d="M5 19h14" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22V5.5Z" />
        <path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22V5.5Z" />
      </>
    ),
    grid: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    file: (
      <>
        <path d="M6 2h8l4 4v16H6V2Z" />
        <path d="M14 2v5h5M9 12h6m-6 4h6" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v6m0-10v.1" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function Button({
  children,
  tone = "primary",
  onClick,
  disabled,
  className = "",
}: {
  children: ReactNode;
  tone?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      className={`button button--${tone} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
}

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={`card ${className}`}>{children}</section>;
}

function SectionTitle({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-title">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  );
}

function Header({
  activeView,
  setActiveView,
}: {
  activeView: "dashboard" | "guide";
  setActiveView: (view: "dashboard" | "guide") => void;
}) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true">
          <span>PG</span>
        </div>
        <div className="brand-copy">
          <div className="brand-name">PATTERNGUARD</div>
          <div className="brand-tagline">
            Filipino textile auditing & restoration framework
          </div>
        </div>
      </div>
      <nav className="nav-tabs" aria-label="Primary navigation">
        <button
          className={activeView === "dashboard" ? "active" : ""}
          onClick={() => setActiveView("dashboard")}
          type="button"
        >
          <Icon name="grid" size={16} />
          Dashboard
        </button>
        <button
          className={activeView === "guide" ? "active" : ""}
          onClick={() => setActiveView("guide")}
          type="button"
        >
          <Icon name="book" size={16} />
          Educational Textile Reference Guide
        </button>
      </nav>
    </header>
  );
}

function ConfidenceRing({ value }: { value: number }) {
  return (
    <div
      className="confidence-ring"
      style={{ "--score": `${value * 3.6}deg` } as React.CSSProperties}
      aria-label={`${value}% confidence`}
    >
      <div>
        <strong>{value}%</strong>
        <span>match</span>
      </div>
    </div>
  );
}

function Dashboard() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("pinilian_sample_04.jpg");
  const [isRunning, setIsRunning] = useState(false);
  const [stage, setStage] = useState<"input" | "results">("input");

  const runPipeline = () => {
    setIsRunning(true);
    window.setTimeout(() => {
      setIsRunning(false);
      setStage("results");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  return (
    <main className={`page-shell audit-workspace audit-workspace--${stage}`}>
      <div className="workspace-heading">
        <div>
          <div className="breadcrumb">
            Restoration workspace / {stage === "input" ? "New audit" : "Audit results"}
          </div>
          <h1>{stage === "input" ? "Begin a Textile Audit" : "Audit Results"}</h1>
          <p>
            {stage === "input"
              ? "Upload one clear textile image. PatternGuard will classify the weave, inspect its symmetry, and reconstruct detected anomalies."
              : "Review the visual reconstruction, textile classification, and model confidence in one focused workspace."}
          </p>
        </div>
        <div className="workflow-stepper" aria-label="Audit progress">
          <div className={stage === "input" ? "active" : "complete"}>
            <span>{stage === "results" ? <Icon name="check" size={13} /> : "1"}</span>
            Upload image
          </div>
          <i />
          <div className={stage === "results" ? "active" : ""}>
            <span>2</span>
            Review results
          </div>
        </div>
      </div>

      {stage === "input" ? (
        <div className="input-stage">
          <Card className={`upload-stage-card ${isRunning ? "is-processing" : ""}`}>
            <SectionTitle eyebrow="Step 01 / Source image" title="Select a textile image" />
            <div className="upload-stage-grid">
              <div className="upload-panel">
                <input
                  ref={inputRef}
                  className="file-input"
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) setFileName(file.name);
                  }}
                />
                <button
                  type="button"
                  className="dropzone dropzone--large"
                  onClick={() => inputRef.current?.click()}
                >
                  <div className="upload-icon">
                    <Icon name="upload" size={27} />
                  </div>
                  <div>
                    <strong>Drop your textile image here</strong>
                    <span>or click to browse · PNG or JPG · Maximum 10MB</span>
                  </div>
                  <div className="browse-label">Choose image</div>
                </button>
                <div className="selected-file">
                  <div className="selected-preview">
                    <img src={textilePhoto} alt="Selected geometric textile sample" />
                  </div>
                  <div className="selected-file-copy">
                    <span>Selected image</span>
                    <strong>{fileName}</strong>
                    <small>2048 × 1536 · 4.2 MB · Ready for analysis</small>
                  </div>
                  <div className="file-check">
                    <Icon name="check" size={17} />
                  </div>
                </div>
              </div>
              <aside className="capture-guide">
                <div className="capture-guide-image">
                  <img src={textilePhoto} alt="" />
                  <div className="focus-frame" />
                </div>
                <div>
                  <span className="eyebrow">For a reliable audit</span>
                  <h2>Capture the full repeat.</h2>
                  <p>
                    Use even lighting and position the camera directly above the
                    textile. Include at least four complete motif repetitions.
                  </p>
                  <ul>
                    <li><Icon name="check" size={14} /> Pattern is flat and in focus</li>
                    <li><Icon name="check" size={14} /> Minimal glare or heavy shadows</li>
                    <li><Icon name="check" size={14} /> Camera is parallel to the surface</li>
                  </ul>
                </div>
              </aside>
            </div>
            <div className="upload-actions">
              <div>
                <Icon name="info" size={16} />
                Your image is processed only for this audit session.
              </div>
              <Button tone="ghost">
                <Icon name="camera" size={16} />
                View capture guide
              </Button>
              <Button onClick={runPipeline} disabled={isRunning} className="run-button">
                <Icon name="spark" size={17} />
                {isRunning ? "Analyzing textile…" : "Run audit pipeline"}
                {!isRunning && <Icon name="chevron" size={16} />}
              </Button>
            </div>
            {isRunning && (
              <div className="pipeline-progress">
                <div />
                <span>Mapping lattice and symmetry groups…</span>
              </div>
            )}
          </Card>
        </div>
      ) : (
        <div className="results-stage">
          <div className="results-toolbar">
            <div className="status-pill">
              <span className="status-dot" />
              Audit complete · PG-2408-071
            </div>
            <div>
              <Button tone="ghost" onClick={() => setStage("input")}>
                <Icon name="upload" size={15} />
                New image
              </Button>
              <Button tone="secondary" onClick={runPipeline}>
                <Icon name="refresh" size={15} />
                Re-run audit
              </Button>
              <Button>
                <Icon name="file" size={15} />
                Export PDF
              </Button>
            </div>
          </div>
          <div className="results-primary-grid">
            <Card className="results-card results-card--focused">
            <SectionTitle
              eyebrow="Comparative analysis"
              title="Visual Results"
              action={
                <Button tone="secondary">
                  <Icon name="download" size={15} />
                  Export images
                </Button>
              }
            />
            <div className="visual-grid">
              <ResultFrame label="A" title="Original image" className="original">
                <img src={textilePhoto} alt="Original red, black, and cream geometric textile" />
              </ResultFrame>
              <ResultFrame label="B" title="Detected error heatmap" className="heatmap">
                <img src={textilePhoto} alt="Detected anomaly heatmap over textile" />
                <div className="heatmap-overlay" />
                <span className="anomaly anomaly-one">01</span>
                <span className="anomaly anomaly-two">02</span>
              </ResultFrame>
              <ResultFrame label="C" title="Reconstructed textile" className="reconstructed">
                <img src={textilePhoto} alt="Digitally reconstructed geometric textile" />
                <div className="reconstruct-overlay" />
              </ResultFrame>
            </div>
            <div className="figure-caption">
              <span>
                <i className="legend original-legend" /> Source
              </span>
              <span>
                <i className="legend error-legend" /> Structural anomaly
              </span>
              <span>
                <i className="legend restored-legend" /> Restored region
              </span>
              <span className="analysis-id">Analysis ID PG-2408-071</span>
            </div>
          </Card>
            <div className="results-summary-column">
              <Card className="classification-card--large">
                <SectionTitle eyebrow="Identification" title="Textile Classification" />
                <div className="classification">
                  <ConfidenceRing value={94} />
                  <div className="classification-copy">
                    <span>Identified textile</span>
                    <strong>Pinilian — Binakol Kusikos</strong>
                    <div className="tag-row">
                      <span>Ilocano</span>
                      <span>Supplementary weft</span>
                    </div>
                  </div>
                </div>
                <div className="classification-note">
                  <Icon name="info" size={16} />
                  Strong agreement across motif geometry, warp density, and
                  rotational structure.
                </div>
              </Card>
              <div className="score-cards">
                <Card>
                  <SectionTitle eyebrow="Pattern model" title="System Confidence" />
              <div className="metric-primary">
                <div>
                  <span>Wallpaper group</span>
                  <strong>p4m</strong>
                </div>
                <div className="metric-score">
                  <strong>96.2%</strong>
                  <span>accuracy</span>
                </div>
              </div>
              <div className="progress-track">
                <div style={{ width: "96.2%" }} />
              </div>
              <div className="metric-pairs">
                <div>
                  <span>Lattice X</span>
                  <strong>84 px</strong>
                </div>
                <div>
                  <span>Lattice Y</span>
                  <strong>86 px</strong>
                </div>
                <div>
                  <span>Repeat variance</span>
                  <strong>± 1.8%</strong>
                </div>
              </div>
                </Card>
                <Card>
                  <SectionTitle eyebrow="Restoration integrity" title="Symmetry Fidelity" />
              <div className="fidelity-score">
                <strong>92.8</strong>
                <span>%</span>
                <div className="quality-label">
                  <Icon name="check" size={14} /> High fidelity
                </div>
              </div>
              <div className="fidelity-bars">
                <FidelityBar label="Rotation" score={96} />
                <FidelityBar label="Reflection" score={91} />
                <FidelityBar label="Translation" score={94} />
              </div>
                </Card>
              </div>
            </div>
          </div>
          <div className="results-detail-grid">
            <Card className="interpretation-card">
              <SectionTitle eyebrow="Cultural interpretation" title="Description & Origin" />
              <div className="interpretation-layout">
                <div>
                  <p className="body-copy">
                    A dense, handwoven field of concentric rotational motifs
                    built from stepped diamonds. The whirling form is associated
                    with protection and ancestral continuity.
                  </p>
                  <div className="detail-list">
                    <div>
                      <span>Primary motif</span>
                      <strong>Kusikos / whirlwind</strong>
                    </div>
                    <div>
                      <span>Dominant palette</span>
                      <strong>Indigo, rust, natural cotton</strong>
                    </div>
                  </div>
                </div>
                <div className="origin-row">
                  <img src={loomPhoto} alt="Artisan working at a traditional loom" />
                  <div>
                    <span className="eyebrow">Cultural origin</span>
                    <strong>Ilocos Region, Northern Luzon</strong>
                    <p>Handloom weaving traditions encode community memory through counted patterns.</p>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="audit-card--compact">
              <SectionTitle eyebrow="Explainability" title="Step-by-Step Audit" />
              <div className="audit-summary">
                <div>
                  <span className="summary-number">2</span>
                <div>
                  <strong>Irregularities detected</strong>
                  <span>Both are within a single repeat unit</span>
                </div>
              </div>
              <div>
                <span className="summary-number subtle">4.7%</span>
                <div>
                  <strong>Surface reconstructed</strong>
                  <span>Low-intervention restoration</span>
                </div>
              </div>
            </div>
            <div className="audit-steps">
              {[
                ["01", "Pattern normalization", "Perspective and tonal variance corrected"],
                ["02", "Lattice extraction", "84 × 86 px repeat unit established"],
                ["03", "Symmetry audit", "Two broken rotational correspondences found"],
                ["04", "Context-aware repair", "Missing weft geometry inferred and restored"],
              ].map(([number, title, description], index) => (
                <div className="audit-step" key={number}>
                  <span className={index === 3 ? "active" : ""}>{number}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{description}</p>
                  </div>
                  <Icon name="check" size={16} />
                </div>
              ))}
            </div>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}

function ResultFrame({
  label,
  title,
  children,
  className,
}: {
  label: string;
  title: string;
  children: ReactNode;
  className: string;
}) {
  return (
    <figure className={`result-frame ${className}`}>
      <div className="frame-image">{children}</div>
      <figcaption>
        <span>{label}</span>
        {title}
      </figcaption>
    </figure>
  );
}

function FidelityBar({ label, score }: { label: string; score: number }) {
  return (
    <div className="fidelity-bar">
      <div>
        <span>{label}</span>
        <strong>{score}%</strong>
      </div>
      <div className="progress-track small">
        <div style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

const referenceItems = [
  {
    name: "Inuritan",
    family: "Pinilian",
    image: textilePhoto,
    focus: "Ceremonial geometry",
    description:
      "Intricate supplementary-weft figures arranged in deliberate bands, traditionally reserved for heirloom garments and ritual cloth.",
  },
  {
    name: "Kusikos",
    family: "Pinilian",
    image: weavePhoto,
    focus: "Rotational symmetry",
    description:
      "A dynamic whirlwind motif formed through stepped diamonds, associated with protection and the deflection of harmful spirits.",
  },
  {
    name: "Sinan-Sabong",
    family: "Pinilian",
    image: fiberPhoto,
    focus: "Floral abstraction",
    description:
      "Flower-like forms translated into angular loom logic, balancing organic symbolism with strict bilateral structure.",
  },
  {
    name: "Binitbit",
    family: "Pinilian",
    image: loomPhoto,
    focus: "Figurative patterning",
    description:
      "Counted motifs built by manually selecting and lifting warp threads, showcasing the weaver’s technical precision.",
  },
  {
    name: "Kusikos",
    family: "Binakol",
    image: weavePhoto,
    focus: "Whirling square",
    description:
      "Nested squares create a vortex-like optical field whose visual motion traditionally served a protective purpose.",
  },
  {
    name: "Sinan-Pusod",
    family: "Binakol",
    image: textilePhoto,
    focus: "Radial geometry",
    description:
      "A navel-centered arrangement radiates outward in repeated units, expressing origin, continuity, and balance.",
  },
  {
    name: "Concha Concha",
    family: "Binakol",
    image: fiberPhoto,
    focus: "Shell tessellation",
    description:
      "Interlocking shell forms produce an undulating geometric field with alternating positive and negative space.",
  },
];

function ReferenceGuide() {
  const [filter, setFilter] = useState<"All" | "Pinilian" | "Binakol">("All");
  const filtered = referenceItems.filter(
    (item) => filter === "All" || item.family === filter,
  );

  return (
    <main className="page-shell guide-shell">
      <div className="guide-hero">
        <div className="hero-copy">
          <div className="eyebrow">Educational textile reference guide</div>
          <h1>A visual archive of pattern, place, and meaning.</h1>
          <p>
            Study the accepted Pinilian and Binakol subclasses used by
            PatternGuard. Each reference connects computational geometry with
            the living knowledge of Ilocano weaving.
          </p>
          <div className="guide-stats">
            <div>
              <strong>07</strong>
              <span>Reference subclasses</span>
            </div>
            <div>
              <strong>02</strong>
              <span>Textile families</span>
            </div>
            <div>
              <strong>p4m</strong>
              <span>Primary symmetry group</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src={loomPhoto} alt="Weaver working at a traditional wooden loom" />
          <div className="image-note">
            <span>Field note 01</span>
            <strong>Weaving knowledge is embodied knowledge.</strong>
          </div>
        </div>
      </div>

      <div className="guide-controls">
        <div>
          <span className="eyebrow">Browse archive</span>
          <h2>Accepted restoration textiles</h2>
        </div>
        <div className="filter-tabs">
          {(["All", "Pinilian", "Binakol"] as const).map((item) => (
            <button
              type="button"
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
              <span>
                {item === "All" ? "07" : item === "Pinilian" ? "04" : "03"}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="reference-grid">
        {filtered.map((item, index) => (
          <article className="reference-card" key={`${item.family}-${item.name}`}>
            <div className="reference-image">
              <img src={item.image} alt={`${item.name} textile reference`} />
              <div className="reference-index">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="family-label">{item.family}</div>
            </div>
            <div className="reference-content">
              <span>{item.focus}</span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <button type="button">
                Open reference <Icon name="chevron" size={15} />
              </button>
            </div>
          </article>
        ))}
      </div>

      <section className="learning-note">
        <div className="note-mark">“</div>
        <div>
          <span className="eyebrow">A note for learners</span>
          <h2>Patterns are records, not decoration.</h2>
          <p>
            Restoration begins with cultural literacy. Use geometric analysis
            to support—not replace—the knowledge of weavers, communities, and
            textile custodians.
          </p>
        </div>
        <Button tone="secondary">
          <Icon name="book" size={16} />
          View teaching notes
        </Button>
      </section>
    </main>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState<"dashboard" | "guide">(
    "dashboard",
  );

  return (
    <div className="app">
      <Header activeView={activeView} setActiveView={setActiveView} />
      {activeView === "dashboard" ? <Dashboard /> : <ReferenceGuide />}
      <footer>
        <span>PatternGuard · Academic restoration framework</span>
        <span>Built for culturally responsible textile study</span>
      </footer>
    </div>
  );
}
