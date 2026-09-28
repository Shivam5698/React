function EmptyState({ title, description, children }) {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-(--border) bg-(--surface) px-6 py-10 text-center shadow-sm sm:px-10" aria-live="polite">
      <div className="mb-4 grid size-12 place-items-center rounded-2xl bg-indigo-500/10 text-(--primary)">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-(--text-h)">{title}</h2>
      {description && <p className="mt-2 text-sm text-(--text-muted)">{description}</p>}
      {children && <div className="mt-5">{children}</div>}
    </section>
  )
}

export default EmptyState
