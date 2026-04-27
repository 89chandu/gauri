import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiRequest from "../../../../utils/apiRequest";
import InputCom from "../../Helpers/InputCom";
import LoaderStyleOne from "../../Helpers/Loaders/LoaderStyleOne";
import languageModel from "../../../../utils/languageModel";

function VerifyWidget({ redirect = true, verifyActionPopup }) {
  const router = useRouter();
  const location = useRouter();
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [langCntnt, setLangCntnt] = useState(null);

  useEffect(() => { setLangCntnt(languageModel()); }, []);

  const doVerify = async () => {
    setLoading(true);
    await apiRequest.verification({ email: location.query.email }, otp)
      .then((res) => {
        setLoading(false);
        if (res) {
          toast.success(res.data.notification);
          if (redirect) router.push("/login");
          else verifyActionPopup();
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err.response?.data?.notification) toast.error(err.response.data.notification);
      });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-[10px] tracking-[0.25em] text-gauri-aged-brass uppercase mb-2">Secure</p>
        <h2 className="text-3xl font-semibold text-gauri-rich-umber">{langCntnt?.Verify_You}</h2>
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

        <button
          disabled={!otp}
          onClick={doVerify}
          type="button"
          className="w-full h-[50px] bg-gauri-deep-gold hover:bg-gauri-rich-umber disabled:bg-gauri-pale-ivory disabled:cursor-not-allowed text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-300 flex items-center justify-center space-x-2 mt-4"
        >
          <span>{langCntnt?.Verify}</span>
          {loading && <span className="w-5" style={{ transform: "scale(0.3)" }}><LoaderStyleOne /></span>}
        </button>
      </div>
    </div>
  );
}

export default VerifyWidget;
