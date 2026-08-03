import React from "react";
import Link from "next/link";
import {
  Building2,
  Globe,
  Share2,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-white font-bold text-2xl tracking-tight"
            >
              <div className="p-2 bg-white/10 rounded-xl">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              RentNest
            </Link>
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              Find & list rental properties with ease. RentNest connects
              landlords and tenants seamlessly with verified listings and
              secure payments.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-white transition">
                  Browse Properties
                </Link>
              </li>


            </ul>
          </div>

          {/* Column 3: Property Categories */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">
              Categories
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>Apartments</li>
              <li>Family Houses</li>
              <li>Studio Flats</li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-zinc-300 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-zinc-300 shrink-0" />
                <span>support@rentnest.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-2 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-500 gap-4">
          <p>© 2026 RentNest. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-400 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-zinc-400 transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-zinc-400 transition">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}