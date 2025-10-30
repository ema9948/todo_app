import React from "react";

export default function Footer() {
  return (
    <footer className="text-center text-gray-500 text-sm py-4">
      <p>
        &copy; {new Date().getFullYear()} Cristian Albornoz. Proyecto disponible
        en{" "}
        <a
          href="https://github.com/ema9948"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}
