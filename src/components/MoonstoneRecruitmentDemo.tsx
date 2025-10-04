/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import {
  Navbar,
  Button,
  TextInput,
  Select,
  Modal,
  Label,
  FileInput,
  Textarea,
  Card,
  Badge,
  Tooltip,
  Alert,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  NavbarLink,
  ListGroup,
  ListGroupItem,
  Footer,
} from "flowbite-react";
import { motion } from "framer-motion";
import {
  Search,
  Moon,
  Sun,
  Briefcase,
  MapPin,
  CalendarDays,
  FileText,
  Building2,
  Send,
  UserPlus,
  LogIn,
  ChevronRight,
  X,
} from "lucide-react";

// -----------------------------
// Types
// -----------------------------

type CategoryKey =
  | "Computing/IT"
  | "Banking/Finance"
  | "Engineering"
  | "Construction"
  | "Other";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  category: CategoryKey;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  salary?: string;
  postedDaysAgo: number;
};

// -----------------------------
// Sample data (mock)
// -----------------------------

const CATEGORIES: CategoryKey[] = [
  "Computing/IT",
  "Banking/Finance",
  "Engineering",
  "Construction",
  "Other",
];

const JOBS: Job[] = [
  {
    id: "1",
    title: "Frontend Engineer (React)",
    company: "Moonstone Recruitment Solutions",
    location: "Lagos, NG",
    category: "Computing/IT",
    type: "Full-time",
    salary: "₦800k–₦1.2m",
    postedDaysAgo: 2,
  },
  {
    id: "2",
    title: "DevOps Engineer",
    company: "Aurora Bank",
    location: "Remote",
    category: "Computing/IT",
    type: "Contract",
    salary: "₦1.5m/mo",
    postedDaysAgo: 6,
  },
  {
    id: "3",
    title: "Financial Analyst",
    company: "Harbor Finance",
    location: "Abuja, NG",
    category: "Banking/Finance",
    type: "Full-time",
    salary: "₦600k–₦900k",
    postedDaysAgo: 4,
  },
  {
    id: "4",
    title: "Civil Engineer (Roads)",
    company: "BuildRight Ltd",
    location: "Port Harcourt, NG",
    category: "Construction",
    type: "Full-time",
    postedDaysAgo: 1,
  },
  {
    id: "5",
    title: "Mechanical Design Engineer",
    company: "Vector Works",
    location: "Lagos, NG",
    category: "Engineering",
    type: "Full-time",
    postedDaysAgo: 9,
  },
];

// -----------------------------
// Utilities
// -----------------------------

const sectionVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

// Simple Tabs (Flowbite v1 has no Tabs.Item compound API)
function SimpleTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: number;
  onChange: (i: number) => void;
}) {
  return (
    <div>
      <div
        role="tablist"
        className="flex gap-2 rounded-xl bg-gray-100 p-1 dark:bg-gray-800"
      >
        {tabs.map((t, i) => (
          <button
            key={t}
            role="tab"
            aria-selected={active === i}
            onClick={() => onChange(i)}
            className={`rounded-lg px-3 py-1.5 text-sm transition ${
              active === i
                ? "bg-white shadow dark:bg-gray-900"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

// -----------------------------
// Main Component
// -----------------------------

export default function MoonStoneRecruitmentDemo() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem("moonstone.dark");
    return stored ? stored === "1" : true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("moonstone.dark", dark ? "1" : "0");
  }, [dark]);

  // Search state
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<"" | CategoryKey>("");

  const filteredJobs = useMemo(() => {
    return JOBS.filter((j) => {
      const matchQ = q
        ? (j.title + " " + j.company + " " + j.location)
            .toLowerCase()
            .includes(q.toLowerCase())
        : true;
      const matchCat = cat ? j.category === cat : true;
      return matchQ && matchCat;
    });
  }, [q, cat]);

  // Apply modal
  const [applyOpen, setApplyOpen] = useState(false);
  const [jobForApply, setJobForApply] = useState<Job | null>(null);

  const [applyForm, setApplyForm] = useState({
    name: "",
    email: "",
    cv: null as File | null,
    coverLetter: "",
  });

  const canSubmitApply = Boolean(
    applyForm.name && applyForm.email && applyForm.cv && jobForApply
  );

  function openApply(job: Job) {
    setJobForApply(job);
    setApplyOpen(true);
  }

  // Register section
  const [reg, setReg] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    sector: "" as "" | CategoryKey,
    cv: null as File | null,
    cover: null as File | null,
  });

  const canRegister = Boolean(
    reg.firstName &&
      reg.lastName &&
      reg.email &&
      reg.password &&
      reg.sector &&
      reg.cv
  );

  // Contact form
  const [contact, setContact] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const canContact = Boolean(
    contact.name && contact.email && contact.subject && contact.message
  );

  // Pages tabs
  const [pagesTab, setPagesTab] = useState<number>(0);
  const pagesLabels = ["News", "FAQ", "Blog", "Our Team"];

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* ---------------- Nav ---------------- */}
      <Navbar
        fluid
        rounded
        className="sticky top-0 z-40 border-b border-gray-200/60 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80"
      >
        <NavbarBrand href="#home" className="gap-2">
          <div className="grid h-9 w-9 place-content-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25">
            <Briefcase size={18} />
          </div>
          <span className="self-center whitespace-nowrap text-lg font-bold tracking-tight">
            Moonstone Recruitment
          </span>
        </NavbarBrand>
        <div className="flex items-center gap-3 md:order-2">
          <Tooltip content={dark ? "Switch to light" : "Switch to dark"}>
            <Button
              color="gray"
              pill
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </Tooltip>
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink href="#home" active>
            Home
          </NavbarLink>
          <NavbarLink href="#jobseeker">Job Seeker</NavbarLink>
          <NavbarLink href="#pages">Pages</NavbarLink>
          <NavbarLink href="#contact">Contact Us</NavbarLink>
          <NavbarLink href="#register">
            <div className="flex items-center gap-1">
              <UserPlus size={16} /> Register
            </div>
          </NavbarLink>
          <NavbarLink href="#login">
            <div className="flex items-center gap-1">
              <LogIn size={16} /> Login
            </div>
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>

      {/* ---------------- Hero / Search ---------------- */}
      <header id="home" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_60rem_at_top_right,rgba(99,102,241,0.06),transparent_60%)] dark:bg-[radial-gradient(60rem_60rem_at_top_right,rgba(99,102,241,0.12),transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-6xl px-4 pb-14 pt-10 md:pb-20 md:pt-16"
        >
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
                Find your next role with
                <span className="bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">
                  {" "}
                  Moonstone
                </span>
              </h1>
              <p className="mt-3 max-w-xl text-gray-600 dark:text-gray-300">
                Search thousands of curated opportunities across Computing/IT,
                Banking/Finance, Engineering, and Construction.
              </p>

              <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm shadow-indigo-500/5 dark:border-gray-800 dark:bg-gray-900">
                <div className="flex flex-col gap-3 md:flex-row">
                  <TextInput
                    icon={Search as any}
                    placeholder="Job title or keywords"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    color="gray"
                  />
                  <Select
                    value={cat}
                    onChange={(e) => setCat(e.target.value as any)}
                  >
                    <option value="">All categories</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Select>
                  <Button
                    className="whitespace-nowrap"
                    disabled={!q && !cat}
                    onClick={() => {
                      const el = document.getElementById("jobseeker");
                      el?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                  >
                    Search Jobs
                  </Button>
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Tip: Search is enabled when either field has input, as
                  specified.
                </p>
              </div>
            </div>

            <motion.div
              className="relative md:col-span-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
                  <CalendarDays size={16} /> Recently Added
                </div>
                <div className="mt-3 space-y-3">
                  {JOBS.slice(0, 3).map((j) => (
                    <div
                      key={j.id}
                      className="flex items-start justify-between gap-3"
                    >
                      <div>
                        <div className="font-medium">{j.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          <Building2 size={12} className="mr-1 inline" />{" "}
                          {j.company}
                          <span className="mx-1">•</span>
                          <MapPin size={12} className="mr-1 inline" />{" "}
                          {j.location}
                        </div>
                      </div>
                      <Badge color="indigo">{j.type}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </header>

      {/* ---------------- Job Seeker ---------------- */}
      <motion.section
        id="jobseeker"
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl gap-6 px-4 py-10 md:grid md:grid-cols-12"
      >
        {/* Short Links (Left) */}
        <aside className="md:col-span-3">
          <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Short Links
            </h3>
            <ListGroup>
              <ListGroupItem icon={FileText as any}>Upload CV</ListGroupItem>
              <ListGroupItem icon={Briefcase as any}>Search Jobs</ListGroupItem>
              <ListGroupItem icon={ChevronRight as any}>
                Jobs by Category
              </ListGroupItem>
              <ListGroupItem icon={ChevronRight as any}>
                Interview Tips
              </ListGroupItem>
              <ListGroupItem icon={ChevronRight as any}>
                Salary Guide
              </ListGroupItem>
            </ListGroup>
          </div>
        </aside>

        {/* Main content (Jobs + Categories) */}
        <div className="mt-6 md:col-span-9 md:mt-0">
          {/* Jobs by Category */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Jobs by Category</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {CATEGORIES.slice(0, 4).map((c) => (
                <Card
                  key={c}
                  className="cursor-pointer transition-transform hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-2">
                    <Badge color="indigo" className="shrink-0">
                      {c.split("/")[0]}
                    </Badge>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {c}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Jobs list */}
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Jobs</h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {filteredJobs.length} result
                {filteredJobs.length !== 1 ? "s" : ""}
              </div>
            </div>
            <div className="grid gap-4">
              {filteredJobs.map((j) => (
                <Card key={j.id}>
                  <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-base font-semibold">
                          {j.title}
                        </span>
                        <Badge color="gray">{j.category}</Badge>
                        <Badge color="indigo">{j.type}</Badge>
                      </div>
                      <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        <Building2 size={14} className="mr-1 inline" />{" "}
                        {j.company}
                        <span className="mx-1">•</span>
                        <MapPin size={14} className="mr-1 inline" />{" "}
                        {j.location}
                        <span className="mx-1">•</span>
                        <CalendarDays size={14} className="mr-1 inline" />{" "}
                        {j.postedDaysAgo}d ago
                        {j.salary && (
                          <>
                            <span className="mx-1">•</span>
                            <span>{j.salary}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button onClick={() => openApply(j)}>Apply</Button>
                      <Button color="light">Save</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ---------------- Pages (News, FAQ, Blog, Team) ---------------- */}
      <motion.section
        id="pages"
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl px-4 py-10"
      >
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-bold">Pages</h2>

          <SimpleTabs tabs={pagesLabels} active={pagesTab} onChange={setPagesTab} />

          <div className="mt-4">
            {pagesTab === 0 && (
              <div className="grid gap-4 md:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <div className="text-sm font-semibold">
                      Latest update {i}
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Short news excerpt for item {i}. Click through in a real
                      build.
                    </p>
                  </Card>
                ))}
              </div>
            )}

            {pagesTab === 1 && (
              <div className="space-y-3 text-sm">
                <Alert color="gray" rounded>
                  <span className="font-semibold">How do I apply?</span> — Find
                  a job, click <em>Apply</em>, upload your <b>CV</b>, and
                  submit.
                </Alert>
                <Alert color="gray" rounded>
                  <span className="font-semibold">Do I need a cover letter?</span>{" "}
                  — Optional, but recommended.
                </Alert>
              </div>
            )}

            {pagesTab === 2 && (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <Card key={i}>
                    <div className="text-sm font-semibold">Career tip #{i}</div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Write concise impact statements on your CV. Quantify
                      achievements.
                    </p>
                  </Card>
                ))}
              </div>
            )}

            {pagesTab === 3 && (
              <div className="grid gap-4 md:grid-cols-4">
                {["Ada", "Yusuf", "Chinwe", "Emeka"].map((n) => (
                  <Card key={n}>
                    <div className="h-20 w-20 rounded-full bg-indigo-500/10" />
                    <div className="mt-2 text-sm font-semibold">{n}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Recruitment Consultant
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* ---------------- Register ---------------- */}
      <motion.section
        id="register"
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl px-4 py-10"
      >
        <div className="grid gap-6 md:grid-cols-12">
          {/* Content block */}
          <div className="md:col-span-5">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h3 className="text-lg font-bold">Register as a Candidate</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Join Moonstone Recruitment Solutions. We focus on four verticals:
                <b> Computing/IT</b>, <b>Banking/Finance</b>, <b>Engineering</b>,
                and <b>Construction</b>. Upload your <b>CV</b> and (optionally)
                your cover letter.
              </p>
              <ul className="mt-3 list-disc pl-5 text-sm text-gray-600 dark:text-gray-300">
                <li>Personalized job recommendations</li>
                <li>Track applications and status updates</li>
                <li>One-click apply with saved CV</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="fn">First name *</Label>
                  <TextInput
                    id="fn"
                    value={reg.firstName}
                    onChange={(e) =>
                      setReg({ ...reg, firstName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="ln">Last name *</Label>
                  <TextInput
                    id="ln"
                    value={reg.lastName}
                    onChange={(e) =>
                      setReg({ ...reg, lastName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="em">Email *</Label>
                  <TextInput
                    id="em"
                    type="email"
                    value={reg.email}
                    onChange={(e) => setReg({ ...reg, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="pw">Password *</Label>
                  <TextInput
                    id="pw"
                    type="password"
                    value={reg.password}
                    onChange={(e) =>
                      setReg({ ...reg, password: e.target.value })
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="sector">Preferred sector (focus) *</Label>
                  <Select
                    id="sector"
                    value={reg.sector}
                    onChange={(e) =>
                      setReg({ ...reg, sector: e.target.value as any })
                    }
                  >
                    <option value="">Select a sector</option>
                    {CATEGORIES.slice(0, 4).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cv">CV (PDF or DOCX) *</Label>
                  <FileInput
                    id="cv"
                    onChange={(e) =>
                      setReg({ ...reg, cv: e.target.files?.[0] ?? null })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="cov">Cover Letter (optional)</Label>
                  <FileInput
                    id="cov"
                    onChange={(e) =>
                      setReg({ ...reg, cover: e.target.files?.[0] ?? null })
                    }
                  />
                </div>
              </div>
              <Button disabled={!canRegister} className="mt-4">
                Create Account
              </Button>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Submit is enabled only when required fields are valid.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ---------------- Login ---------------- */}
      <motion.section
        id="login"
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl px-4 py-10"
      >
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:w-2/3">
          <h3 className="text-lg font-bold">Login</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="lem">Email</Label>
              <TextInput id="lem" type="email" placeholder="you@example.com" />
            </div>
            <div>
              <Label htmlFor="lpw">Password</Label>
              <TextInput id="lpw" type="password" placeholder="••••••••" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Button>Sign In</Button>
            <a
              href="#register"
              className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Register as a candidate
            </a>
          </div>
        </div>
      </motion.section>

      {/* ---------------- Contact Us ---------------- */}
      <motion.section
        id="contact"
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl px-4 py-10"
      >
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h3 className="text-lg font-bold">Contact Us</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="cn">Name</Label>
              <TextInput
                id="cn"
                value={contact.name}
                onChange={(e) =>
                  setContact({ ...contact, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="ce">Email</Label>
              <TextInput
                id="ce"
                type="email"
                value={contact.email}
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="cs">Subject</Label>
              <TextInput
                id="cs"
                value={contact.subject}
                onChange={(e) =>
                  setContact({ ...contact, subject: e.target.value })
                }
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="cm">Message</Label>
              <Textarea
                id="cm"
                rows={5}
                value={contact.message}
                onChange={(e) =>
                  setContact({ ...contact, message: e.target.value })
                }
              />
            </div>
          </div>
          <Button className="mt-4" disabled={!canContact}>
            <Send size={16} className="mr-2" /> Send Message
          </Button>
        </div>
      </motion.section>

      {/* ---------------- Apply Modal ---------------- */}
      <Modal show={applyOpen} onClose={() => setApplyOpen(false)} size="xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4 dark:border-gray-800">
          <h4 className="text-lg font-semibold">
            Apply for {jobForApply?.title}
          </h4>
          <button
            aria-label="Close"
            className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setApplyOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="an">Full Name *</Label>
              <TextInput
                id="an"
                value={applyForm.name}
                onChange={(e) =>
                  setApplyForm({ ...applyForm, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="ae">Email *</Label>
              <TextInput
                id="ae"
                type="email"
                value={applyForm.email}
                onChange={(e) =>
                  setApplyForm({ ...applyForm, email: e.target.value })
                }
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="acv">CV (PDF or DOCX) *</Label>
              <FileInput
                id="acv"
                onChange={(e) =>
                  setApplyForm({
                    ...applyForm,
                    cv: e.target.files?.[0] ?? null,
                  })
                }
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="acl">Cover Letter (optional)</Label>
              <Textarea
                id="acl"
                rows={5}
                value={applyForm.coverLetter}
                onChange={(e) =>
                  setApplyForm({ ...applyForm, coverLetter: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t px-6 py-4 dark:border-gray-800">
          <Button
            disabled={!canSubmitApply}
            onClick={() => setApplyOpen(false)}
          >
            Submit Application
          </Button>
          <Button color="light" onClick={() => setApplyOpen(false)}>
            Cancel
          </Button>
        </div>
      </Modal>

      {/* ---------------- Footer ---------------- */}
      <Footer container className="mt-10 border-t border-gray-200 dark:border-gray-800">
        <div className="w-full text-center">
          <div className="w-full items-center justify-between sm:flex">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-content-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
                <Briefcase size={16} />
              </div>
              <span className="text-sm font-semibold">
                Moonstone Recruitment Solutions
              </span>
            </div>

            <div className="mt-3 flex flex-wrap justify-center gap-4 sm:mt-0">
              <a
                href="#pages"
                className="text-sm text-gray-600 hover:underline dark:text-gray-300"
              >
                News
              </a>
              <a
                href="#pages"
                className="text-sm text-gray-600 hover:underline dark:text-gray-300"
              >
                FAQ
              </a>
              <a
                href="#pages"
                className="text-sm text-gray-600 hover:underline dark:text-gray-300"
              >
                Blog
              </a>
              <a
                href="#pages"
                className="text-sm text-gray-600 hover:underline dark:text-gray-300"
              >
                Our Team
              </a>
            </div>
          </div>

          <div className="my-4 h-px w-full bg-gray-200 dark:bg-gray-800" />

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Moonstone Recruitment Solutions
            </span>
            <a
              href="#home"
              className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Back to top
            </a>
          </div>
        </div>
      </Footer>
    </div>
  );
}
