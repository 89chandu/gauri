import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function GauriProductSection({ products = [], sectionTitle = "Essential Pieces", eyebrow = "THE NEW ARRIVALS", seeMoreUrl = "/products" }) {
  const dispatch = useDispatch();
  const [wishlistIds, setWishlistIds] = useState([]);

  if (!products || products.length === 0) return null;

  const displayProducts = products.slice(0, 8);

  const toggleWishlist = (id) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full bg-gauri-warm-cream py-14 md:py-20">
      <div className="container-x mx-auto">

        {/* Section Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-[10px] tracking-[0.25em] text-gauri-aged-brass uppercase mb-2 font-medium">
              {eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl text-gauri-rich-umber font-semibold">
              {sectionTitle}
            </h2>
          </div>
          <Link href={seeMoreUrl} passHref>
            <a className="hidden md:block text-[10px] font-semibold tracking-[0.2em] text-gauri-aged-brass hover:text-gauri-deep-gold border-b border-gauri-pale-ivory hover:border-gauri-deep-gold transition-colors pb-0.5 uppercase">
              Explore All Collections
            </a>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {displayProducts.map((product, i) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const price = product.price;
            const discountPrice = product.special_discount_type === "percent"
              ? price - (price * product.special_discount) / 100
              : product.special_discount_type === "flat"
              ? price - product.special_discount
              : price;

            return (
              <div
                key={i}
                className="group bg-white rounded-sm overflow-hidden border border-gauri-pale-ivory hover:border-gauri-gold-leaf hover:shadow-md transition-all duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-gauri-warm-cream" style={{ height: '220px' }}>
                  <Link href={{ pathname: "/single-product", query: { slug: product.slug } }} passHref>
                    <a>
                      <div
                        className="w-full h-full bg-center bg-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
                        style={{
                          backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL + product.thumb_image})`,
                        }}
                      />
                    </a>
                  </Link>

                  {/* Wishlist heart */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-10"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill={isWishlisted ? "#6B4C1E" : "none"}
                      stroke="#6B4C1E"
                      strokeWidth="1.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>

                  {/* Discount badge */}
                  {product.special_discount > 0 && (
                    <div className="absolute top-3 left-3 bg-gauri-deep-gold text-white text-[9px] font-semibold tracking-wider px-2 py-1">
                      {product.special_discount_type === "percent"
                        ? `${product.special_discount}% OFF`
                        : `SALE`}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3 md:p-4">
                  <Link href={{ pathname: "/single-product", query: { slug: product.slug } }} passHref>
                    <a>
                      <p className="text-sm text-gauri-rich-umber font-medium leading-snug mb-2 hover:text-gauri-deep-gold transition-colors line-clamp-1">
                        {product.name}
                      </p>
                    </a>
                  </Link>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-base font-semibold text-gauri-deep-gold">
                      ₹{Math.round(discountPrice).toLocaleString("en-IN")}
                    </span>
                    {product.special_discount > 0 && (
                      <span className="text-xs text-gauri-aged-brass/60 line-through">
                        ₹{Math.round(price).toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <Link href={{ pathname: "/single-product", query: { slug: product.slug } }} passHref>
                      <a className="flex-1 bg-gauri-deep-gold hover:bg-gauri-rich-umber text-white text-[10px] font-semibold tracking-[0.12em] py-2.5 text-center transition-colors duration-300 uppercase">
                        Buy Now
                      </a>
                    </Link>
                    <Link href={{ pathname: "/single-product", query: { slug: product.slug } }} passHref>
                      <a className="flex-1 border border-gauri-deep-gold text-gauri-deep-gold hover:bg-gauri-deep-gold hover:text-white text-[10px] font-semibold tracking-[0.12em] py-2.5 text-center transition-all duration-300 uppercase">
                        Add to Cart
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile explore link */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link href={seeMoreUrl} passHref>
            <a className="text-[10px] font-semibold tracking-[0.2em] text-gauri-aged-brass border-b border-gauri-pale-ivory pb-0.5 uppercase">
              Explore All Collections
            </a>
          </Link>
        </div>

      </div>
    </div>
  );
}
