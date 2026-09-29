// Site-wide constants used by the layout, nav, footer and pages.
// Change contact details or social links here — every page picks them up automatically.
export const SITE_URL = "https://topegideon.vercel.app";
export const EMAIL = "topeoyenpemi@gmail.com";
export const UPWORK_URL = "https://www.upwork.com/freelancers/~01ac39886cec06e248?viewMode=1";
export const LINKEDIN_URL = "https://www.linkedin.com/in/tope-oyenpemi-2a3470245";
export const GITHUB_URL = "https://github.com/Giddytwg";
export const X_URL = "https://x.com/tg_webflow";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const FOOTER_LINKS = [...NAV_LINKS, { href: "/privacy", label: "Privacy" }];
