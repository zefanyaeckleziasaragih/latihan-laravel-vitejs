import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Link, usePage, router } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2, CheckCircle2, Circle } from "lucide-react";
import { showConfirm } from "@/lib/sweetalert";

export default function ShowPage() {
    const { todo } = usePage().props;

    const handleDelete = async () => {
        const confirmed = await showConfirm(
            "Todo ini akan dihapus secara permanen!"
        );
        if (confirmed) {
            router.delete(`/todos/${todo.id}`);
        }
    };

    const handleToggle = () => {
        router.post(`/todos/${todo.id}/toggle`);
    };

    return (
        <AppLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="icon" asChild>
                                <Link href="/todos">
                                    <ArrowLeft className="h-4 w-4" />
                                </Link>
                            </Button>
                            <h1 className="text-3xl font-bold">Detail Todo</h1>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" asChild>
                                <Link href={`/todos/${todo.id}/edit`}>
                                    <Edit className="h-4 w-4" />
                                    Edit
                                </Link>
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                            >
                                <Trash2 className="h-4 w-4" />
                                Hapus
                            </Button>
                        </div>
                    </div>

                    <Card>
                        <CardContent className="pt-6 space-y-6">
                            {/* Status */}
                            <div className="flex items-center gap-3">
                                <button onClick={handleToggle}>
                                    {todo.is_finished ? (
                                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                                    ) : (
                                        <Circle className="h-8 w-8 text-gray-400" />
                                    )}
                                </button>
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Status
                                    </p>
                                    <p
                                        className={`text-lg font-semibold ${
                                            todo.is_finished
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {todo.is_finished
                                            ? "Selesai"
                                            : "Belum Selesai"}
                                    </p>
                                </div>
                            </div>

                            {/* Title */}
                            <div>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Judul
                                </p>
                                <h2
                                    className={`text-2xl font-bold ${
                                        todo.is_finished
                                            ? "line-through text-muted-foreground"
                                            : ""
                                    }`}
                                >
                                    {todo.title}
                                </h2>
                            </div>

                            {/* Cover */}
                            {todo.cover_url && (
                                <div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Cover
                                    </p>
                                    <img
                                        src={todo.cover_url}
                                        alt={todo.title}
                                        className="max-w-full h-auto rounded-lg shadow-md"
                                        onError={(e) => {
                                            e.target.style.display = "none";
                                            console.error(
                                                "Error loading image:",
                                                todo.cover_url
                                            );
                                        }}
                                    />
                                </div>
                            )}

                            {/* Description */}
                            {todo.description && (
                                <div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Deskripsi
                                    </p>
                                    <div
                                        className={`prose max-w-none ${
                                            todo.is_finished
                                                ? "line-through text-muted-foreground"
                                                : ""
                                        }`}
                                    >
                                        <p className="whitespace-pre-wrap">
                                            {todo.description}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Timestamps */}
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Dibuat pada
                                    </p>
                                    <p className="font-medium">
                                        {new Date(
                                            todo.created_at
                                        ).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Diperbarui pada
                                    </p>
                                    <p className="font-medium">
                                        {new Date(
                                            todo.updated_at
                                        ).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
