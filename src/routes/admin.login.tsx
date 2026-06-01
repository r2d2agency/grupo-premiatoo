import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { login, register } from "@/lib/api";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      if (isRegister) {
        await register(email, password, name);
      } else {
        await login(email, password);
      }
      navigate({ to: "/admin" });
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-background rounded-md p-8 shadow-md space-y-4"
      >
        <h1 className="font-display text-2xl text-navy">
          {isRegister ? "Criar Conta" : "Painel Premiatto"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isRegister ? "Crie seu acesso administrativo." : "Acesse o CMS para editar o conteúdo do site."}
        </p>
        {isRegister && (
          <div>
            <label className="text-xs font-medium">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border border-input rounded-sm px-3 py-2 text-sm"
              required
            />
          </div>
        )}
        <div>
          <label className="text-xs font-medium">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border border-input rounded-sm px-3 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="text-xs font-medium">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border border-input rounded-sm px-3 py-2 text-sm"
            required
          />
        </div>
        {err && <div className="text-xs text-destructive">{err}</div>}
        <button
          disabled={loading}
          className="w-full bg-brand-blue text-brand-blue-foreground py-2.5 rounded-sm text-sm font-semibold tracking-wider disabled:opacity-60"
        >
          {loading ? "Processando..." : (isRegister ? "CRIAR CONTA" : "ENTRAR")}
        </button>
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-brand-blue hover:underline"
          >
            {isRegister ? "Já tenho uma conta? Entrar" : "Não tem conta? Criar conta"}
          </button>
        </div>
      </form>
    </div>
  );
}
