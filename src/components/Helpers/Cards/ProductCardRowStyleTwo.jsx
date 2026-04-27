import Image from "next/image";
import Link from "next/link";
import settings from "../../../../utils/settings";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import auth from "../../../../utils/auth";
import apiRequest from "../../../../utils/apiRequest";
import { toast } from "react-toastify";
import { fetchCart } from "../../../store/Cart";
import CheckProductIsExistsInFlashSale from "../../Shared/CheckProductIsExistsInFlashSale";

const Redirect = () => (
  <div className="flex space-x-2 items-center">
    <span className="text-sm" style={{ color: "#9A7040" }}>Item added</span>
    <Link href="/cart">
      <span className="text-xs border-b cursor-pointer" style={{ color: "#6B4C1E", borderColor: "#6B4C1E" }}>
        Go To Cart
      </span>
    </Link>
  </div>
);

// Gold star icon
function GoldStar({ filled = true }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? "#C9A96E" : "none"} stroke="#C9A96E" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  );
}

export default function ProductCardRowStyleTwo({ className, datas }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const varients = datas && datas.variants.length > 0 && datas.variants;
  const [getFirstVarients, setFirstVarients] = useState(
    varients && varients.map((v) => v.active_variant_items[0])
  );
  const [price, setPrice] = useState(null);
  const [offerPrice, setOffer] = useState(null);
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const [isProductInFlashSale, setData] = useState(null);

  useEffect(() => {
    if (websiteSetup) {
      const getId = websiteSetup.payload.flashSaleProducts.find(
        (item) => parseInt(item.product_id) === parseInt(datas.id)
      );
      setData(!!getId);
    }
  }, [websiteSetup]);

  const addToCart = (id) => {
    if (auth()) {
      const data = {
        id,
        token: auth() && auth().access_token,
        quantity: 1,
        variants: getFirstVarients && getFirstVarients.length > 0 && getFirstVarients.map((v) => v ? parseInt(v.product_variant_id) : null),
        variantItems: getFirstVarients && getFirstVarients.length > 0 && getFirstVarients.map((v) => (v ? v.id : null)),
      };
      if (varients) {
        const variantQuery = data.variants.map((value) => value ? `variants[]=${value}` : `variants[]=-1`);
        const variantString = variantQuery.map((v) => v + "&").join("");
        const itemsQuery = data.variantItems.map((value) => value ? `items[]=${value}` : `items[]=-1`);
        const itemQueryStr = itemsQuery.map((v) => v + "&").join("");
        const uri = `token=${data.token}&product_id=${data.id}&${variantString}${itemQueryStr}quantity=${data.quantity}`;
        apiRequest.addToCard(uri)
          .then(() => toast.success(<Redirect />, { autoClose: 5000 }))
          .catch((err) => toast.error(err.response?.data?.message));
        dispatch(fetchCart());
      } else {
        const uri = `token=${data.token}&product_id=${data.id}&quantity=${data.quantity}`;
        apiRequest.addToCard(uri)
          .then(() => toast.success(<Redirect />, { autoClose: 5000 }))
          .catch((err) => toast.error(err.response?.data?.message));
        dispatch(fetchCart());
      }
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    if (varients) {
      const prices = varients.map((v) => v.active_variant_items.length > 0 && v.active_variant_items[0].price ? v.active_variant_items[0].price : 0);
      if (datas.offer_price) {
        const sumOfferPrice = parseFloat(prices.reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0) + parseFloat(datas.offer_price));
        setPrice(datas.price);
        setOffer(sumOfferPrice);
      } else {
        const sumPrice = parseFloat(prices.reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0) + parseFloat(datas.price));
        setPrice(sumPrice);
      }
    } else {
      setPrice(datas && datas.price ? parseFloat(datas.price) : null);
      setOffer(datas && datas.offer_price ? parseFloat(datas.offer_price) : null);
    }
  }, [datas, varients]);

  const { currency_icon } = settings();

  return (
    <div
      className={`group relative bg-white border border-gauri-pale-ivory hover:border-gauri-gold-leaf hover:shadow-lg transition-all duration-300 rounded-sm overflow-hidden flex flex-col ${className || ""}`}
    >
      {/* Product Image */}
      <Link href={{ pathname: "/single-product", query: { slug: datas.slug } }} passHref>
        <a className="block relative overflow-hidden bg-gauri-warm-cream" style={{ aspectRatio: "1/1" }}>
          <div className="w-full h-full relative">
            <Image
              layout="fill"
              objectFit="contain"
              src={datas.image}
              alt={datas.title}
              className="group-hover:scale-105 transition-transform duration-500 p-3"
            />
          </div>
          {/* Sale badge */}
          {offerPrice && (
            <div className="absolute top-2 left-2 bg-gauri-deep-gold text-white text-[9px] font-semibold tracking-wider px-2 py-0.5">
              SALE
            </div>
          )}
        </a>
      </Link>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        {/* Stars */}
        <div className="flex items-center space-x-0.5 mb-2">
          {Array.from({ length: 5 }, (_, i) => (
            <GoldStar key={i} filled={i < (datas.review || 0)} />
          ))}
        </div>

        {/* Title */}
        <Link href={{ pathname: "/single-product", query: { slug: datas.slug } }} passHref>
          <a>
            <h3 className="text-sm font-medium text-gauri-rich-umber hover:text-gauri-deep-gold transition-colors line-clamp-1 mb-2 leading-snug">
              {datas.title}
            </h3>
          </a>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mt-auto mb-3">
          {offerPrice ? (
            <>
              <span className="text-sm text-gauri-aged-brass/60 line-through">{currency_icon}{price}</span>
              <span className="text-base font-semibold text-gauri-deep-gold">
                <CheckProductIsExistsInFlashSale id={datas.id} price={offerPrice} />
              </span>
            </>
          ) : (
            <span className="text-base font-semibold text-gauri-deep-gold">
              {isProductInFlashSale && (
                <span className="line-through text-gauri-aged-brass/60 font-normal text-sm mr-1">{currency_icon}{parseFloat(price).toFixed(2)}</span>
              )}
              <CheckProductIsExistsInFlashSale id={datas.id} price={price} />
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={(e) => { e.preventDefault(); addToCart(datas.id); }}
          className="w-full border border-gauri-deep-gold text-gauri-deep-gold hover:bg-gauri-deep-gold hover:text-white text-[10px] font-semibold tracking-[0.1em] py-2 transition-all duration-300 uppercase"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
