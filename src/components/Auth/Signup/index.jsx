import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import languageModel from "../../../../utils/languageModel";
import Layout from "../../Partials/Layout";
import SignupWidget from "./SignupWidget";
import VerifyWidget from "./VerifyWidget";

export default function Signup() {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const [verify, setVerify] = useState(false);
  const [signupView, setSignupView] = useState(false);
  const [imgThumb, setImgThumb] = useState(null);
  const [langCntnt, setLangCntnt] = useState(null);
  const location = useRouter();

  useEffect(() => { setLangCntnt(languageModel()); }, []);
  useEffect(() => {
    if (websiteSetup) setImgThumb(websiteSetup.payload.login_page_image);
  }, [websiteSetup]);

  useEffect(() => {
    if (location.route === "/verify-you") setVerify(true);
    else setSignupView(true);
  }, [location]);

  return (
    <Layout childrenClasses="pt-0 pb-0 min-h-0">
      <div className="login-page-wrapper w-full min-h-screen relative flex items-center" style={{ background: "#F5EFE0" }}>
        
        {/* Left decorative panel */}
        <div className="hidden lg:flex w-1/2 min-h-screen relative items-center justify-center overflow-hidden" style={{ background: "#3D2B0F" }}>
          {imgThumb && (
            <Image layout="fill" objectFit="cover" src={`${process.env.NEXT_PUBLIC_BASE_URL + imgThumb.image}`} alt="login" className="opacity-30" />
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(107,76,30,0.9) 0%, rgba(61,43,15,0.95) 100%)" }} />
          <div className="relative z-10 text-center px-12">
            <h1 className="text-4xl font-semibold text-gauri-gold-leaf mb-4 tracking-widest" style={{ fontFamily: "Cormorant Garamond, serif" }}>
              GAURI COLLECTION
            </h1>
            <div className="w-16 h-[1px] bg-gauri-gold-leaf mx-auto mb-6"></div>
            <p className="text-gauri-pale-ivory/80 text-sm italic leading-relaxed">
              Celebrating the art of Indian craftsmanship.<br />Each piece woven with tradition & grace.
            </p>
            {/* Decorative circles */}
            <div className="mt-10 flex justify-center space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-2 h-2 rounded-full" style={{ background: i === 2 ? "#C9A96E" : "rgba(201,169,110,0.3)" }} />
              ))}
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center px-6 py-14" style={{ background: "#FAF6EE" }}>
          <div className="w-full max-w-[480px]">
            {verify ? (
              <VerifyWidget />
            ) : signupView ? (
              <SignupWidget />
            ) : null}
          </div>
        </div>

      </div>
    </Layout>
  );
}
