import { useState, useEffect } from "react";
import Router from "~/router";
import { Header } from "~/components/_common/organisms/Header";
import Loading from "~/components/_common/templates/Loading";
import { ToastProvider } from '~/context/ToastContext'; // Ajuste o caminho conforme necessário


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      
      {loading ? (
        <Loading />
      ) : (
        <>
          <ToastProvider>
          <Header>
            <h1>Caju Front Teste</h1>
          </Header>
          <Router />
          </ToastProvider>
        </>
      )}
    </>
  );
}

export default App;
