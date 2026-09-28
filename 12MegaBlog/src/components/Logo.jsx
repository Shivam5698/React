function Logo({ width = '100px' }) {
  return (
    <div style={{ width }} className="inline-flex items-center gap-2.5 text-left text-slate-950 dark:text-white">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-500/20">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m14.5 6.5 3 3M4 20l4.2-.8L19 8.4a2.1 2.1 0 0 0-3-3L5.2 16.2 4 20Z" />
          <path d="M13 7.8 16.2 11" />
        </svg>
      </span>
      <span className="whitespace-nowrap text-lg font-bold tracking-tight">MegaBlog</span>
    </div>
  );
}

export default Logo;