const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */

export const content = [
  './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  flowbite.content(),
  './src/**/*.{js,ts,jsx,tsx,mdx}',
];
export const theme = {
  extend: {},
};
export const plugins = [
  flowbite.plugin(),
];