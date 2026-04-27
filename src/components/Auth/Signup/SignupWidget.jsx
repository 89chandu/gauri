import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiRequest from "../../../../utils/apiRequest";
import languageModel from "../../../../utils/languageModel";
import settings from "../../../../utils/settings";
import countries from "../../../data/CountryCodes.json";
import InputCom from "../../Helpers/InputCom";
import LoaderStyleOne from "../../Helpers/Loaders/LoaderStyleOne";

function SignupWidget({ redirect = true, signupActionPopup, changeContent }) {
  const router = useRouter();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+880");
  const [getCountries, setGetCountries] = useState(null);
  const [countryDropToggle, setCountryDropToggle] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("BD");

  const selectCountryhandler = (value) => {
    setSelectedCountry(value.code);
    setPhone(value.dial_code);
    setCountryDropToggle(false);
  };

  useEffect(() => {
    if (!getCountries) setGetCountries(countries?.countries);
  }, [getCountries]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setCheck] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [langCntnt, setLangCntnt] = useState(null);

  useEffect(() => { setLangCntnt(languageModel()); }, []);

  const rememberMe = () => setCheck(!checked);

  const doSignup = async () => {
    setLoading(true);
    await apiRequest.signup({
      name: fname + " " + lname,
      email,
      password,
      password_confirmation: confirmPassword,
      agree: checked ? 1 : "",
      phone: phone || "",
    })
      .then((res) => {
        setLoading(false);
        toast.success(res.data.notification);
        if (redirect) router.push(`/verify-you?email=${email}`);
        else changeContent();
        setFname(""); setLname(""); setEmail(""); setPassword(""); setConfirmPassword(""); setCheck(false);
      })
      .catch((err) => {
        setLoading(false);
        setErrors(err.response?.data?.errors);
        if (err.response?.status === 403) toast.error(err.response.data.message);
      });
  };

  const { phone_number_required, default_phone_code } = settings();
  useEffect(() => {
    if (default_phone_code) {
      let defaultCountry = getCountries?.find((item) => item.code === default_phone_code);
      if (defaultCountry) {
        setPhone(defaultCountry.dial_code);
        setSelectedCountry(defaultCountry.code);
      }
    }
  }, [default_phone_code, getCountries]);

  return (
    <div className="w-full lg:h-auto h-full overflow-y-scroll overflow-style-none scrollbar-hide">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-[10px] tracking-[0.25em] text-gauri-aged-brass uppercase mb-2">Join Us</p>
        <h2 className="text-3xl font-semibold text-gauri-rich-umber">Create Account</h2>
        <div className="w-10 h-[2px] bg-gauri-gold-leaf mx-auto mt-3"></div>
      </div>

      <div className="space-y-5">
        {/* Names */}
        <div className="flex sm:flex-row flex-col gap-5">
          <div className="flex-1">
            <InputCom
              placeholder={langCntnt?.First_Name}
              label={langCntnt?.First_Name + "*"}
              name="fname"
              type="text"
              value={fname}
              inputHandler={(e) => setFname(e.target.value)}
            />
            {errors?.name && <span className="text-[11px] mt-1 text-qred block">{errors.name[0]}</span>}
          </div>
          <div className="flex-1">
            <InputCom
              placeholder={langCntnt?.Last_Name}
              label={langCntnt?.Last_Name + "*"}
              name="lname"
              type="text"
              value={lname}
              inputHandler={(e) => setLname(e.target.value)}
            />
            {errors?.name && <span className="text-[11px] mt-1 text-qred block">{errors.name[0]}</span>}
          </div>
        </div>

        {/* Email */}
        <div>
          <InputCom
            placeholder={langCntnt?.Email}
            label={langCntnt?.Email_Address + "*"}
            name="email"
            type="email"
            value={email}
            error={!!errors?.email}
            inputHandler={(e) => setEmail(e.target.value)}
          />
          {errors?.email && <span className="text-[11px] mt-1 text-qred block">{errors.email[0]}</span>}
        </div>

        {/* Phone */}
        {parseInt(phone_number_required) === 1 && (
          <div className="relative">
            <InputCom
              placeholder={langCntnt?.Phone_Number}
              label={langCntnt?.phone + "*"}
              name="phone"
              type="text"
              inputClasses="h-[50px] pl-20"
              value={phone}
              error={!!errors?.phone}
              inputHandler={(e) => setPhone(e.target.value)}
            />
            {errors?.phone && <span className="text-[11px] mt-1 text-qred block">{errors.phone[0]}</span>}

            <button
              onClick={() => setCountryDropToggle(!countryDropToggle)}
              type="button"
              className="w-[70px] h-[50px] bg-gauri-aged-brass/5 absolute left-0 bottom-0 border-r border-gauri-pale-ivory flex justify-center items-center"
            >
              <div className="flex items-center space-x-1">
                <span><Image width="24" height="16" src={`/assets/images/countries/${selectedCountry}.svg`} alt="country" /></span>
                <span className="text-gauri-aged-brass">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" className="fill-current"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 14l-4-4h8z" /></svg>
                </span>
              </div>
            </button>

            {countryDropToggle && (
              <div className="w-[250px] h-[250px] bg-white border border-gauri-pale-ivory absolute left-0 top-[80px] z-20 overflow-y-scroll shadow-xl">
                <ul>
                  {getCountries?.map((item, i) => (
                    <li key={i} onClick={() => selectCountryhandler(item)} className="flex space-x-2 items-center px-4 py-2 hover:bg-gauri-warm-cream cursor-pointer transition-colors">
                      <Image width="24" height="16" src={`/assets/images/countries/${item.code}.svg`} alt="country" />
                      <span className="text-sm text-gauri-rich-umber capitalize flex-1">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Passwords */}
        <div className="flex sm:flex-row flex-col gap-5">
          <div className="flex-1">
            <InputCom
              placeholder="••••••••"
              label={langCntnt?.Password + "*"}
              name="password"
              type="password"
              value={password}
              inputHandler={(e) => setPassword(e.target.value)}
            />
            {errors?.password && <span className="text-[11px] mt-1 text-qred block">{errors.password[0]}</span>}
          </div>
          <div className="flex-1">
            <InputCom
              placeholder="••••••••"
              label={langCntnt?.Confirm_Password + "*"}
              name="confirm_password"
              type="password"
              value={confirmPassword}
              inputHandler={(e) => setConfirmPassword(e.target.value)}
            />
            {errors?.password && <span className="text-[11px] mt-1 text-qred block">{errors.password[0]}</span>}
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-center space-x-2 pt-2">
          <label className="flex items-center space-x-2 cursor-pointer" onClick={rememberMe}>
            <div className={`w-4 h-4 border flex items-center justify-center transition-colors shrink-0 ${checked ? "bg-gauri-deep-gold border-gauri-deep-gold" : "border-gauri-pale-ivory bg-white"}`}>
              {checked && <svg width="10" height="10" viewBox="0 0 20 20" fill="white"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
            </div>
          </label>
          {redirect ? (
            <Link href="/seller-terms-condition">
              <span className="text-[12px] text-gauri-rich-umber cursor-pointer hover:text-gauri-deep-gold transition-colors">
                {langCntnt?.I_agree_all_terms_and_condition_in_ecoShop}
              </span>
            </Link>
          ) : (
            <span className="text-[12px] text-gauri-rich-umber cursor-pointer hover:text-gauri-deep-gold transition-colors" onClick={rememberMe}>
              {langCntnt?.I_agree_all_terms_and_condition_in_ecoShop}
            </span>
          )}
        </div>

        {/* Create Button */}
        <button
          onClick={doSignup}
          type="button"
          disabled={!checked}
          className="w-full h-[50px] bg-gauri-deep-gold hover:bg-gauri-rich-umber disabled:bg-gauri-pale-ivory disabled:cursor-not-allowed text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-300 flex items-center justify-center space-x-2 mt-4"
        >
          <span>{langCntnt?.Create_Account}</span>
          {loading && <span className="w-5" style={{ transform: "scale(0.3)" }}><LoaderStyleOne /></span>}
        </button>

        {/* Divider */}
        <div className="flex items-center space-x-3 my-6">
          <div className="flex-1 h-[1px] bg-gauri-pale-ivory"></div>
          <span className="text-[10px] text-gauri-aged-brass tracking-wider uppercase">or</span>
          <div className="flex-1 h-[1px] bg-gauri-pale-ivory"></div>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-gauri-aged-brass pb-4">
          {langCntnt?.Already_have_an_Account}?{" "}
          {redirect ? (
            <Link href="/login" passHref>
              <a className="text-gauri-deep-gold font-semibold hover:text-gauri-aged-brass transition-colors">
                {langCntnt?.Log_In}
              </a>
            </Link>
          ) : (
            <button onClick={signupActionPopup} type="button" className="text-gauri-deep-gold font-semibold hover:text-gauri-aged-brass transition-colors">
              {langCntnt?.Log_In}
            </button>
          )}
        </p>
      </div>
    </div>
  );
}

export default SignupWidget;
