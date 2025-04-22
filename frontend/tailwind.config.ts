import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'slideUp': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 20s ease-in-out infinite',
        'float-slow': 'float 40s ease-in-out infinite',
        'rain': 'rain 1s linear infinite',
        'snow': 'snow 10s linear infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'lightning': 'lightning 10s ease-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-10px) translateX(20px)' },
        },
        rain: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '40%': { opacity: '0.5' },
          '100%': { transform: 'translateY(100px)', opacity: '0' },
        },
        snow: {
          '0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: '0.8' },
          '100%': { transform: 'translateY(100px) rotate(360deg)', opacity: '0' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        lightning: {
          '0%, 9%, 11%, 100%': { opacity: '0' },
          '10%': { opacity: '0.6', backgroundColor: 'white' },
          '10.1%': { opacity: '0' },
          '20%': { opacity: '0' },
          '20.1%': { opacity: '0.2', backgroundColor: 'white' },
          '20.2%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [require("rippleui")],
};
export default config;