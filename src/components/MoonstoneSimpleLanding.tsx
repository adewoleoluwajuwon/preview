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
import { Search, MapPin, Briefcase } from "lucide-react";

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
          <div className="grid h-9 w-9 place-content-center rounded-md bg-gradient-to-br from-slate-600 to-slate-800 text-white">
            <Briefcase size={16} />
          </div>
          <span className="text-sm font-semibold">Company Logo</span>
        </NavbarBrand>
        <div className="flex items-center gap-2 md:order-2">
          {/* Link to the modern page you already have */}
          <Button href="/modern" color="indigo" className="hidden md:inline-flex">a modern approach</Button>
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
        <div className="mx-auto mt-10 rounded-xl bg-[url('https://images.unsplash.com/photo-1507209696998-3c532be9b2b1?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center shadow-md">
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
              <Badge key={c} color="indigo" className="bg-slate-700">
                {c}
              </Badge>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-gray-500">
          For the other pages on the landing page, follow the same structure and also, we are open to suggestions
        </p>
      </header>
    </div>
  );
}
