import Link from "next/link";
import { useEffect, useState } from "react";
import languageModel from "../../../utils/languageModel";

export default function ViewMoreTitle({
  categoryTitle = "",
  className,
  children,
  seeMoreUrl = "",
  categoryies = [],
  categoryHandler,
  productsInCategoryIds,
}) {
  const filterCategory =
    categoryies &&
    categoryies.length > 0 &&
    categoryies.filter((category) => {
      const id = parseInt(category.category_id);
      return productsInCategoryIds.includes(id);
    });
  const [langCntnt, setLangCntnt] = useState(null);
  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);
  return (
    <div className={`section-wrapper w-full ${className || ""}`}>
      <div className="container-x mx-auto">
        <div className="section-title flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gauri-rich-umber leading-none mb-2">
              {categoryTitle}
            </h2>
            <div className="w-10 h-[2px] bg-gauri-gold-leaf"></div>
          </div>

          {filterCategory && filterCategory.length > 0 && (
            <div className="row-categories lg:flex space-x-8 items-center hidden">
              {filterCategory
                .slice(0, filterCategory.length > 4 ? 4 : filterCategory.length)
                .map((item, i) => (
                  <button
                    key={i}
                    onClick={() => categoryHandler(item.category.id)}
                    className="text-sm font-medium text-gauri-aged-brass hover:text-gauri-deep-gold hover:underline transition-colors"
                  >
                    {item.category.name}
                  </button>
                ))}
            </div>
          )}

          <div className="view-more-btn">
            <Link href={seeMoreUrl} passHref>
              <a rel="noopener noreferrer">
                <div className="flex space-x-1 items-center cursor-pointer group">
                  <p className="text-[11px] font-semibold tracking-[0.15em] text-gauri-aged-brass group-hover:text-gauri-deep-gold uppercase transition-colors">
                    {langCntnt && langCntnt.View_More}
                  </p>
                  <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300 text-gauri-aged-brass group-hover:text-gauri-deep-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" className="fill-current">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
                    </svg>
                  </span>
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className="section-content">{children && children}</div>
      </div>
    </div>
  );
}
