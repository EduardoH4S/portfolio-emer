import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] } }
  };
  
  return (
    <header className="header">
      <Link href="/" legacyBehavior>
        <a className="logo">Émerson Stoffel</a>
      </Link>
      
      <button 
        className="menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        Menu
      </button>
      
      <AnimatePresence>
        {menuOpen && (
          <motion.nav 
            className="menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ul>
              <li>
                <Link href="/motion" legacyBehavior>
                  <a>Portfólio</a>
                </Link>
              </li>
              <li>
                <Link href="/stills" legacyBehavior>
                  <a>Skills</a>
                </Link>
              </li>
              <li>
                <Link href="/about" legacyBehavior>
                  <a>Sobre mim</a>
                </Link>
              </li>
              <li>
                <Link href="/contact" legacyBehavior>
                  <a>Contato</a>
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
