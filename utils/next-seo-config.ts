const title = 'Semana do violino - Raone Moura'
const description = 'Junte-se ao grupo no whatsapp da semana do violino!'

const SEO = {
  title, 
  description,
  canonical: 'https://raonemoura.com.br/',
  openGraph: {
    type: 'website',
    locale: 'pt_Br',
    url: 'git c',
    title,
    description,
    images: [
      {
        url: `https://raonemoura.com.br/og.jpg`,
        alt: title,
        width: 1280,
        height: 720
      }
    ]
  }
}

export default SEO