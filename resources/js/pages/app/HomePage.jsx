import React from "react";
import AppLayout from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePage, Link } from "@inertiajs/react";
import { CheckSquare, ListTodo } from "lucide-react";

export default function HomePage() {
    const { auth } = usePage().props;

    return (
        <AppLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: "&#128075;",
                                }}
                            />
                            Hai! {auth.name}
                        </h1>
                        <p className="text-xl text-muted-foreground mb-6">
                            Kelola aktivitas harian Anda dengan mudah
                        </p>
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            asChild
                        >
                            <Link href="/todos">
                                <ListTodo className="h-4 w-4" />
                                Lihat Todos Saya
                            </Link>
                        </Button>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CheckSquare className="h-5 w-5 text-blue-600" />
                                    Kelola Todos
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    Tambah, edit, dan hapus aktivitas yang perlu
                                    Anda selesaikan
                                </p>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="/todos/create">
                                        Tambah Todo Baru
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ListTodo className="h-5 w-5 text-green-600" />
                                    Lihat Statistik
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    Pantau progres dan statistik todos Anda
                                </p>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="/todos">Lihat Dashboard</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Info Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Fitur Aplikasi</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>✅ Tambah, edit, dan hapus todos</li>
                                <li>✅ Upload cover untuk setiap todo</li>
                                <li>
                                    ✅ Tandai todos sebagai selesai/belum
                                    selesai
                                </li>
                                <li>✅ Cari dan filter todos</li>
                                <li>✅ Lihat statistik dan grafik progres</li>
                                <li>✅ Pagination untuk data banyak</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
