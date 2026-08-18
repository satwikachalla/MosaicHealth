import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Activity, Brain, FileText, Home, Pill, TrendingUp, Upload, Heart, LogOut } from "lucide-react";
import { cn } from "@/lib/utils.ts";

const navItems = [
  { label: "Dashboard", icon: Home, path: "/dashboard" },
  { label: "Upload Records", icon: Upload, path: "/dashboard/upload" },
  { label: "Health Timeline", icon: Activity, path: "/dashboard/timeline" },
  { label: "Clinical Insights", icon: Brain, path: "/dashboard/insights" },
  { label: "Disease Progress", icon: TrendingUp, path: "/dashboard/disease-progress" },
  { label: "Medication Analysis", icon: Pill, path: "/dashboard/medication" },
  { label: "Doctor Summary", icon: FileText, path: "/dashboard/doctor-summary" },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col border-r border-border bg-sidebar">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <Heart className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <div className="text-sm font-bold text-foreground">Mosaic Health</div>
            <div className="text-xs text-muted-foreground">AI Healthcare Platform</div>
          </div>
        </div>

        {/* Patient Info */}
        <div className="px-4 py-4 border-b border-border">
          <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-primary/10">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
              JS
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground">Jane Smith</div>
              <div className="text-xs text-muted-foreground">DOB: 15 Mar 1985</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer",
                  isActive
                    ? "bg-primary/15 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-border">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-background/80 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center gap-2 md:hidden">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <Heart className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold text-foreground">Mosaic Health</span>
          </div>
          <div className="hidden md:block">
            <h1 className="text-sm text-muted-foreground">
              Welcome back, <span className="text-foreground font-medium">Dr. Sarah Chen</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              AI Engine Active
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
              Dr
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 flex justify-around border-t border-border bg-background md:hidden z-50">
        {navItems.slice(0, 5).map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center gap-1 py-3 px-2 text-xs cursor-pointer flex-1",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              <span className="hidden">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
