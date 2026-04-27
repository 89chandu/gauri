import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchBox from "../../../Helpers/SearchBox";

export default function Middlebar({ className }) {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const { wishlistData } = useSelector((state) => state.wishlistData);
  const wishlists = wishlistData && wishlistData.wishlists;
  const { cart } = useSelector((state) => state.cart);
  const [cartItems, setCartItem] = useState(null);
  const [searchToggle, setToggle] = useState(false);
  const [auth, setAuth] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    cart && setCartItem(cart.cartProducts);
  }, [cart]);

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("auth")));
  }, []);

  return (
    <div className={`w-full h-[80px] bg-gauri-warm-cream border-b border-gauri-pale-ivory ${className}`}>
      <div className="container-x mx-auto h-full">
        <div className="relative h-full flex justify-between items-center">
          {/* Logo */}
          <div className="relative z-20">
            <Link href="/" passHref>
              <a rel="noopener noreferrer">
                <h1 className="text-[28px] font-semibold text-gauri-deep-gold tracking-widest whitespace-nowrap" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  GAURI COLLECTION
                </h1>
              </a>
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/" passHref>
              <a className="gauri-nav-link text-xs font-semibold tracking-wider text-gauri-aged-brass hover:text-gauri-deep-gold transition-colors duration-300">
                HOME
              </a>
            </Link>
            {websiteSetup && websiteSetup.payload.productCategories.slice(0, 5).map((item, index) => (
              <Link key={index} href={{ pathname: "/products", query: { category: item.slug } }} passHref>
                <a className="gauri-nav-link text-xs font-semibold tracking-wider text-gauri-aged-brass hover:text-gauri-deep-gold transition-colors duration-300 uppercase">
                  {item.name}
                </a>
              </Link>
            ))}
            <Link href="/about" passHref>
              <a className="gauri-nav-link text-xs font-semibold tracking-wider text-gauri-aged-brass hover:text-gauri-deep-gold transition-colors duration-300">
                ABOUT
              </a>
            </Link>
            <Link href="/contact" passHref>
              <a className="gauri-nav-link text-xs font-semibold tracking-wider text-gauri-aged-brass hover:text-gauri-deep-gold transition-colors duration-300">
                CONTACT
              </a>
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex space-x-6 items-center relative z-20">
            {/* Search */}
            <div onClick={() => setToggle(!searchToggle)} className="cursor-pointer text-gauri-deep-gold hover:opacity-70 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>

            {/* Wishlist */}
            <div className="relative cursor-pointer text-gauri-deep-gold hover:opacity-70 transition-opacity">
              <Link href="/wishlist" passHref>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </Link>
              <span className="w-4 h-4 rounded-full bg-gauri-pale-ivory text-gauri-deep-gold absolute -top-1.5 -right-2 flex justify-center items-center text-[9px] font-bold">
                {wishlists ? wishlists.data.length : 0}
              </span>
            </div>

            {/* Cart */}
            <div className="relative cursor-pointer text-gauri-deep-gold hover:opacity-70 transition-opacity">
              <Link href="/cart" passHref>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm5.938 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </Link>
              <span className="w-4 h-4 rounded-full bg-gauri-pale-ivory text-gauri-deep-gold absolute -top-1.5 -right-2 flex justify-center items-center text-[9px] font-bold">
                {cartItems ? cartItems.length : 0}
              </span>
            </div>

            {/* Profile / Login */}
            <div className="relative">
              <button
                onClick={() => auth ? setProfileOpen(!profileOpen) : null}
                className="cursor-pointer text-gauri-deep-gold hover:opacity-70 transition-opacity"
              >
                {auth ? (
                  // Logged-in: filled person icon
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                  </svg>
                ) : (
                  // Logged-out: outline person icon
                  <Link href="/login" passHref>
                    <a className="text-gauri-deep-gold hover:opacity-70 transition-opacity">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </a>
                  </Link>
                )}
              </button>

              {/* Profile Dropdown (only when logged in) */}
              {auth && profileOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setProfileOpen(false)}></div>
                  <div className="absolute right-0 top-10 w-52 bg-gauri-warm-white border border-gauri-pale-ivory shadow-lg z-40 py-2" style={{ boxShadow: '0 8px 32px rgba(107,76,30,0.12)' }}>
                    <div className="px-4 py-3 border-b border-gauri-pale-ivory">
                      <p className="text-xs text-gauri-aged-brass uppercase tracking-wider">Hello,</p>
                      <p className="text-sm font-semibold text-gauri-deep-gold truncate">{auth.user?.name}</p>
                    </div>
                    <ul className="py-2">
                      <li>
                        <Link href="/profile#dashboard" passHref>
                          <a className="flex items-center space-x-3 px-4 py-2 text-sm text-gauri-rich-umber hover:bg-gauri-cream-dark hover:text-gauri-deep-gold transition-colors">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                            <span>My Profile</span>
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/profile#orders" passHref>
                          <a className="flex items-center space-x-3 px-4 py-2 text-sm text-gauri-rich-umber hover:bg-gauri-cream-dark hover:text-gauri-deep-gold transition-colors">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" /></svg>
                            <span>My Orders</span>
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/wishlist" passHref>
                          <a className="flex items-center space-x-3 px-4 py-2 text-sm text-gauri-rich-umber hover:bg-gauri-cream-dark hover:text-gauri-deep-gold transition-colors">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                            <span>Wishlist</span>
                          </a>
                        </Link>
                      </li>
                      <li className="border-t border-gauri-pale-ivory mt-1 pt-1">
                        <button
                          onClick={() => {
                            localStorage.removeItem("auth");
                            localStorage.removeItem("active-user");
                            setAuth(null);
                            setProfileOpen(false);
                            window.location.href = "/login";
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-qred hover:bg-gauri-cream-dark transition-colors"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
                          <span>Sign Out</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Search Dropdown */}
          <div className={`w-full h-[120px] bg-gauri-warm-cream shadow transition-all duration-300 ease-in-out fixed left-0 top-[120px] transform ${searchToggle ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`} style={{ zIndex: 99 }}>
            <div className="w-full h-full flex justify-center items-center relative container-x mx-auto">
              <div className="w-[620px] h-[50px] relative">
                <SearchBox />
              </div>
              <button onClick={() => setToggle(!searchToggle)} type="button" className="text-gauri-deep-gold absolute right-5 top-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
