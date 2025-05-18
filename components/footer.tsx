import Button from "./button";
import ThemeSwitch from "./theme-toggle";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import Logo from "./logo";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="flex flex-col gap-8 pb-28 p-6 md:pb-4">
      <div className="md:p-4">
        <Logo placement="footer" className="mb-12" />
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-between gap-8">
        <div className="flex flex-col-reverse md:flex-row md:flex-wrap gap-4">
          <small className="text-base md:text-xs">
            &copy;{currentYear} Moxie Beauty Studio, all rights reserved
          </small>
          <Link className="md:text-xs hover:underline self-start" href="/">
            Appointment Policy
          </Link>
          <Link className="md:text-xs hover:underline self-start" href="/">
            Terms &amp; Conditions
          </Link>
          <Link className="md:text-xs hover:underline self-start" href="/">
            FAQs
          </Link>
          <Link
            className="md:text-xs hover:underline self-start"
            href="mailto:hello@moxiebeautystudiowi.com"
          >
            hello@moxiebeautystudiowi.com
          </Link>
          <Link
            className="md:text-xs hover:underline self-start"
            href="tel:(262) 332-6072"
          >
            (262) 332-6072
          </Link>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Button
            variant="default"
            size="sm"
            icon={Facebook}
            iconOnly
            aria-label="Menu"
          />
          <Button
            variant="default"
            size="sm"
            icon={Instagram}
            iconOnly
            aria-label="Menu"
          />
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  );
}
