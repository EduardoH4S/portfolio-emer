import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Header from '../components/Header';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Opcionalmente redirecionar para a página Motion após alguns segundos
    // const timer = setTimeout(() => {
    //   router.push('/motion');
    // }, 3000);
    // return () => clearTimeout(timer);
  }, [router]);
  
  return (
    <>
      <Head>
        <title>Émerson Stoffel | Portfolio</title>
        <meta name="description" content="Portfolio de Émerson Stoffel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container"
      >
        <Header />
        <main className="main">
          <motion.h1
            className="page-title"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Émerson <span className="italic">Stoffel</span>
          </motion.h1>
        </main>
      </motion.div>
    </>
  );
}
