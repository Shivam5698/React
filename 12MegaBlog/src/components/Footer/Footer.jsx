import { Link } from 'react-router-dom'
import Logo from '../Logo';

function Footer() {
  return (
    <footer className="defer-render relative mt-auto border-t border-(--border) bg-(--surface) py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-4 inline-flex items-center">
              <Logo width="auto" />
            </div>
            <p className="max-w-xs text-sm text-(--text-muted)">
              A thoughtful space for ideas, stories, and perspectives worth sharing.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-(--text-h)">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link className="rounded-sm text-sm text-(--text-muted) hover:text-(--primary) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50" to="/">
                  Features
                </Link>
              </li>
              <li>
                <Link className="rounded-sm text-sm text-(--text-muted) hover:text-(--primary) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50" to="/">
                  Pricing
                </Link>
              </li>
              <li>
                <Link className="rounded-sm text-sm text-(--text-muted) hover:text-(--primary) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50" to="/">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link className="rounded-sm text-sm text-(--text-muted) hover:text-(--primary) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50" to="/">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-(--text-h)">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link className="rounded-sm text-sm text-(--text-muted) hover:text-(--primary) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50" to="/">
                  Account
                </Link>
              </li>
              <li>
                <Link className="rounded-sm text-sm text-(--text-muted) hover:text-(--primary) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50" to="/">
                  Help
                </Link>
              </li>
              <li>
                <Link className="rounded-sm text-sm text-(--text-muted) hover:text-(--primary) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50" to="/">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="rounded-sm text-sm text-(--text-muted) hover:text-(--primary) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50" to="/">
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-(--text-h)">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link className="rounded-sm text-sm text-(--text-muted) hover:text-(--primary) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50" to="/">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link className="rounded-sm text-sm text-(--text-muted) hover:text-(--primary) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50" to="/">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="rounded-sm text-sm text-(--text-muted) hover:text-(--primary) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50" to="/">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>

        </div>
        <div className="mt-10 border-t border-(--border) pt-5">
          <p className="text-xs text-(--text-muted)">
            &copy; {new Date().getFullYear()} MegaBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer