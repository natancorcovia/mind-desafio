"use client";

import { useRouter, usePathname } from "next/navigation";
import { Trash2, X } from "lucide-react";
import { useState } from "react";

function ConfirmModal({
  onConfirm,
  onCancel,
  loading,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-[#131619] border border-[#1e2328] rounded-lg p-6 w-full max-w-sm shadow-2xl">
        <h3 className="text-base font-bold text-white mb-2">Excluir Artigo</h3>
        <p className="text-sm text-white/50 leading-relaxed mb-6">
          Tem certeza que deseja excluir este artigo? Esta ação não pode ser
          desfeita.
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="cursor-pointer flex-1 py-2 border border-[#1e2328] text-white text-sm rounded hover:bg-[#1a1f24] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="cursor-pointer flex-1 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {loading ? "Excluindo..." : "Excluir"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DeleteButton({ articleId }: { articleId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  async function handleConfirm() {
    setLoading(true);
    await fetch(`/api/articles/${articleId}`, { method: "DELETE" });
    const redirectTo = pathname.includes("/dashboard") ? "/dashboard" : "/";
    router.push(redirectTo);
    router.refresh();
  }

  const isDashboard = pathname.includes("/dashboard");

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={
          isDashboard
            ? "inline-flex items-center gap-1.5 text-xs border border-red-400/20 text-red-400 px-3 py-1.5 rounded hover:bg-red-400/10 transition-colors cursor-pointer"
            : "text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer"
        }
      >
        <Trash2 size={11} />
        {isDashboard && "Excluir"}
      </button>

      {showModal && (
        <ConfirmModal
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
          loading={loading}
        />
      )}
    </>
  );
}
