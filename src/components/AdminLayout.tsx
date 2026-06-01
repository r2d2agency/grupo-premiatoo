import { ReactNode } from "react";
import { AdminSidebar } from "./AdminSidebar";

export function AdminLayout({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <header className="bg-white border-b px-8 py-4 flex items-center justify-between sticky top-0 z-40">
          <h2 className="text-xl font-semibold text-navy">{title || "Painel de Controle"}</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Administrador</span>
            <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold">
              AD
            </div>
          </div>
        </header>
        <main className="p-8 max-w-6xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
