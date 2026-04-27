import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import apiRequest from "../../../../utils/apiRequest";
import languageModel from "../../../../utils/languageModel";
import { fetchWishlist } from "../../../store/wishlistData";
import LoginContext from "../../Contexts/LoginContexts";
import InputCom from "../../Helpers/InputCom";
import LoaderStyleOne from "../../Helpers/Loaders/LoaderStyleOne";

const SEND = ({ action, des, btn }) => (
  <div>
    <p className="text-xs text-gauri-rich-umber">{des}</p>
    <button type="button" onClick={action} className="text-sm font-bold mt-2" style={{ color: "#6B4C1E" }}>{btn}</button>
  </div>
);

function LoginWidget({ redirect = true, loginActionPopup, notVerifyHandler }) {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const loginPopupBoard = useContext(LoginContext);
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setValue] = useState(false);
  const [langCntnt, setLangCntnt] = useState(null);
  const [defaultProfileImg, setDefault] = useState(null);

  useEffect(() => { setLangCntnt(languageModel()); }, []);
  useEffect(() => {
    if (!defaultProfileImg && websiteSetup)
      setDefault(websiteSetup.payload.defaultProfile);
  }, [defaultProfileImg]);

  const rememberMe = () => setValue(!checked);

  const sendOtpHandler = () => {
    apiRequest.resend({ email }).then(() => router.push(`/verify-you?email=${email}`)).catch(console.log);
  };

  const doLogin = async () => {
    setLoading(true);
    await apiRequest.login({ email, password })
      .then((res) => {
        setLoading(false);
        toast.success(langCntnt && langCntnt.Login_Successfully);
        setEmail(""); setPassword("");
        localStorage.removeItem("auth");
        localStorage.setItem("auth", JSON.stringify(res.data));
        const activeUser = res.data && {
          name: res.data.user.name,
          phone: res.data.user.phone,
          image: res.data.user.image ? res.data.user.image : defaultProfileImg && defaultProfileImg.image,
        };
        if (activeUser) localStorage.setItem("active-user", JSON.stringify(activeUser));
        dispatch(fetchWishlist());
        if (redirect) router.push("/");
        else if (res.data) loginPopupBoard.handlerPopup(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          if (err.response.data.notification === "Please verify your acount. If you didn't get OTP, please resend your OTP and verify") {
            toast.warn(
              <SEND des={langCntnt && langCntnt.Please_verify_your_account__If_you_didnt_get_OTP__please_resend_your_OTP_and_verify} action={sendOtpHandler} btn={langCntnt && langCntnt.Send_OTP} />,
              { autoClose: 5000, icon: false, theme: "colored" }
            );
          } else {
            toast.error(langCntnt && langCntnt.Invalid_Credentials);
          }
        }
      });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-[10px] tracking-[0.25em] text-gauri-aged-brass uppercase mb-2">Welcome Back</p>
        <h2 className="text-3xl font-semibold text-gauri-rich-umber">Sign In</h2>
        <div className="w-10 h-[2px] bg-gauri-gold-leaf mx-auto mt-3"></div>
      </div>

      {/* Form */}
      <div className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-[11px] font-semibold tracking-[0.12em] text-gauri-aged-brass uppercase mb-2">
            {langCntnt && langCntnt.Email_Address}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={langCntnt && langCntnt.Email}
            className="w-full h-[50px] border border-gauri-pale-ivory bg-gauri-warm-cream px-4 text-sm text-gauri-rich-umber placeholder-gauri-aged-brass/50 focus:outline-none focus:border-gauri-gold-leaf transition-colors"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-[11px] font-semibold tracking-[0.12em] text-gauri-aged-brass uppercase mb-2">
            {langCntnt && langCntnt.Password}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full h-[50px] border border-gauri-pale-ivory bg-gauri-warm-cream px-4 text-sm text-gauri-rich-umber placeholder-gauri-aged-brass/50 focus:outline-none focus:border-gauri-gold-leaf transition-colors"
          />
        </div>

        {/* Remember + Forgot */}
        <div className="flex justify-between items-center">
          <label className="flex items-center space-x-2 cursor-pointer" onClick={rememberMe}>
            <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${checked ? "bg-gauri-deep-gold border-gauri-deep-gold" : "border-gauri-pale-ivory"}`}>
              {checked && <svg width="10" height="10" viewBox="0 0 20 20" fill="white"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
            </div>
            <span className="text-sm text-gauri-aged-brass">{langCntnt && langCntnt.Remember_Me}</span>
          </label>
          {redirect && (
            <Link href="/forgot-password">
              <span className="text-sm text-gauri-deep-gold hover:text-gauri-aged-brass cursor-pointer transition-colors">
                {langCntnt && langCntnt.Forgot_password}?
              </span>
            </Link>
          )}
        </div>

        {/* Sign In Button */}
        <button
          onClick={doLogin}
          type="button"
          className="w-full h-[50px] bg-gauri-deep-gold hover:bg-gauri-rich-umber text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-300 flex items-center justify-center space-x-2"
        >
          <span>{langCntnt && langCntnt.Log_In}</span>
          {loading && <span className="w-5" style={{ transform: "scale(0.3)" }}><LoaderStyleOne /></span>}
        </button>

        {/* Divider */}
        <div className="flex items-center space-x-3">
          <div className="flex-1 h-[1px] bg-gauri-pale-ivory"></div>
          <span className="text-[10px] text-gauri-aged-brass tracking-wider uppercase">or</span>
          <div className="flex-1 h-[1px] bg-gauri-pale-ivory"></div>
        </div>

        {/* Signup link */}
        <p className="text-center text-sm text-gauri-aged-brass">
          {langCntnt && langCntnt.Dontt_have_an_account}?{" "}
          {redirect ? (
            <Link href="/signup" passHref>
              <a className="text-gauri-deep-gold font-semibold hover:text-gauri-aged-brass transition-colors">
                {langCntnt && langCntnt.sign_up_free}
              </a>
            </Link>
          ) : (
            <button onClick={loginActionPopup} type="button" className="text-gauri-deep-gold font-semibold">
              {langCntnt && langCntnt.sign_up_free}
            </button>
          )}
        </p>
      </div>
    </div>
  );
}

export default LoginWidget;
