import React, { useState, useEffect } from "react";
import Router from "~/router";
import { Header } from "~/components/_common/organisms/Header";
import Loading from "~/components/_common/templates/Loading";

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
          <Header>
            <h1>Caju Front Teste</h1>
          </Header>
          <Router />
        </>
      )}
    </>
  );
}

export default App;
