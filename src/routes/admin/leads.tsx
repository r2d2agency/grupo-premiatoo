import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { getToken, getLeads, updateLead, deleteLead, type Lead } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2, Trash2, Eye, Users } from "lucide-react";

export const Route = createFileRoute("/admin/leads")({ component: LeadsPage });

const STATUSES = [
  { value: "novo", label: "Novo", color: "bg-blue-500" },
  { value: "em_contato", label: "Em contato", color: "bg-amber-500" },
  { value: "qualificado", label: "Qualificado", color: "bg-purple-500" },
  { value: "ganho", label: "Ganho", color: "bg-emerald-500" },
  { value: "perdido", label: "Perdido", color: "bg-red-500" },
];

function LeadsPage() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [notes, setNotes] = useState("");

  useEffect(() => { if (!getToken()) navigate({ to: "/admin/login" }); }, [navigate]);

  const load = async () => {
    setLoading(true);
    try { setLeads(await getLeads()); }
    catch { toast.error("Erro ao carregar leads"); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const filtered = useMemo(
    () => filter === "all" ? leads : leads.filter(l => l.status === filter),
    [leads, filter]
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: leads.length };
    STATUSES.forEach(s => c[s.value] = leads.filter(l => l.status === s.value).length);
    return c;
  }, [leads]);

  async function changeStatus(lead: Lead, status: string) {
    try {
      await updateLead(lead.id, { status });
      toast.success("Status atualizado");
      load();
    } catch { toast.error("Erro ao atualizar"); }
  }

  async function saveNotes() {
    if (!selected) return;
    try {
      await updateLead(selected.id, { notes });
      toast.success("Anotações salvas");
      setSelected(null);
      load();
    } catch { toast.error("Erro ao salvar"); }
  }

  async function remove(id: string) {
    if (!confirm("Excluir lead?")) return;
    try { await deleteLead(id); toast.success("Excluído"); load(); }
    catch { toast.error("Erro ao excluir"); }
  }

  return (
    <AdminLayout title="Leads (CRM)">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
            Todos ({counts.all})
          </Button>
          {STATUSES.map(s => (
            <Button key={s.value} size="sm" variant={filter === s.value ? "default" : "outline"} onClick={() => setFilter(s.value)}>
              <span className={`inline-block w-2 h-2 rounded-full mr-2 ${s.color}`} />
              {s.label} ({counts[s.value] || 0})
            </Button>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" /> Leads capturados</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center p-8"><Loader2 className="animate-spin w-6 h-6" /></div>
            ) : (
              <div className="border rounded-md overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-3 text-left font-medium">Data</th>
                      <th className="p-3 text-left font-medium">Nome</th>
                      <th className="p-3 text-left font-medium">Contato</th>
                      <th className="p-3 text-left font-medium">Empresa</th>
                      <th className="p-3 text-left font-medium">Origem</th>
                      <th className="p-3 text-left font-medium">Status</th>
                      <th className="p-3 text-right font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(l => (
                      <tr key={l.id} className="border-b last:border-0">
                        <td className="p-3 whitespace-nowrap">{new Date(l.createdAt).toLocaleDateString("pt-BR")}</td>
                        <td className="p-3 font-medium">{l.nome}</td>
                        <td className="p-3 text-xs">
                          <div>{l.email}</div>
                          <div className="text-muted-foreground">{l.whatsapp}</div>
                        </td>
                        <td className="p-3">{l.empresa || "-"}</td>
                        <td className="p-3 text-xs text-muted-foreground">{l.source}</td>
                        <td className="p-3">
                          <Select value={l.status} onValueChange={(v) => changeStatus(l, v)}>
                            <SelectTrigger className="h-8 w-36"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {STATUSES.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="p-3 text-right">
                          <Button size="icon" variant="ghost" onClick={() => { setSelected(l); setNotes(l.notes || ""); }}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => remove(l.id)} className="text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">Nenhum lead.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Detalhes do lead</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Nome" value={selected.nome} />
                <Field label="Empresa" value={selected.empresa} />
                <Field label="E-mail" value={selected.email} />
                <Field label="WhatsApp" value={selected.whatsapp} />
                <Field label="Cidade" value={selected.cidade} />
                <Field label="Estado" value={selected.estado} />
                <Field label="Origem" value={selected.source} />
                <Field label="Status" value={selected.status} />
              </div>
              {selected.mensagem && <Field label="Mensagem" value={selected.mensagem} />}
              <div>
                <label className="text-xs font-medium text-muted-foreground">Anotações internas</label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelected(null)}>Fechar</Button>
            <Button onClick={saveNotes}>Salvar anotações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <div className="text-sm">{value || "-"}</div>
    </div>
  );
}
