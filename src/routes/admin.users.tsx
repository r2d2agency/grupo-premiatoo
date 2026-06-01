import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getToken } from "@/lib/api";
import { AdminLayout } from "@/components/AdminLayout";
import { UserManagement } from "@/components/UserManagement";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsersPage,
});

function AdminUsersPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate({ to: "/admin/login" });
    }
  }, [navigate]);

  return (
    <AdminLayout title="Gestão de Usuários">
      <UserManagement />
    </AdminLayout>
  );
}
