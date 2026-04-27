import Link from "next/link";
import SimpleSlider from "../Helpers/SliderCom";
import { useRef, useEffect, useState } from "react";

export default function Banner({ className, sliders = [] }) {
  const sliderRef = useRef(null);
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: false,
    dots: true,
  };

  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: `${8 + Math.random() * 32}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 2}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 3 + 4}s`,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div
      className={`w-full relative overflow-hidden bg-gauri-warm-cream ${className || ""}`}
      style={{ height: "700px" }}
    >
      {/* Floating gold-dust particles — left zone only */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {particles.map((p) => (
          <div
            key={p.id}
            className="gauri-particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      <div className="w-full h-full relative z-10 hero-slider-wrapper">
        <SimpleSlider settings={settings} selector={sliderRef}>
          {sliders.length > 0 &&
            sliders.map((item, i) => (
              <div key={i} className="item w-full" style={{ height: "700px" }}>
                <div className="w-full flex" style={{ height: "700px" }}>

                  {/* ── LEFT: Cream text panel ── */}
                  <div
                    className="w-full md:w-1/2 flex flex-col justify-center px-8 xl:px-20 bg-gauri-warm-cream"
                    style={{ height: "100%" }}
                  >
                    {/* Eyebrow */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="h-[1px] w-10 bg-gauri-aged-brass" />
                      <span className="text-[10px] tracking-[0.25em] text-gauri-aged-brass font-medium uppercase">
                        {item.title_one}
                      </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-[2.6rem] md:text-[3.2rem] xl:text-[3.8rem] text-gauri-deep-gold leading-[1.08] mb-5 font-semibold">
                      {item.title_two}
                    </h1>

                    {/* Sub */}
                    <p className="text-lg text-gauri-aged-brass italic mb-4 font-light">
                      Premium women&apos;s ethnic wear
                    </p>

                    <p className="text-sm text-gauri-rich-umber/75 max-w-[300px] leading-relaxed mb-10 hidden md:block">
                      Handcrafted with centuries-old traditions. Each piece
                      tells a story of heritage, craftsmanship &amp; timeless grace.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-5">
                      <Link
                        href={{ pathname: "/single-product", query: { slug: item.product_slug } }}
                        passHref
                      >
                        <a className="relative overflow-hidden bg-gauri-deep-gold text-white px-7 py-3.5 text-[11px] tracking-[0.15em] font-semibold group hover:bg-gauri-rich-umber transition-colors duration-300">
                          <span className="relative z-10">SHOP NOW</span>
                          <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out bg-white/20 skew-x-[-20deg]" />
                        </a>
                      </Link>
                      <Link href="/products" passHref>
                        <a className="text-[11px] font-semibold tracking-[0.12em] text-gauri-deep-gold border-b border-gauri-deep-gold pb-0.5 hover:text-gauri-aged-brass hover:border-gauri-aged-brass transition-colors duration-300">
                          VIEW LOOKBOOK →
                        </a>
                      </Link>
                    </div>
                  </div>

                  {/* ── RIGHT: Full image panel ── */}
                  <div
                    className="hidden md:block w-1/2 relative overflow-hidden"
                    style={{ height: "100%" }}
                  >
                    <div
                      className="absolute inset-0 bg-center bg-cover"
                      style={{
                        backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL + item.image})`,
                      }}
                    />

                    {/* Scroll indicator */}
                    <div className="absolute bottom-10 right-10 flex flex-col items-center opacity-50 z-10">
                      <span
                        className="text-[8px] tracking-[0.35em] text-white mb-3 font-semibold drop-shadow"
                        style={{ writingMode: "vertical-rl" }}
                      >
                        SCROLL
                      </span>
                      <div className="w-[1px] h-14 bg-white drop-shadow scroll-indicator" />
                    </div>
                  </div>

                </div>
              </div>
            ))}
        </SimpleSlider>
      </div>
    </div>
  );
}
