import { useState } from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export type AuthRoute = "signin" | "signup";

function App() {
  const [route, setRoute] = useState<AuthRoute>("signin");

  function toggleRoute() {
    setRoute((prev) => (prev === "signin" ? "signup" : "signin"));
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Passamos a função de toggle para os componentes
        para que o botão de troca fique dentro do design
      */}
      {route === "signin" ? (
        <SignIn onNavigate={toggleRoute} />
      ) : (
        <SignUp onNavigate={toggleRoute} />
      )}
    </main>
  );
}

export default App;
