import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.css'

import Layout from '../components/layout';


export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || defaultLayout

  return getLayout(<Component {...pageProps} />)
}

function defaultLayout(page) {
  return <Layout>{page}</Layout>
}