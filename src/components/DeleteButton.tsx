"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function DeleteButton({ articleId }: { articleId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Tem certeza que deseja remover este artigo?")) return;

    setLoading(true);

    await fetch(`/api/articles/${articleId}`, { method: "DELETE" });

    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-xs text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
    >
      <Trash2 size={16} />
    </button>
  );
}
