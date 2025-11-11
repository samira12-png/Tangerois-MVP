import React from 'react';

export default function Footer() {
  return (
    <footer className="text-center py-3 mt-5 border-top bg-white">
      <p className="mb-0 text-muted">© {new Date().getFullYear()} <strong className="text-danger">Tangerois</strong> - Tous droits réservés.</p>
    </footer>
  );
}
