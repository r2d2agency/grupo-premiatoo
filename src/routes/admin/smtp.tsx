import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { getToken, getSmtpConfig, saveSmtpConfig, testSmtpConfig, type SmtpConfig } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Mail, Send } from "lucide-react";

export const Route = createFileRoute("/admin/smtp")({ component: SmtpPage });

function SmtpPage() {
  const navigate = useNavigate();
  const [cfg, setCfg] = useState<SmtpConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testTo, setTestTo] = useState("");
  const [testing, setTesting] = useState(false);

  useEffect(() => { if (!getToken()) navigate({ to: "/admin/login" }); }, [navigate]);

  useEffect(() => {
    getSmtpConfig()
      .then(setCfg)
      .catch(() => toast.error("Erro ao carregar SMTP"))
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    if (!cfg) return;
    setSaving(true);
    try {
      await saveSmtpConfig(cfg);
      toast.success("SMTP salvo");
      const fresh = await getSmtpConfig();
      setCfg(fresh);
    } catch (e: any) { toast.error(e.message); }
    finally { setSaving(false); }
  }

  async function sendTest() {
    if (!testTo) return toast.error("Informe um destinatário");
    setTesting(true);
    try {
      await testSmtpConfig(testTo);
      toast.success("E-mail de teste enviado");
    } catch (e: any) { toast.error(e.message); }
    finally { setTesting(false); }
  }

  if (loading || !cfg) {
    return <AdminLayout title="SMTP & Notificações"><div className="flex justify-center p-12"><Loader2 className="animate-spin w-6 h-6" /></div></AdminLayout>;
  }

  const set = (k: keyof SmtpConfig, v: any) => setCfg({ ...cfg, [k]: v });

  return (
    <AdminLayout title="SMTP & Notificações de Leads">
      <div className="space-y-6 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Mail className="w-5 h-5" /> Servidor SMTP</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Switch checked={cfg.enabled} onCheckedChange={(v) => set("enabled", v)} id="enabled" />
              <Label htmlFor="enabled">Enviar e-mails automaticamente quando um lead se cadastrar</Label>
            </div>

            <div className="grid md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <Label>Host SMTP</Label>
                <Input value={cfg.host} onChange={(e) => set("host", e.target.value)} placeholder="smtp.gmail.com" />
              </div>
              <div>
                <Label>Porta</Label>
                <Input type="number" value={cfg.port} onChange={(e) => set("port", Number(e.target.value))} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Switch checked={cfg.secure} onCheckedChange={(v) => set("secure", v)} id="secure" />
              <Label htmlFor="secure">Conexão segura (SSL/TLS) — use com porta 465</Label>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <Label>Usuário</Label>
                <Input value={cfg.username} onChange={(e) => set("username", e.target.value)} />
              </div>
              <div>
                <Label>Senha</Label>
                <Input type="password" value={cfg.password} onChange={(e) => set("password", e.target.value)} placeholder={cfg.password ? "" : "Digite para alterar"} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <Label>E-mail remetente (From)</Label>
                <Input value={cfg.fromEmail} onChange={(e) => set("fromEmail", e.target.value)} placeholder="no-reply@seudominio.com" />
              </div>
              <div>
                <Label>Nome remetente</Label>
                <Input value={cfg.fromName} onChange={(e) => set("fromName", e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Notificação de Leads</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Destinatários (separe por vírgula)</Label>
              <Textarea value={cfg.recipients} onChange={(e) => set("recipients", e.target.value)} rows={2} placeholder="comercial@empresa.com, vendas@empresa.com" />
            </div>
            <div>
              <Label>Assunto do e-mail</Label>
              <Input value={cfg.subject} onChange={(e) => set("subject", e.target.value)} />
              <p className="text-xs text-muted-foreground mt-1">Variáveis: {"{{nome}}"}, {"{{email}}"}, {"{{empresa}}"}, {"{{source}}"}</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button onClick={save} disabled={saving}>{saving ? "Salvando..." : "Salvar configuração"}</Button>
        </div>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Send className="w-5 h-5" /> Testar envio</CardTitle></CardHeader>
          <CardContent className="flex gap-3 items-end">
            <div className="flex-1">
              <Label>Enviar teste para</Label>
              <Input value={testTo} onChange={(e) => setTestTo(e.target.value)} placeholder="seu@email.com" />
            </div>
            <Button onClick={sendTest} disabled={testing} variant="secondary">{testing ? "Enviando..." : "Enviar teste"}</Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
