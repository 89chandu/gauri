import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiRequest from "../../../../utils/apiRequest";
import InputCom from "../../Helpers/InputCom";
import LoaderStyleOne from "../../Helpers/Loaders/LoaderStyleOne";
import Layout from "../../Partials/Layout";
import Image from "next/image";
import { useSelector } from "react-redux";
import languageModel from "../../../../utils/languageModel";

export default function ForgotPass() {
  const router = useRouter();
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetPass, setResetpass] = useState(false);
  const [otp, setOtp] = useState("");
  const [forgotUser, setForgotUser] = useState(true);
  const [newPass, setNewPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [imgThumb, setImgThumb] = useState(null);
  const [langCntnt, setLangCntnt] = useState(null);

  useEffect(() => { setLangCntnt(languageModel()); }, []);
  useEffect(() => {
    if (websiteSetup) setImgThumb(websiteSetup.payload.login_page_image);
  }, [websiteSetup]);

  const doForgot = async () => {
    setLoading(true);
    await apiRequest.forgotPass({ email })
      .then(() => {
        setResetpass(true);
        setForgotUser(false);
        setLoading(false);
        setErrors(null);
      })
      .catch((err) => {
        setLoading(false);
        setErrors(err.response);
        if (err.response?.data?.notification) toast.error(err.response.data.notification);
      });
  };

  const doReset = async () => {
    setLoading(true);
    await apiRequest.resetPass({ email, password: newPass, password_confirmation: confirmPassword }, otp)
      .then((res) => {
        setLoading(false);
        router.push("/login");
        toast.success(res.data.notification);
      })
      .catch((err) => {
        setLoading(false);
        setErrors(err.response);
        if (err.response?.data?.notification) toast.error(err.response.data.notification);
      });
  };

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
          <div className="w-full max-w-[440px]">
            {forgotUser && (
              <div className="w-full">
                <div className="text-center mb-8">
                  <p className="text-[10px] tracking-[0.25em] text-gauri-aged-brass uppercase mb-2">Recovery</p>
                  <h2 className="text-3xl font-semibold text-gauri-rich-umber">{langCntnt?.Forgot_password}</h2>
                  <div className="w-10 h-[2px] bg-gauri-gold-leaf mx-auto mt-3"></div>
                </div>

                <div className="space-y-5">
                  <InputCom
                    placeholder={langCntnt?.email}
                    label={langCntnt?.Email_Address + "*"}
                    name="email"
                    type="email"
                    value={email}
                    inputHandler={(e) => setEmail(e.target.value.trim())}
                  />

                  <button
                    onClick={doForgot}
                    type="button"
                    disabled={!email}
                    className="w-full h-[50px] bg-gauri-deep-gold hover:bg-gauri-rich-umber disabled:bg-gauri-pale-ivory disabled:cursor-not-allowed text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-300 flex items-center justify-center space-x-2 mt-4"
                  >
                    <span>{langCntnt?.Send}</span>
                    {loading && <span className="w-5" style={{ transform: "scale(0.3)" }}><LoaderStyleOne /></span>}
                  </button>
                </div>
              </div>
            )}

            {resetPass && (
              <div className="w-full">
                <div className="text-center mb-8">
                  <p className="text-[10px] tracking-[0.25em] text-gauri-aged-brass uppercase mb-2">Secure</p>
                  <h2 className="text-3xl font-semibold text-gauri-rich-umber">{langCntnt?.Reset_Password}</h2>
                  <div className="w-10 h-[2px] bg-gauri-gold-leaf mx-auto mt-3"></div>
                </div>

                <div className="space-y-5">
                  <InputCom
                    placeholder="● ● ● ● ● ●"
                    label={langCntnt?.OTP + "*"}
                    name="otp"
                    type="text"
                    value={otp}
                    error={errors}
                    inputHandler={(e) => setOtp(e.target.value.trim())}
                  />

                  <InputCom
                    placeholder="● ● ● ● ● ●"
                    label={langCntnt?.New_Password + "*"}
                    name="new_password"
                    type="password"
                    value={newPass}
                    error={!!errors?.data?.errors?.password}
                    inputHandler={(e) => setNewPass(e.target.value.trim())}
                  />
                  {errors?.data?.errors?.password && (
                    <span className="text-[11px] mt-1 text-qred block">{errors.data.errors.password[0]}</span>
                  )}

                  <InputCom
                    placeholder="● ● ● ● ● ●"
                    label={langCntnt?.Confirm_Password + "*"}
                    name="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    error={!!errors?.data?.errors?.password}
                    inputHandler={(e) => setConfirmPassword(e.target.value.trim())}
                  />

                  <button
                    onClick={doReset}
                    type="button"
                    disabled={!otp || !confirmPassword || !newPass}
                    className="w-full h-[50px] bg-gauri-deep-gold hover:bg-gauri-rich-umber disabled:bg-gauri-pale-ivory disabled:cursor-not-allowed text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-300 flex items-center justify-center space-x-2 mt-4"
                  >
                    <span>{langCntnt?.Reset}</span>
                    {loading && <span className="w-5" style={{ transform: "scale(0.3)" }}><LoaderStyleOne /></span>}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </Layout>
  );
}
