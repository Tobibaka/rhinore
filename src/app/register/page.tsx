'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';

const roles = ['Overman', 'AdminA', 'AdminB', 'AdminC', 'Head'] as const;

type Role = (typeof roles)[number];

const initialForm = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  dob: '',
  address: '',
  city: '',
  country: '',
  phone: '',
  linkedin: '',
  bio: '',
};

export default function RegisterPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState(initialForm);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const allFieldsFilled = useMemo(
    () =>
      Object.values(formData).every((value) => value.trim().length > 0) &&
      selectedRole !== null &&
      formData.password === formData.confirmPassword &&
      agreeTerms,
    [formData, selectedRole, agreeTerms],
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!allFieldsFilled) return;

    router.push('/login');
  };

  return (
    <div className="min-h-screen py-10 bg-gray-600">
      <div className="mx-auto  flex min-h-screen max-w-6xl flex-col overflow-hidden rounded-3xl bg-slate-950/70 shadow-2xl ring-1 ring-slate-800/60 md:flex-row">
        <div className="relative hidden flex-1 md:block">
          
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/60 to-slate-900/90" />
          <div className="relative flex h-full flex-col justify-between p-10 text-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400 ring-1 ring-emerald-400/20">
                Intelligent IoT • Cloud • AI Analytics
              </div>
              <h1 className="mt-6 text-4xl font-bold leading-tight text-white">
                Join Rhinore&apos;s Intelligent Control Network
              </h1>
              <p className="mt-4 text-base text-slate-200/80">
                Seamlessly orchestrate underground operations, monitor sensor
                grids, and coordinate task forces with precision dashboards
                customized for each role.
              </p>
            </div>

            <div className="space-y-3 text-sm text-slate-200/80">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-300/70">
                  Already aligned?
                </p>
                <Link
                  href="/login"
                  className="mt-1 inline-flex items-center gap-2 rounded-full bg-emerald-500/90 px-4 py-1 font-semibold text-slate-900 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
                >
                  Access the control suite
                </Link>
              </div>
              <div className="text-xs text-slate-300/60">
                Rhinore © 2025 • Powered by Intelligent IoT, Cloud &amp; AI
                Analytics
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-slate-950/80 text-slate-100">
          <form
            onSubmit={handleSubmit}
            className="flex h-full flex-col gap-8 p-8 md:p-12"
          >
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Register your command profile
              </h2>
              <p className="mt-2 text-sm text-slate-300/80">
                Complete the dossier to activate your access. All fields are
                required for role assignment.
              </p>
            </div>

            <div className="grid gap-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300/60">
                Choose operational role
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {roles.map((role) => {
                  const active = selectedRole === role;
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition-all ${
                        active
                          ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-lg shadow-emerald-500/20'
                          : 'border-slate-700/80 bg-slate-900/60 text-slate-300 hover:border-slate-600 hover:bg-slate-900'
                      }`}
                    >
                      {role}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="col-span-full">
                <label className="text-xs font-medium uppercase tracking-wide text-slate-300/60">
                  Full Name
                </label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  placeholder="e.g. Priya Nair"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-slate-300/60">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  placeholder="name@rhinore.ai"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-slate-300/60">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  placeholder="Create secure password"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-slate-300/60">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  placeholder="Confirm password"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-slate-300/60">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-slate-300/60">
                  Phone
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-slate-300/60">
                  Address
                </label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  placeholder="Street / Sector"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-slate-300/60">
                  City
                </label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  placeholder="City"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-slate-300/60">
                  Country
                </label>
                <input
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  placeholder="Country"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-medium uppercase tracking-wide text-slate-300/60">
                  LinkedIn Profile
                </label>
                <input
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  placeholder="https://www.linkedin.com/in/username"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-medium uppercase tracking-wide text-slate-300/60">
                  Bio / Mission Brief
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  placeholder="Summarize your objectives, expertise, or current mission responsibilities..."
                />
              </div>
            </div>

            <label className="flex items-center gap-3 text-sm text-slate-300/80">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(event) => setAgreeTerms(event.target.checked)}
                className="h-4 w-4 rounded border-slate-700/80 bg-slate-900/80 text-emerald-500 focus:ring-emerald-400"
              />
              I confirm the above information is accurate for role assignment.
            </label>

            <button
              type="submit"
              disabled={!allFieldsFilled}
              className="w-full rounded-2xl bg-emerald-500/90 px-6 py-4 text-lg font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 transition-all hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none"
            >
              Sign-Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}