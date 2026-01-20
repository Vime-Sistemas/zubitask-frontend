import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowRight, Command, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const signInSchema = z.object({
  email: z.string().email({ message: "E-mail inválido." }),
  password: z.string().min(1, { message: "Digite sua senha." }),
});

type SignInFormValues = z.infer<typeof signInSchema>;

interface SignInProps {
  onNavigate: () => void;
}

export default function SignIn({ onNavigate }: SignInProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignInFormValues) {
    setIsLoading(true);
    // Simulação de login
    setTimeout(() => {
      console.log("Login payload:", data);
      setIsLoading(false);
    }, 2000);
  }

  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2 overflow-hidden bg-background">
      {/* COLUNA ESQUERDA: Imagem Imersiva (Visual Gravity) */}
      <div className="hidden lg:flex flex-col justify-between relative bg-zinc-900 text-white p-10">
        <div className="absolute inset-0 z-0">
          {/* Imagem diferente do Sign Up - mais sóbria/noturna */}
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
            alt="Skyscraper at night"
            className="w-full h-full object-cover opacity-30 mix-blend-hard-light grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-900/20 to-zinc-950/30" />
        </div>

        <div className="relative z-10 flex items-center gap-2 text-lg font-bold tracking-tight animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="bg-white text-black p-1 rounded-sm">
            <Command size={18} />
          </div>
          <span>Vime Sistemas</span>
        </div>

        <div className="relative z-10 max-w-md">
          <blockquote className="space-y-2">
            <p className="text-2xl font-medium leading-normal animate-in slide-in-from-bottom-4 duration-1000">
              "Efficiency is doing things right; effectiveness is doing the
              right things."
            </p>
            <footer className="text-sm text-zinc-400 animate-in slide-in-from-bottom-5 duration-1000 delay-150">
              &mdash; Peter Drucker
            </footer>
          </blockquote>
        </div>
      </div>

      {/* COLUNA DIREITA: O Formulário */}
      <div className="flex items-center justify-center p-8 relative">
        <div className="mx-auto w-full max-w-[380px] flex flex-col justify-center space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="flex flex-col space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tighter">
              Bem-vindo de volta
            </h1>
            <p className="text-muted-foreground text-sm">
              Insira suas credenciais para acessar o dashboard.
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="nome@vime.com"
                className="h-11 bg-zinc-50/50 dark:bg-zinc-900/50"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>

                {/* DRAWER para "Esqueci a Senha" */}
                <Drawer>
                  <DrawerTrigger asChild>
                    <button
                      type="button"
                      className="text-xs text-primary font-medium hover:underline"
                    >
                      Esqueceu a senha?
                    </button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                      <DrawerHeader>
                        <DrawerTitle className="flex items-center gap-2">
                          <Lock className="w-4 h-4" /> Recuperação de Acesso
                        </DrawerTitle>
                        <DrawerDescription>
                          Informe seu e-mail corporativo. Enviaremos um link
                          mágico para redefinição.
                        </DrawerDescription>
                      </DrawerHeader>
                      <div className="p-4 space-y-4">
                        <Input placeholder="seu@email.com" className="h-11" />
                        <Button className="w-full">
                          Enviar Link de Recuperação
                        </Button>
                      </div>
                      <DrawerFooter>
                        <DrawerClose asChild>
                          <Button variant="ghost">Cancelar</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>

              <Input
                id="password"
                type="password"
                className="h-11 bg-zinc-50/50 dark:bg-zinc-900/50"
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-base group mt-2"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Entrar
              {!isLoading && (
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </Button>
          </form>

          {/* Divisor */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Novo por aqui?
              </span>
            </div>
          </div>

          {/* Botão de Toggle para Sign Up */}
          <Button
            variant="outline"
            className="w-full h-11"
            type="button"
            onClick={onNavigate}
          >
            Criar uma conta
          </Button>
        </div>
      </div>
    </div>
  );
}
