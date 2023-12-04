"use client";

import Dashboard from "../components/Dashboard";

export default function Home() {
  return (
    <main>
      <div className="flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none sticky top-0 inset-x-0 backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70 pt-[200px]">
        <div className="z-40 flex px-26 gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-[var(--navbar-height)] max-w-[1024px]">
          <Dashboard />
        </div>
      </div>
    </main>
  );
}
