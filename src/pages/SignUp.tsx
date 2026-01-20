import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowRight, Command } from "lucide-react";

// shadcn/ui imports (assuming these are in your components/ui folder)
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

// 1. Zod Schema for robust validation
const signUpSchema = z.object({
  email: z.string().email({ message: "E-mail inválido." }),
  password: z.string().min(8, { message: "Mínimo de 8 caracteres." }),
  name: z.string().min(2, { message: "Nome muito curto." }),
});

interface SignUpProps {
  onNavigate: () => void;
}

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUp({ onNavigate }: SignUpProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignUpFormValues) {
    setIsLoading(true);
    // Simulate API call to your Golang backend
    setTimeout(() => {
      console.log("Payload para o backend:", data);
      setIsLoading(false);
    }, 2000);
  }

  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2 overflow-hidden bg-background">
      {/* LEFT COLUMN: The "Ousadia" Visual (Desktop) */}
      <div className="hidden lg:flex flex-col justify-between relative bg-zinc-900 text-white p-10">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
            alt="Abstract Architecture"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/40 to-transparent" />
        </div>

        {/* Branding */}
        <div className="relative z-10 flex items-center gap-2 text-lg font-bold tracking-tight">
          <div className="bg-white text-black p-1 rounded-sm">
            <Command size={18} />
          </div>
          <span>Vime Sistemas</span>
        </div>

        {/* The Quote / Social Proof */}
        <div className="relative z-10 max-w-md">
          <blockquote className="space-y-2">
            <p className="text-2xl font-medium leading-normal animate-in slide-in-from-bottom-4 duration-1000">
              "Software is the new architecture. We build the foundations for
              the future of insurance."
            </p>
            <footer className="text-sm text-zinc-400 animate-in slide-in-from-bottom-5 duration-1000 delay-150">
              &mdash; Internal Manifesto
            </footer>
          </blockquote>
        </div>
      </div>

      {/* RIGHT COLUMN: The Form */}
      <div className="flex items-center justify-center p-8 relative">
        <div className="mx-auto w-full max-w-[400px] flex flex-col justify-center space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="flex flex-col space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tighter">
              Crie sua conta
            </h1>
            <p className="text-muted-foreground text-sm">
              Entre com seus dados para acessar o ecossistema.
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                placeholder="Ex: João da Silva"
                className="h-11 bg-zinc-50/50 dark:bg-zinc-900/50"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-xs text-red-500 font-medium">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail corporativo</Label>
              <Input
                id="email"
                type="email"
                placeholder="nome@empresa.com"
                className="h-11 bg-zinc-50/50 dark:bg-zinc-900/50"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-xs text-red-500 font-medium">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                className="h-11 bg-zinc-50/50 dark:bg-zinc-900/50"
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p className="text-xs text-red-500 font-medium">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-base group"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Começar agora
              {!isLoading && (
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </Button>
          </form>

          {/* Social / Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Já tem acesso?
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            className="w-full h-11 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            type="button"
            onClick={onNavigate}
          >
            Fazer Login
          </Button>

          {/* THE DRAWER INTEGRATION */}
          <div className="pt-4 text-center">
            <Drawer>
              <DrawerTrigger asChild>
                <button className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4 transition-colors">
                  Termos de uso e Privacidade
                </button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>Termos de Uso</DrawerTitle>
                    <DrawerDescription>
                      Ao criar uma conta na Vime Sistemas, você concorda com
                      nossa política de processamento de dados.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 pb-0 text-sm text-muted-foreground space-y-2">
                    <p>1. Seus dados são criptografados.</p>
                    <p>2. Não compartilhamos informações com terceiros.</p>
                    <p>3. Acesso sujeito a aprovação administrativa.</p>
                  </div>
                  <DrawerFooter>
                    <Button>Entendi</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Fechar</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
}
