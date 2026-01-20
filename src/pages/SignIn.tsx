import { type FormEvent, useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Github,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const gradients = [
  "from-purple-600/20 via-fuchsia-500/10 to-blue-500/20",
  "from-amber-500/20 via-orange-500/10 to-rose-500/20",
  "from-emerald-500/20 via-teal-400/10 to-cyan-500/20",
];

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const bgGradient = useMemo(() => {
    const index = Math.floor(Math.random() * gradients.length);
    return gradients[index];
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage("Login efetuado! Redirecionando para seu workspace...");
    }, 900);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className={`absolute inset-10 blur-3xl rounded-full bg-gradient-to-r ${bgGradient}`}
          aria-hidden
        />
      </div>

      <div className="w-full max-w-5xl bg-card/70 backdrop-blur-xl border border-border/70 shadow-2xl rounded-3xl grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] overflow-hidden">
        <section className="relative p-8 sm:p-10 lg:p-12 flex flex-col justify-between gap-8">
          <header className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-primary text-primary-foreground grid place-items-center font-semibold text-xl">
              ZT
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-[0.18em]">
                ZubiTask
              </p>
              <h1 className="text-2xl sm:text-3xl font-semibold">
                Incident OS para times modernos
              </h1>
            </div>
          </header>

          <div className="space-y-5">
            <Feature
              icon={<ShieldCheck className="h-5 w-5 text-primary" />}
              title="Segurança e governança"
              description="SSO, trilha de auditoria e versionamento de incidentes para compliance sem fricção."
            />
            <Feature
              icon={<Sparkles className="h-5 w-5 text-primary" />}
              title="LLMs prontos para incidentes"
              description="Relatórios automáticos, timelines inteligentes e priorização de severidade em minutos."
            />
            <Feature
              icon={<Mail className="h-5 w-5 text-primary" />}
              title="Alertas e comunicação"
              description="Notifique times, clientes e liderança com mensagens consistentes e acionáveis."
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Precisa de conta nova?{" "}
            <a className="text-primary font-semibold" href="/signup">
              Crie uma agora
            </a>
            .
          </p>
        </section>

        <section className="bg-card border-l border-border/60 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-[0.18em]">
              Acesse sua conta
            </p>
            <h2 className="text-2xl font-semibold">Sign-in</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Entre para continuar gerenciando incidentes com seu time.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Field
              label="Email de trabalho"
              name="email"
              type="email"
              placeholder="ana@empresa.com"
              required
              icon={<Mail className="h-4 w-4 text-muted-foreground" />}
            />

            <Field
              label="Senha"
              name="password"
              type="password"
              placeholder="Digite sua senha"
              required
              icon={<Lock className="h-4 w-4 text-muted-foreground" />}
            />

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 accent-primary" />
                Lembrar de mim
              </label>
              <a className="text-primary font-semibold" href="/forgot-password">
                Esqueci a senha
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-primary text-primary-foreground px-4 py-3 text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? "Entrando..." : "Entrar"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>

            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-border/80 bg-secondary/40 px-4 py-3 text-sm font-semibold hover:bg-secondary/60 transition-colors"
            >
              <Github className="h-4 w-4" />
              Continuar com GitHub
            </button>

            {message && (
              <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                {message}
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  icon?: ReactNode;
};

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required,
  icon,
}: FieldProps) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium">
      <span className="text-foreground">{label}</span>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            {icon}
          </span>
        )}
        <input
          className="w-full rounded-xl border border-border/80 bg-card/60 px-3 py-3 text-sm placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          style={icon ? { paddingLeft: "2.5rem" } : undefined}
        />
      </div>
    </label>
  );
}

type FeatureProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-10 w-10 rounded-xl bg-secondary/60 border border-border/80 grid place-items-center">
        {icon}
      </div>
      <div>
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
