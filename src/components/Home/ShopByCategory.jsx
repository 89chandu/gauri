import Link from "next/link";
import Image from "next/image";

export default function ShopByCategory({ categories = [] }) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="w-full bg-gauri-warm-white py-14 md:py-20">
      <div className="container-x mx-auto">
        {/* Section header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl text-gauri-deep-gold font-semibold mb-2">
              Shop By Category
            </h2>
            <div className="w-14 h-[2px] bg-gauri-gold-leaf"></div>
          </div>
          <Link href="/products" passHref>
            <a className="hidden md:block text-[10px] font-semibold tracking-[0.2em] text-gauri-aged-brass hover:text-gauri-deep-gold border-b border-gauri-pale-ivory hover:border-gauri-deep-gold transition-colors pb-0.5 uppercase">
              Explore All Categories
            </a>
          </Link>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-7">
          {categories
            .slice(0, categories.length > 10 ? 10 : categories.length)
            .map((item, i) => (
              <Link
                key={i}
                href={{ pathname: "/products", query: { category: item.slug } }}
                passHref
              >
                <a className="group flex flex-col items-center text-center cursor-pointer">
                  {/* Arch-shaped image container */}
                  <div
                    className="w-full relative overflow-hidden bg-gauri-cream-dark group-hover:shadow-lg transition-shadow duration-300"
                    style={{
                      borderRadius: "50% 50% 0 0 / 30% 30% 0 0",
                      aspectRatio: "3/4",
                    }}
                  >
                    <Image
                      layout="fill"
                      objectFit="cover"
                      src={process.env.NEXT_PUBLIC_BASE_URL + item.image}
                      alt={item.name}
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Subtle gold overlay on hover */}
                    <div className="absolute inset-0 bg-gauri-deep-gold/0 group-hover:bg-gauri-deep-gold/10 transition-all duration-300" />
                  </div>

                  {/* Category name */}
                  <p className="mt-3 text-[11px] font-semibold tracking-[0.15em] text-gauri-rich-umber group-hover:text-gauri-deep-gold transition-colors uppercase">
                    {item.name}
                  </p>
                </a>
              </Link>
            ))}
        </div>

        {/* Mobile explore link */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/products" passHref>
            <a className="text-[10px] font-semibold tracking-[0.2em] text-gauri-aged-brass border-b border-gauri-pale-ivory pb-0.5 uppercase">
              Explore All Categories
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
