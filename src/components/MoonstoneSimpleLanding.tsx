/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  NavbarLink,
  Button,
  TextInput,
  Badge,
} from "flowbite-react";
import { Search, MapPin} from "lucide-react";
import { Link } from "react-router-dom";
export default function MoonstoneSimpleLanding() {
  // simple light theme (no dark mode to keep it close to the wireframe)
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const canSearch = Boolean(title || location);

  const categories = ["Computer/IT", "Banking/Finance", "Engineering", "Construction"];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top Nav */}
      <Navbar
        fluid
        rounded
        className="border-b border-gray-200 bg-white/90 backdrop-blur">
        <NavbarBrand href="#home" className="gap-2">
          <div className="grid h-9 w-9 place-content-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25">
  <img
    src="https://api.iconify.design/mdi:diamond-stone.svg?color=white"
    alt="Moonstone logo"
    className="h-5 w-5"
  />
</div>

          <span className="text-2xl text-blue-300 font-semibold">Company Logo</span>
        </NavbarBrand>
        <div className="flex items-center gap-2 md:order-2">
          {/* Link to the modern page you already have */}
          <Link to="/modern" className="hidden md:inline-flex bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              A Modern Approach
          </Link>
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink href="#home" active>
            Home
          </NavbarLink>
          <NavbarLink href="#jobseeker">Job Seeker</NavbarLink>
          <NavbarLink href="#register">Register</NavbarLink>
          <NavbarLink href="#pages">Pages</NavbarLink>
          <NavbarLink href="#login">Login</NavbarLink>
          <NavbarLink href="#contact">Contact Us</NavbarLink>
          {/* Mobile: show the modern link inline */}
          <NavbarLink href="/modern" className="md:hidden text-indigo-600">a modern approach</NavbarLink>
        </NavbarCollapse>
      </Navbar>

      {/* Hero card */}
      <header id="home" className="relative mx-auto max-w-5xl px-4">
        <div className="mx-auto mt-10 rounded-xl bg-blue-950 bg-cover bg-center shadow-md">
          <div className="rounded-xl bg-slate-900/70 p-6 sm:p-8">
            <h1 className="text-center text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              Simplest Pathway To
              <br />
              Grab Your New Job
            </h1>
            <p className="mt-2 text-center text-sm text-slate-200">
              Design the ideal site for Employers and Jobseekers within seconds.
            </p>

            <div className="mx-auto mt-4 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
              <TextInput
                icon={Search as any}
                placeholder="Job Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextInput
                icon={MapPin as any}
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-5 flex max-w-5xl justify-center">
          <Button
            disabled={!canSearch}
            className="w-48 bg-slate-400/70 hover:bg-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Search
          </Button>
        </div>

        {/* Browse row */}
        <div className="mx-auto mt-5 max-w-3xl rounded-md bg-slate-800/80 px-4 py-3 text-slate-100 shadow">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="font-semibold">Browse Jobs:</span>
            {categories.map((c) => (
              <Badge key={c} color="indigo" className="">
                {c}
              </Badge>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-gray-500">
          For the other pages on the landing page, we are to follow the same structure. For suggestions, click the modern approach button.
        </p>
      </header>
    </div>
  );
}
