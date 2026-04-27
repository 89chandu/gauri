export default function TopBar({ className }) {
  return (
    <div className={`w-full h-[40px] bg-gauri-aged-brass overflow-hidden flex items-center ${className || ""}`}>
      <div className="gauri-marquee text-white text-xs font-semibold tracking-[0.2em] uppercase">
        <span className="mx-8 flex items-center"><span className="text-[8px] mr-3">✦</span> FREE SHIPPING ON ORDERS ABOVE ₹2999 <span className="text-[8px] ml-3">✦</span></span>
        <span className="mx-8 flex items-center"><span className="text-[8px] mr-3">✦</span> PREMIUM HANDLOOM NOW AVAILABLE <span className="text-[8px] ml-3">✦</span></span>
        <span className="mx-8 flex items-center"><span className="text-[8px] mr-3">✦</span> NEW FESTIVE COLLECTION LIVE <span className="text-[8px] ml-3">✦</span></span>
        {/* Duplicate for seamless looping */}
        <span className="mx-8 flex items-center"><span className="text-[8px] mr-3">✦</span> FREE SHIPPING ON ORDERS ABOVE ₹2999 <span className="text-[8px] ml-3">✦</span></span>
        <span className="mx-8 flex items-center"><span className="text-[8px] mr-3">✦</span> PREMIUM HANDLOOM NOW AVAILABLE <span className="text-[8px] ml-3">✦</span></span>
        <span className="mx-8 flex items-center"><span className="text-[8px] mr-3">✦</span> NEW FESTIVE COLLECTION LIVE <span className="text-[8px] ml-3">✦</span></span>
      </div>
    </div>
  );
}
