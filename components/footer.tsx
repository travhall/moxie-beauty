import Button from "./button";
import ThemeSwitch from "./theme-toggle";
import Link from "next/link";
import Logo from "./logo";

const Facebook = (props: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = (props: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="flex flex-col gap-8 pb-28 px-6 md:pb-4">
      <div className="md:p-4">
        <Logo placement="footer" className="mb-4" />
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-between gap-8">
        <div className="flex flex-col-reverse md:flex-row md:flex-wrap gap-4">
          <small className="text-base md:text-xs p-1">
            &copy;{currentYear} Moxie Beauty Studio, all rights reserved
          </small>
          <Link
            className="text-base md:text-xs p-1 font-semibold no-underline text-nowrap before:absolute before:-bottom-0.5 before:left-0 before:w-full before:h-0.5 before:bg-(--accent) before:transform before:scale-x-0 before:origin-right before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100 hover:before:origin-left relative self-start"
            href="/"
          >
            Appointment Policy
          </Link>
          <Link
            className="text-base md:text-xs p-1 font-semibold no-underline text-nowrap before:absolute before:-bottom-0.5 before:left-0 before:w-full before:h-0.5 before:bg-(--accent) before:transform before:scale-x-0 before:origin-right before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100 hover:before:origin-left relative self-start"
            href="/"
          >
            Terms &amp; Conditions
          </Link>
          <Link
            className="text-base md:text-xs p-1 font-semibold no-underline text-nowrap before:absolute before:-bottom-0.5 before:left-0 before:w-full before:h-0.5 before:bg-(--accent) before:transform before:scale-x-0 before:origin-right before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100 hover:before:origin-left relative self-start"
            href="/"
          >
            FAQs
          </Link>
          <Link
            className="text-base md:text-xs p-1 font-semibold no-underline text-nowrap before:absolute before:-bottom-0.5 before:left-0 before:w-full before:h-0.5 before:bg-(--accent) before:transform before:scale-x-0 before:origin-right before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100 hover:before:origin-left relative self-start"
            href="mailto:hello@moxiebeautystudiowi.com"
          >
            hello@moxiebeautystudiowi.com
          </Link>
          <Link
            className="text-base md:text-xs p-1 font-semibold no-underline text-nowrap before:absolute before:-bottom-0.5 before:left-0 before:w-full before:h-0.5 before:bg-(--accent) before:transform before:scale-x-0 before:origin-right before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100 hover:before:origin-left relative self-start"
            href="tel:+12623326072"
          >
            (262) 332-6072
          </Link>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Button
            variant="default"
            size="sm"
            icon={Facebook}
            iconOnly
            aria-label="Visit us on Facebook"
          />
          <Button
            variant="default"
            size="sm"
            icon={Instagram}
            iconOnly
            aria-label="Follow us on Instagram"
          />
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  );
}
