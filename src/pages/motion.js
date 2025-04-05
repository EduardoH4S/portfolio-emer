import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Header from '../components/Header';
import VideoCarousel from '../components/VideoCarousel';

// Dados dos vídeos
const videos = [
  {
    id: "17-RiK_yGhK0X10QgmRT6pWskjIvndhLk",
    title: "S C H U T Z",
    year: "xxxx"
  },
  {
    id: "1fsaOHuTbhQWIBRpkoQWw3tyyLwdRMxWx",
    title: "G R U P O     H E R V A L",
    year: "XXXXX"
  },
  {
    id: "1wGH2WWqRxJzg0daAYACGbtVPXOxioDam",
    title: "P E G A D A",
    year: "xxxx"
  },
  {
    id: "1xEg6A_GknfbJ2YJUPkCZeKfsqoKFC1rX",
    title: "P E G A D A ²",
    year: "xxxx"
  },
  {
    id: "15FlPZbvWdWZ5XG5XyMJfQV3k_-4BFoBW",
    title: "P E G A D A    N I T R O   P",
    year: "xxxx"
  },
  {
    id: "1b6z1IAxLpf6wGFhDQICWkxB_HfkayRP4",
    title: "W O R K",
    year: "xxxxx"
  }
];

export default function MotionPage() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simular carregamento da página
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);
  
  // Variantes para animações de página
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } },
    exit: { opacity: 0, transition: { duration: 0.4 } }
  };
  
  const titleVariants = {
    initial: { y: 40, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        delay: 0.3, 
        duration: 0.9, 
        ease: [0.19, 1, 0.22, 1] 
      } 
    }
  };
  
  return (
    <>
      <Head>
        <title>Émerson Stoffel | Portfólio</title>
        <meta name="description" content="WORK PROJECTS PORTFOLIO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <AnimatePresence>
        {loading && (
          <motion.div
            className="page-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
      
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate={loading ? "initial" : "animate"}
        exit="exit"
        className="container"
      >
        <Header />
        <main className="main">
          <motion.h1
            className="page-title"
            variants={titleVariants}
            initial="initial"
            animate={loading ? "initial" : "animate"}
          >
            <span className="italic">PORTFOLIO</span>
          </motion.h1>
          <VideoCarousel videos={videos} />
        </main>
      </motion.div>
    </>
  );
}
