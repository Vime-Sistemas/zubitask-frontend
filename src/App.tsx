import { useState } from "react";
import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

type Route = "signin" | "signup";

function App() {
  const [route, setRoute] = useState<Route>("signin");

  const isSignIn = route === "signin";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="w-full border-b border-border/60 bg-card/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground grid place-items-center font-semibold">
              ZT
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em]">
                ZubiTask
              </p>
              <p className="text-sm text-muted-foreground">
                Incident OS para times modernos
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-2 text-sm font-semibold">
            <button
              className={`rounded-xl px-3 py-2 transition ${
                isSignIn
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setRoute("signin")}
              type="button"
            >
              Entrar
            </button>
            <button
              className={`rounded-xl px-3 py-2 transition ${
                !isSignIn
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setRoute("signup")}
              type="button"
            >
              Criar conta
            </button>
          </nav>
        </div>
      </header>

      <main className="relative">{isSignIn ? <SignIn /> : <SignUp />}</main>
    </div>
  );
}

export default App;
