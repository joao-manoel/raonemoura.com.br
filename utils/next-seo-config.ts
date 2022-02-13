const title = 'Semana do violino - Raone Moura'
const description = 'Junte-se ao telegram da semana do violino!'

const SEO = {
  title, 
  description,
  canonical: 'https://telegram-raone.vercel.app',
  openGraph: {
    type: 'website',
    locale: 'pt_Br',
    url: 'https://telegram-raone.vercel.app/',
    title,
    description,
    images: [
      {
        url: `https://telegram-raone.vercel.app/og.jpg`,
        alt: title,
        width: 1280,
        height: 720
      }
    ]
  }
}

export default SEO