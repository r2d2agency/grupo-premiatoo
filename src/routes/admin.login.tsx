import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { login } from "@/lib/api";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@premiatto.com");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      if (isRegister) {
22:         await register(email, password, name);
23:       } else {
24:         await login(email, password);
25:       }
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
        <h1 className="font-display text-2xl text-navy">Painel Premiatto</h1>
        <p className="text-sm text-muted-foreground">Acesse o CMS para editar o conteúdo do site.</p>
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
          {loading ? "Entrando..." : "ENTRAR"}
        </button>
      </form>
    </div>
  );
}
