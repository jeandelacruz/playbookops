import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, ClipboardCheck, Copy, FileText, Filter, Github, KeyRound, Languages, LayoutList, Lightbulb, ListChecks, Monitor, Moon, Rows3, Search, ShieldCheck, Sun, Wrench } from "lucide-react";
import { adapterText, type AdapterKind } from "./playbook-adapters";
import { catalogStats, cloudValues, playbooks as playbookData, type Playbook } from "./playbook-data";
import { dictionaries, readStoredLocale, type Locale, writeStoredLocale } from "./i18n";

type FilterOption = { label: string; value: string };
type ToastNotice = { id: number; message: string };
type ThemeMode = "system" | "light" | "dark";
type DetailTab = "overview" | "inputs" | "evidence" | "contract" | "expected" | "prompt" | "scorecard";
type DensityMode = "comfortable" | "compact";

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort();
}

function includes(playbook: Playbook, query: string) {
  const text = [playbook.title, playbook.summary, playbook.domain, playbook.category, ...(playbook.services ?? []), ...(playbook.tags ?? [])].join(" ").toLowerCase();
  return text.includes(query.toLowerCase());
}

function token(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function Badge({ type, value }: { type: "domain" | "category" | "difficulty" | "risk" | "mode" | "status"; value: string }) {
  return <span className={`badge badge--${type} badge--${token(value)}`}>{value}</span>;
}

function ServicePills({ services, label, emptyLabel }: { services: string[]; label: string; emptyLabel: string }) {
  return (
    <div className="service-row" aria-label={label}>
      <span className="service-row__label">{label}</span>
      <div className="service-pills">
        {services.length === 0
          ? <span className="service-pill service-pill--empty">{emptyLabel}</span>
          : services.slice(0, 5).map((service) => (
            <span className={`service-pill service-pill--${token(service)}`} key={service}>{service}</span>
          ))}
      </div>
    </div>
  );
}

function SearchableSelect({
  value,
  options,
  placeholder = "All",
  searchPlaceholder = "Search...",
  clearLabel = "Clear filter",
  emptyLabel = "No options found",
  onChange
}: {
  value: string;
  options: FilterOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  clearLabel?: string;
  emptyLabel?: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase()));
  const selected = options.find((option) => option.value === value);

  return (
    <div className={`agent-select ${open ? "agent-select--open" : ""}`}>
      <button className="agent-select__control" type="button" onClick={() => setOpen((current) => !current)}>
        <span className={selected ? "agent-select__single-value" : "agent-select__placeholder"}>{selected?.label ?? placeholder}</span>
        {selected && (
          <button
            className="agent-select__clear"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onChange("");
              setSearch("");
            }}
            aria-label={clearLabel}
          >
            x
          </button>
        )}
        <span className="agent-select__indicator">v</span>
      </button>
      {open && (
        <div className="agent-select__menu">
          <div className="agent-select__search">
            <Search size={14} />
            <input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder={searchPlaceholder} />
          </div>
          <button
            className={`agent-select__option ${!value ? "agent-select__option--is-selected" : ""}`}
            type="button"
            onClick={() => {
              onChange("");
              setOpen(false);
              setSearch("");
            }}
          >
            {placeholder}
          </button>
          {filteredOptions.map((option) => (
            <button
              className={`agent-select__option ${option.value === value ? "agent-select__option--is-selected" : ""}`}
              type="button"
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
                setSearch("");
              }}
            >
              {option.label}
            </button>
          ))}
          {filteredOptions.length === 0 && <div className="agent-select__empty">{emptyLabel}</div>}
        </div>
      )}
    </div>
  );
}

function WhenToUse({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="when-panel">
      <h3>{title}</h3>
      <div className="when-list">
        {items.map((item) => (
          <div className="when-item" key={item}>
            <Lightbulb size={14} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ToolGrid({ title, tools }: { title: string; tools: string[] }) {
  return (
    <section className="tool-panel">
      <h3>{title}</h3>
      <div className="tool-grid">
        {tools.map((tool) => (
          <span className="tool-tile" key={tool}><Wrench size={14} /> {tool}</span>
        ))}
      </div>
    </section>
  );
}

function InputsPanel({ title, inputs }: { title: string; inputs: Playbook["input_variables"] }) {
  return (
    <section className="detail-card-section">
      <h3>{title}</h3>
      <div className="input-table">
        {inputs.map((input) => (
          <div className="input-row" key={input.name}>
            <div>
              <b>{input.name}</b>
              <span>{input.description}</span>
            </div>
            <em>{input.type}{input.required ? " / required" : " / optional"}</em>
          </div>
        ))}
      </div>
    </section>
  );
}

function PermissionPanel({ title, permissions }: { title: string; permissions: string[] }) {
  return (
    <section className="detail-card-section">
      <h3>{title}</h3>
      <div className="permission-grid">
        {permissions.map((permission) => (
          <span className="permission-pill" key={permission}><KeyRound size={13} /> {permission}</span>
        ))}
      </div>
    </section>
  );
}

function EvidencePanel({ title, policy }: { title: string; policy: Playbook["evidence_policy"] }) {
  return (
    <section className="detail-card-section">
      <h3>{title}</h3>
      <div className="evidence-grid">
        {Object.entries(policy).map(([key, value]) => (
          <div className="evidence-tile" key={key}>
            <span>{key.replace(/_/g, " ")}</span>
            <b>{String(value)}</b>
          </div>
        ))}
      </div>
    </section>
  );
}

function SafetyPanel({ title, rules }: { title: string; rules: string[] }) {
  return (
    <section className="detail-card-section">
      <h3>{title}</h3>
      <div className="safety-list">
        {rules.map((rule) => (
          <div className="safety-item" key={rule}><ShieldCheck size={15} /> <span>{rule}</span></div>
        ))}
      </div>
    </section>
  );
}

function ContractPanel({ title, sections }: { title: string; sections: string[] }) {
  return (
    <section className="detail-card-section">
      <h3>{title}</h3>
      <div className="contract-list">
        {sections.map((section, index) => (
          <div className="contract-item" key={section}>
            <i>{index + 1}</i>
            <span>{section.replace(/_/g, " ")}</span>
            <Check size={15} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ExpectedOutputPanel({
  title,
  styleLabel,
  sectionsLabel,
  qualityLabel,
  expectedOutput
}: {
  title: string;
  styleLabel: string;
  sectionsLabel: string;
  qualityLabel: string;
  expectedOutput: Playbook["expected_output"];
}) {
  return (
    <section className="detail-card-section expected-output-panel">
      <h3><ClipboardCheck size={15} /> {title}</h3>
      <div className="expected-style">
        <span>{styleLabel}</span>
        <b>{expectedOutput.style}</b>
      </div>
      <div className="expected-columns">
        <div>
          <h4><ListChecks size={14} /> {sectionsLabel}</h4>
          <div className="contract-list">
            {expectedOutput.sections.map((section, index) => (
              <div className="contract-item" key={section}>
                <i>{index + 1}</i>
                <span>{section}</span>
                <Check size={15} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4><ShieldCheck size={14} /> {qualityLabel}</h4>
          <div className="quality-list">
            {expectedOutput.quality_checks.map((check) => (
              <div className="quality-item" key={check}>
                <Check size={14} />
                <span>{check}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function promptWordCount(prompt: string) {
  return prompt.split(/\s+/).filter(Boolean).length;
}

function PromptPanel({ title, prompt, wordsLabel, badgeLabel }: { title: string; prompt: string; wordsLabel: string; badgeLabel: string }) {
  return (
    <section className="prompt-panel">
      <div className="prompt-header">
        <div className="prompt-header__title">
          <h3><FileText size={15} /> {title}</h3>
          <strong className="prompt-agent-badge">{badgeLabel}</strong>
        </div>
        <span>{promptWordCount(prompt)} {wordsLabel}</span>
      </div>
      <pre>{prompt}</pre>
    </section>
  );
}

function ScorecardPanel({ title, scorecard }: { title: string; scorecard: Record<string, number> }) {
  return (
    <section className="detail-card-section">
      <h3>{title}</h3>
      <div className="score-list">
        {Object.entries(scorecard).map(([key, value]) => (
          <div className="score-row" key={key}>
            <span>{key.replace(/_/g, " ")}</span>
            <div className="score-track"><i style={{ width: `${Math.min(Number(value), 5) * 20}%` }} /></div>
            <b>{String(value)}/5</b>
          </div>
        ))}
      </div>
    </section>
  );
}

function scoreTotal(playbook: Playbook) {
  return Object.values(playbook.evaluation.scorecard).reduce((total: number, value: any) => total + Number(value), 0);
}

export default function App() {
  const playbooks = playbookData;
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(playbooks.find((p) => p.id === "aws-lambda-cost-security-review") ?? playbooks[0]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [copyNotices, setCopyNotices] = useState<ToastNotice[]>([]);
  const [detailTab, setDetailTab] = useState<DetailTab>("overview");
  const [density, setDensity] = useState<DensityMode>("comfortable");
  const [copyMenuOpen, setCopyMenuOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>(() => readStoredLocale());
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const stored = window.localStorage.getItem("playbookops-theme");
    return stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
  });
  const t = dictionaries[locale];
  const detailRef = useRef<HTMLElement | null>(null);
  const copyMenuRef = useRef<HTMLDivElement | null>(null);
  const toastIdRef = useRef(0);
  const options = useMemo(() => ({
    tool: unique(playbooks.flatMap((p) => p.tools)),
    domain: unique(playbooks.map((p) => p.domain)),
    category: unique(playbooks.map((p) => p.category)),
    difficulty: unique(playbooks.map((p) => p.difficulty)),
    risk_level: unique(playbooks.map((p) => p.risk_level)),
    execution_mode: unique(playbooks.map((p) => p.execution_mode)),
    cloud: unique(playbooks.flatMap(cloudValues)),
    status: unique(playbooks.map((p) => p.status))
  }), [playbooks]);
  const filtered = playbooks.filter((p) => {
    if (query && !includes(p, query)) return false;
    for (const [key, value] of Object.entries(filters)) {
      if (!value) continue;
      if (key === "tool" && !p.tools.includes(value)) return false;
      if (key === "cloud" && !cloudValues(p).includes(value)) return false;
      if (!["tool", "cloud"].includes(key) && String((p as any)[key]) !== value) return false;
    }
    return true;
  });
  const stats = [
    [t.stats.playbooks, catalogStats.totalPlaybooks],
    [t.stats.categories, catalogStats.categories],
    [t.stats.agents, catalogStats.agents],
    [t.stats.validated, catalogStats.validated]
  ];
  const filterLabels: Record<string, string> = {
    tool: t.filters.labels.tool,
    domain: t.filters.labels.domain,
    category: t.filters.labels.category,
    difficulty: t.filters.labels.difficulty,
    risk_level: t.filters.labels.risk_level,
    execution_mode: t.filters.labels.execution_mode,
    cloud: t.filters.labels.cloud,
    status: t.filters.labels.status
  };
  const activeFilters = Object.entries(filters).filter(([, value]) => Boolean(value));
  const detailTabs: Array<{ id: DetailTab; label: string }> = [
    { id: "overview", label: t.detail.tabs.overview },
    { id: "prompt", label: t.detail.tabs.prompt },
    { id: "expected", label: t.detail.tabs.expected },
    { id: "inputs", label: t.detail.tabs.inputs },
    { id: "evidence", label: t.detail.tabs.evidence },
    { id: "contract", label: t.detail.tabs.contract },
    { id: "scorecard", label: t.detail.tabs.scorecard }
  ];
  const copyAdapters: Array<{ kind: AdapterKind; label: string }> = [
    { kind: "AGENTS.md", label: t.detail.copyKinds.agents },
    { kind: "CLAUDE.md", label: t.detail.copyKinds.claude },
    { kind: "Kiro Steering", label: t.detail.copyKinds.kiroSteering },
    { kind: "Kiro Spec", label: t.detail.copyKinds.kiroSpec },
    { kind: "Cursor Rule", label: t.detail.copyKinds.cursor },
    { kind: "Windsurf Rule", label: t.detail.copyKinds.windsurf },
    { kind: "Copilot", label: t.detail.copyKinds.copilot }
  ];

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      const resolved = themeMode === "system" ? (media.matches ? "dark" : "light") : themeMode;
      document.documentElement.dataset.theme = resolved;
      document.documentElement.dataset.themeMode = themeMode;
    };
    applyTheme();
    window.localStorage.setItem("playbookops-theme", themeMode);
    media.addEventListener("change", applyTheme);
    return () => media.removeEventListener("change", applyTheme);
  }, [themeMode]);

  useEffect(() => {
    writeStoredLocale(locale);
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    if (!copyMenuOpen) return;

    function closeMenu(event: MouseEvent | TouchEvent) {
      if (!copyMenuRef.current?.contains(event.target as Node)) {
        setCopyMenuOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setCopyMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", closeMenu);
    document.addEventListener("touchstart", closeMenu);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeMenu);
      document.removeEventListener("touchstart", closeMenu);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [copyMenuOpen]);

  function setFilter(key: string, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function removeFilter(key: string) {
    setFilters((current) => ({ ...current, [key]: "" }));
  }

  function resetCatalogView() {
    setFilters({});
    setQuery("");
  }

  async function copy(text: string, label: string) {
    await navigator.clipboard.writeText(text);
    const id = toastIdRef.current + 1;
    toastIdRef.current = id;
    setCopyNotices((current) => [...current, { id, message: `${label} ${t.copy.copied}` }]);
    window.setTimeout(() => {
      setCopyNotices((current) => current.filter((notice) => notice.id !== id));
    }, 2200);
  }

  function selectPlaybook(playbook: Playbook) {
    setSelected(playbook);
    setDetailTab("overview");
    setCopyMenuOpen(false);
    requestAnimationFrame(() => {
      if (!detailRef.current) return;
      detailRef.current.scrollTop = 0;
      if (window.matchMedia("(max-width: 1180px)").matches) {
        detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  return (
    <main>
      {isLoading && (
        <div className="app-loader" role="status" aria-live="polite" aria-label={t.loader.label}>
          <div className="app-loader__panel">
            <div className="app-loader__mark"><ShieldCheck size={24} /></div>
            <div>
              <strong>PlaybookOps</strong>
              <span>{t.loader.text}</span>
            </div>
            <div className="app-loader__bar"><span /></div>
          </div>
        </div>
      )}
      <div className="copy-toast-stack" aria-live="polite">
        {copyNotices.map((notice) => (
          <div className="copy-toast" role="status" key={notice.id}><Check size={16} /> {notice.message}</div>
        ))}
      </div>
      <header className="topbar">
        <div className="brand"><ShieldCheck size={24} /> PlaybookOps</div>
        <nav>
          <a href="#catalog">{t.nav.catalog}</a><a href="#community">{t.nav.community}</a><a href="#roadmap">{t.nav.roadmap}</a>
          <div className="language-switch" aria-label={t.language.label}>
            <Languages size={14} />
            <button className={locale === "en" ? "active" : ""} onClick={() => setLocale("en")} type="button" title={t.language.en}>EN</button>
            <button className={locale === "es" ? "active" : ""} onClick={() => setLocale("es")} type="button" title={t.language.es}>ES</button>
          </div>
          <div className="theme-switch" aria-label={t.theme.label}>
            <button className={themeMode === "system" ? "active" : ""} onClick={() => setThemeMode("system")} type="button" title={t.theme.system}><Monitor size={14} /></button>
            <button className={themeMode === "light" ? "active" : ""} onClick={() => setThemeMode("light")} type="button" title={t.theme.light}><Sun size={14} /></button>
            <button className={themeMode === "dark" ? "active" : ""} onClick={() => setThemeMode("dark")} type="button" title={t.theme.dark}><Moon size={14} /></button>
          </div>
        </nav>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>{t.hero.title}</h1>
          <p className="lede">{t.hero.body}</p>
          <div className="hero-actions"><a href="#catalog">{t.hero.explore}</a><a className="secondary" href="#community">{t.hero.contribute}</a></div>
        </div>
        <div className="hero-panel">
          <div className="searchbox"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.hero.search} /></div>
          <div className="stat-grid">{stats.map(([label, value]) => <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
        </div>
      </section>

      <section id="catalog" className="catalog">
        <aside className="filters">
          <div className="panel-heading">
            <h2><Filter size={18} /> {t.filters.title}</h2>
            <span>{activeFilters.length} {t.filters.active}</span>
          </div>
          {Object.entries(options).map(([key, vals]) => (
            <label key={key}>
              <span>{filterLabels[key] ?? key.replace("_", " ")}</span>
              <SearchableSelect
                placeholder={t.filters.all}
                searchPlaceholder={t.filters.search}
                clearLabel={t.filters.clear}
                emptyLabel={t.filters.empty}
                value={filters[key] ?? ""}
                options={vals.map((value) => ({ label: value, value }))}
                onChange={(value) => setFilter(key, value)}
              />
            </label>
          ))}
        </aside>
        <div className="results">
          <div className="section-title">
            <div>
              <p className="section-kicker">{t.catalog.kicker}</p>
              <h2>{filtered.length} {filtered.length === 1 ? t.catalog.singular : t.catalog.plural}</h2>
              <p className="section-helper">{activeFilters.length === 0 ? t.catalog.helperDefault : `${activeFilters.length} ${activeFilters.length === 1 ? t.catalog.helperFilteredOne : t.catalog.helperFiltered}`}</p>
            </div>
            <div className="result-toolbar">
              <div className="density-switch" aria-label={t.catalog.densityLabel}>
                <button className={density === "comfortable" ? "active" : ""} onClick={() => setDensity("comfortable")} type="button" title={t.catalog.comfortable}><Rows3 size={14} /></button>
                <button className={density === "compact" ? "active" : ""} onClick={() => setDensity("compact")} type="button" title={t.catalog.compact}><LayoutList size={14} /></button>
              </div>
              <button onClick={resetCatalogView}>{t.catalog.resetFilters}</button>
            </div>
          </div>
          <div className="active-filter-bar">
            {activeFilters.length === 0 && <span className="filter-empty">{t.catalog.noFilters}</span>}
            {activeFilters.map(([key, value]) => (
              <button className="filter-chip" key={key} onClick={() => removeFilter(key)}>
                <span>{filterLabels[key] ?? key}</span>
                <b>{value}</b>
                <i>x</i>
              </button>
            ))}
          </div>
          <div className={`cards cards--${density} ${filtered.length <= 2 ? "cards--few" : ""}`}>
            {filtered.length === 0 && (
              <div className="empty">
                <div className="empty-icon"><Search size={20} /></div>
                <h3>{t.catalog.emptyTitle}</h3>
                <p>{t.catalog.emptyBody}</p>
                <button type="button" onClick={resetCatalogView}>{t.catalog.resetCatalog}</button>
              </div>
            )}
            {filtered.map((p) => (
              <button className={`card ${selected.id === p.id ? "active" : ""}`} key={p.id} onClick={() => selectPlaybook(p)}>
                <div className="card-head">
                  <div>
                    <p className="card-kicker">{p.domain} / {p.category}</p>
                    <h3>{p.title}</h3>
                  </div>
                  <Badge type="status" value={p.status} />
                </div>
                <p>{p.summary}</p>
                <div className="badge-row">
                  <Badge type="domain" value={p.domain} />
                  <Badge type="category" value={p.category} />
                  <Badge type="difficulty" value={p.difficulty} />
                  <Badge type="risk" value={p.risk_level} />
                  <Badge type="mode" value={p.execution_mode} />
                </div>
                <ServicePills services={p.services} label={t.card.services} emptyLabel={t.card.noServices} />
              </button>
            ))}
          </div>
        </div>
        <article className="detail" ref={detailRef}>
          <div className="detail-head">
            <div className="detail-summary">
              <Badge type="domain" value={selected.domain} />
              <Badge type="risk" value={selected.risk_level} />
              <Badge type="mode" value={selected.execution_mode} />
              <Badge type="difficulty" value={selected.difficulty} />
              <span className="detail-score">{selected.evaluation.maturity_level} - {scoreTotal(selected)}/40</span>
            </div>
            <h2>{selected.title}</h2>
            <p>{selected.description}</p>
            <ServicePills services={selected.services} label={t.card.services} emptyLabel={t.card.noServices} />
            <div className="prompt-ready-bar">
              <div className="prompt-ready-copy">
                <span><ClipboardCheck size={14} /> {t.detail.execution.ready}</span>
                <b>{promptWordCount(selected.prompt)} {t.detail.words}</b>
              </div>
              <div className="detail-actions">
                <button className="detail-action-primary" onClick={() => setDetailTab("prompt")} type="button"><FileText size={16} /> {t.detail.execution.viewPrompt}</button>
                <button className="detail-action-secondary" onClick={() => copy(selected.prompt, t.detail.sections.prompt)} type="button"><Copy size={16} /> {t.detail.copyPrompt}</button>
                <div className="copy-menu" ref={copyMenuRef}>
                  <button className="copy-menu-trigger" onClick={() => setCopyMenuOpen((open) => !open)} type="button" aria-expanded={copyMenuOpen} aria-haspopup="menu">
                    {t.detail.copyAs} <ChevronDown size={14} />
                  </button>
                  {copyMenuOpen && (
                    <div className="copy-menu-list" role="menu">
                      {copyAdapters.map(({ kind, label }) => (
                        <button
                          key={kind}
                          onClick={() => {
                            copy(adapterText[kind](selected), label);
                            setCopyMenuOpen(false);
                          }}
                          type="button"
                          role="menuitem"
                        >
                          <Copy size={14} /> {label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="detail-tabs" role="tablist" aria-label={t.detail.tabsLabel}>
            {detailTabs.map((tab) => (
              <button className={detailTab === tab.id ? "active" : ""} key={tab.id} onClick={() => setDetailTab(tab.id)} type="button">{tab.label}</button>
            ))}
          </div>
          <div className="detail-tab-panel">
            {detailTab === "overview" && (
              <>
                <WhenToUse title={t.detail.sections.when} items={selected.when_to_use ?? []} />
                <ToolGrid title={t.detail.sections.tools} tools={selected.tools} />
              </>
            )}
            {detailTab === "inputs" && (
              <>
                <InputsPanel title={t.detail.sections.inputVariables} inputs={selected.input_variables} />
                <PermissionPanel title={t.detail.sections.permissions} permissions={selected.requires_permissions} />
              </>
            )}
            {detailTab === "evidence" && (
              <>
                <EvidencePanel title={t.detail.sections.evidencePolicy} policy={selected.evidence_policy} />
                <SafetyPanel title={t.detail.sections.safetyRules} rules={selected.safety_rules} />
              </>
            )}
            {detailTab === "contract" && <ContractPanel title={t.detail.sections.outputContract} sections={selected.output_contract.sections} />}
            {detailTab === "expected" && (
              <ExpectedOutputPanel
                title={t.detail.sections.expectedOutput}
                styleLabel={t.detail.expected.style}
                sectionsLabel={t.detail.expected.sections}
                qualityLabel={t.detail.expected.quality}
                expectedOutput={selected.expected_output}
              />
            )}
            {detailTab === "prompt" && <PromptPanel title={t.detail.sections.prompt} prompt={selected.prompt} wordsLabel={t.detail.words} badgeLabel={t.detail.execution.structured} />}
            {detailTab === "scorecard" && <ScorecardPanel title={t.detail.sections.scorecard} scorecard={selected.evaluation.scorecard} />}
          </div>
        </article>
      </section>

      <section id="community" className="band">
        <h2>{t.community.title}</h2>
        <div className="columns"><p>{t.community.first}</p><p>{t.community.second}</p><p>{t.community.third}</p></div>
      </section>

      <section id="roadmap" className="band roadmap">
        <h2>{t.roadmap.title}</h2>
        {t.roadmap.items.map((item, index) => <div key={item}><b>{index + 1}</b><span>{item}</span></div>)}
      </section>

      <footer>
        <span><Github size={18} /> {t.footer.text}</span>
        <div className="footer-credit">
          <span className="footer-credit__text">{t.footer.credit}</span>
          <a className="footer-credit__link" href="https://www.linkedin.com/in/jeancarlosdelacruz/" target="_blank" rel="noreferrer" aria-label={t.footer.linkedin}>
            <span className="linkedin-mark" aria-hidden="true">in</span>
          </a>
        </div>
      </footer>
    </main>
  );
}
