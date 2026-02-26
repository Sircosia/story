import Head from 'next/head'
import dynamic from 'next/dynamic'

// Dynamic import to avoid SSR issues with browser APIs (speechSynthesis, localStorage)
const StoryMagic = dynamic(() => import('../components/StoryMagic'), { ssr: false })

export default function Home() {
  return (
    <>
      <Head>
        <title>Sircosia - Magical AI Stories for Kids</title>
        <meta name="description" content="Create safe, fun, AI-powered stories for children aged 3-12. Choose a world, pick characters, and let AI craft a unique story in English or French." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📖</text></svg>" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Sircosia - Magical AI Stories for Kids" />
        <meta property="og:description" content="Safe, fun, AI-powered stories crafted for your little ones. English & French." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sircosia.com" />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <StoryMagic />
    </>
  )
}
