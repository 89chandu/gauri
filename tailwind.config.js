function withOpacity(variableName){
  return ({opacityValue})=>{
    if(opacityValue!==undefined){
      return `rgba(var(${variableName}), ${opacityValue})`
    }else{
      return `rgb(var(${variableName}))`
    }
  }

}
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primarygray: "#F5EFE0",       /* gauri-warm-cream — page bg */
        qblack: "#3D2B0F",            /* gauri-rich-umber — headings/text */
        qpurple: 'rgb(var(--primary-color))',   /* → gauri-deep-gold */
        qpurplelow: withOpacity('--primary-color'),
        qyellow: 'rgb(var(--secondary-color))', /* → gauri-pale-ivory */
        qred: "#EF262C",
        qgray: "#9A7040",             /* gauri-aged-brass — secondary text */
        qgraytwo: "#C9A96E",          /* gauri-gold-leaf */
        "qblue-white": "#E8D5B0",    /* gauri-pale-ivory */
        "qh2-green": "#6B4C1E",      /* gauri-deep-gold */
        "gauri-deep-gold": "#6B4C1E",
        "gauri-aged-brass": "#9A7040",
        "gauri-gold-leaf": "#C9A96E",
        "gauri-pale-ivory": "#E8D5B0",
        "gauri-warm-cream": "#F5EFE0",
        "gauri-cream-dark": "#EDE3CC",
        "gauri-rich-umber": "#3D2B0F",
        "gauri-warm-white": "#FAF6EE",
      },
      scale: {
        60: "0.6",
      },
    },
  },
  variants: {
    extend: {
      textColor: ["focus-within"],
      borderColor: ["last"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
