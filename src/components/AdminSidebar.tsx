import { Link, useLocation } from "@tanstack/react-router";
import { 
  LayoutDashboard, 
  Users, 
  Palette, 
  Layers, 
  LogOut, 
  Globe,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { clearToken } from "@/lib/api";
import { useNavigate } from "@tanstack/react-router";

const menuItems = [
  { icon: LayoutDashboard, label: "Conteúdo", path: "/admin" },
  { icon: Settings, label: "Menu & Navegação", path: "/admin/navigation" },
  { icon: Users, label: "Usuários", path: "/admin/users" },
  { icon: Palette, label: "Branding", path: "/admin/branding" },
  { icon: Layers, label: "Módulos", path: "/admin/modules" },
];

export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="w-64 bg-navy text-white h-screen flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6">
        <h1 className="text-xl font-display font-bold tracking-tight">Premiatto <span className="text-gold">CMS</span></h1>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                isActive 
                  ? "bg-gold text-navy font-medium" 
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-1">
        <div className="px-3 py-2 mb-2 text-[10px] uppercase tracking-widest text-white/40">
          Desenvolvido por Thiago Nicodemos
        </div>
        <Link 
          to="/" 
          className="flex items-center gap-3 px-3 py-2 rounded-md text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Globe className="w-5 h-5" />
          Ver Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sair
        </button>
      </div>
    </div>
  );
}
