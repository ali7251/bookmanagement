import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'; // Si tu utilises encore Tailwind ou d'autres styles globaux

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp;
