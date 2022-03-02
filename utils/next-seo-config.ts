const title = 'Semana do violino - Raone Moura'
const description = 'Junte-se ao grupo no whatsapp da semana do violino!'

const SEO = {
  title, 
  description,
  canonical: 'https://semanadoviolino.raonemoura.com.br/',
  openGraph: {
    type: 'website',
    locale: 'pt_Br',
    url: 'https://semanadoviolino.raonemoura.com.br/',
    title,
    description,
    images: [
      {
        url: `https://semanadoviolino.raonemoura.com.br/og.jpg`,
        alt: title,
        width: 1280,
        height: 720
      }
    ]
  }
}

export default SEO