import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Footer({ settings, contact }) {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const [firstCol, setFirstCol] = useState(null);
  const [secondCol, setSecondCol] = useState(null);
  const [thirdCol, setThirdCol] = useState(null);
  const [footerContent, setFooterContent] = useState(null);
  const [socialLink, setSocialLink] = useState(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (!footerContent)
      setFooterContent(websiteSetup?.payload?.footer);
  });
  useEffect(() => {
    if (!socialLink)
      setSocialLink(websiteSetup?.payload?.social_links);
  });
  useEffect(() => {
    if (!firstCol)
      setFirstCol(websiteSetup?.payload?.footer_first_col);
  });
  useEffect(() => {
    if (!secondCol)
      setSecondCol(websiteSetup?.payload?.footer_second_col);
  });
  useEffect(() => {
    if (!thirdCol)
      setThirdCol(websiteSetup?.payload?.footer_third_col);
  });

  const collections = [
    { title: "Saree & Lehenga", link: "/products?category=saree-lehenga" },
    { title: "Fancy Gowns", link: "/products?category=fancy-gowns" },
    { title: "Handloom", link: "/products?category=handloom" },
    { title: "Dupattas", link: "/products?category=dupattas" },
    { title: "Bedding", link: "/products?category=bedding" },
    { title: "Flash Sale", link: "/products?highlight=flash_sale" },
  ];

  const socialIcons = {
    instagram: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    facebook: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    youtube: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    whatsapp: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
  };

  return (
    <footer className="print:hidden" style={{ background: "#1A1208" }}>

      {/* ── Main Footer Body ── */}
      <div className="container-x mx-auto py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">

          {/* ── Col 1: Brand ── */}
          <div className="flex flex-col space-y-5">
            <div>
              <h2 className="text-2xl font-semibold tracking-widest text-gauri-gold-leaf" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                GAURI COLLECTION
              </h2>
              <p className="text-gauri-aged-brass text-sm italic mt-1">Premium Women's Ethnic Wear</p>
            </div>

            <p className="text-[13px] text-[#C8B89A]/70 leading-relaxed max-w-[260px]">
              Celebrating the art of Indian craftsmanship. Each piece is a labor of love, woven with tradition and worn with grace.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-4 pt-1">
              {socialLink && socialLink.length > 0
                ? socialLink.map((item, i) => (
                    <a
                      key={i}
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-full border border-gauri-aged-brass/30 flex items-center justify-center text-gauri-aged-brass hover:border-gauri-gold-leaf hover:text-gauri-gold-leaf transition-all duration-300"
                    >
                      <span className="text-[12px]">{item.icon?.slice(0, 2)?.toUpperCase() || "S"}</span>
                    </a>
                  ))
                : Object.entries(socialIcons).map(([key, icon]) => (
                    <a
                      key={key}
                      href="#"
                      className="w-9 h-9 rounded-full border border-gauri-aged-brass/30 flex items-center justify-center text-gauri-aged-brass hover:border-gauri-gold-leaf hover:text-gauri-gold-leaf transition-all duration-300"
                    >
                      {icon}
                    </a>
                  ))}
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-[9px] tracking-[0.2em] text-gauri-aged-brass uppercase font-semibold mb-3">
                Subscribe for Exclusive Offers
              </p>
              {subscribed ? (
                <p className="text-gauri-gold-leaf text-sm">✓ You're subscribed!</p>
              ) : (
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 bg-transparent border border-gauri-aged-brass/30 text-[#C8B89A] placeholder-[#C8B89A]/40 text-xs px-3 py-2.5 focus:outline-none focus:border-gauri-gold-leaf transition-colors"
                  />
                  <button
                    onClick={() => email && setSubscribed(true)}
                    className="bg-gauri-deep-gold hover:bg-gauri-aged-brass text-white text-[10px] font-semibold tracking-wider px-4 py-2.5 transition-colors whitespace-nowrap"
                  >
                    SUBSCRIBE
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── Col 2: Quick Links (dynamic from backend) ── */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] text-gauri-gold-leaf uppercase font-semibold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" passHref>
                  <a className="text-[13px] text-[#C8B89A]/70 hover:text-gauri-gold-leaf transition-colors">Home</a>
                </Link>
              </li>
              {firstCol?.col_links?.map((item, i) => (
                <li key={i}>
                  <Link href={item.link} passHref>
                    <a className="text-[13px] text-[#C8B89A]/70 hover:text-gauri-gold-leaf transition-colors">
                      {item.title}
                    </a>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" passHref>
                  <a className="text-[13px] text-[#C8B89A]/70 hover:text-gauri-gold-leaf transition-colors">Contact Us</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Col 3: Collections ── */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] text-gauri-gold-leaf uppercase font-semibold mb-6">
              Collections
            </h4>
            <ul className="space-y-3">
              {(secondCol?.col_links?.length > 0 ? secondCol.col_links : collections).map((item, i) => (
                <li key={i}>
                  <Link href={item.link || "#"} passHref>
                    <a className="text-[13px] text-[#C8B89A]/70 hover:text-gauri-gold-leaf transition-colors">
                      {item.title}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Contact Info ── */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] text-gauri-gold-leaf uppercase font-semibold mb-6">
              Contact Info
            </h4>
            <ul className="space-y-5">
              {contact?.address && (
                <li className="flex items-start space-x-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9A7040" strokeWidth="1.5" className="mt-0.5 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <div>
                    <p className="text-[9px] tracking-[0.15em] text-gauri-aged-brass uppercase font-semibold mb-0.5">Address</p>
                    <p className="text-[13px] text-[#C8B89A]/70 leading-relaxed">{contact.address}</p>
                  </div>
                </li>
              )}
              {contact?.phone && (
                <li className="flex items-start space-x-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9A7040" strokeWidth="1.5" className="mt-0.5 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <div>
                    <p className="text-[9px] tracking-[0.15em] text-gauri-aged-brass uppercase font-semibold mb-0.5">Phone</p>
                    <p className="text-[13px] text-[#C8B89A]/70">{contact.phone}</p>
                  </div>
                </li>
              )}
              {contact?.email && (
                <li className="flex items-start space-x-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9A7040" strokeWidth="1.5" className="mt-0.5 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <div>
                    <p className="text-[9px] tracking-[0.15em] text-gauri-aged-brass uppercase font-semibold mb-0.5">Email</p>
                    <p className="text-[13px] text-[#C8B89A]/70">{contact.email}</p>
                  </div>
                </li>
              )}
              <li className="flex items-start space-x-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9A7040" strokeWidth="1.5" className="mt-0.5 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-[9px] tracking-[0.15em] text-gauri-aged-brass uppercase font-semibold mb-0.5">Store Hours</p>
                  <p className="text-[13px] text-[#C8B89A]/70 leading-relaxed">
                    Mon – Sat 10am – 8pm<br />Sunday: 11am – 6pm
                  </p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t" style={{ borderColor: "rgba(154,112,64,0.2)" }}>
        <div className="container-x mx-auto py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[12px] text-[#C8B89A]/50">
            © {new Date().getFullYear()} Gauri Collection. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {[
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms & Conditions", href: "/terms-conditions" },
              { label: "Shipping Policy", href: "/shipping-policy" },
              { label: "Refund Policy", href: "/refund-policy" },
            ].map((link, i) => (
              <Link key={i} href={link.href} passHref>
                <a className="text-[11px] text-[#C8B89A]/50 hover:text-gauri-gold-leaf transition-colors">
                  {link.label}
                </a>
              </Link>
            ))}
          </div>

          <p className="text-[12px] text-[#C8B89A]/40 hidden md:block">
            Crafted with love in India 🇮🇳
          </p>
        </div>
      </div>

    </footer>
  );
}
