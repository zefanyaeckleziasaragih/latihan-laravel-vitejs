import React, { useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import { usePage, router, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/ui/pagination";
import { showSuccess, showError, showConfirm } from "@/lib/sweetalert";
import Chart from "react-apexcharts";
import {
    Search,
    Plus,
    Edit,
    Trash2,
    CheckCircle2,
    Circle,
    Filter,
} from "lucide-react";

export default function IndexPage() {
    const { todos, stats, filters, flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");
    const [filter, setFilter] = useState(filters.filter || "all");

    useEffect(() => {
        if (flash?.success) {
            showSuccess(flash.success);
        }
        if (flash?.error) {
            showError(flash.error);
        }
    }, [flash]);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            "/todos",
            { search, filter: filter !== "all" ? filter : null },
            { preserveState: true }
        );
    };

    const handleDelete = async (id) => {
        const confirmed = await showConfirm(
            "Todo ini akan dihapus secara permanen!"
        );
        if (confirmed) {
            router.delete(`/todos/${id}`);
        }
    };

    const handleToggle = (id) => {
        router.post(`/todos/${id}/toggle`);
    };

    // Chart configuration
    const chartOptions = {
        chart: {
            type: "donut",
        },
        labels: ["Selesai", "Belum Selesai"],
        colors: ["#10b981", "#ef4444"],
        legend: {
            position: "bottom",
        },
    };

    const chartSeries = [stats.finished, stats.unfinished];

    return (
        <AppLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold">Daftar Todos</h1>
                        <Button asChild>
                            <Link href="/todos/create">
                                <Plus className="h-4 w-4" />
                                Tambah Todo
                            </Link>
                        </Button>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium">
                                    Total Todos
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats.total}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium">
                                    Selesai
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">
                                    {stats.finished}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium">
                                    Belum Selesai
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-red-600">
                                    {stats.unfinished}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium">
                                    Progres
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats.total > 0
                                        ? Math.round(
                                              (stats.finished / stats.total) *
                                                  100
                                          )
                                        : 0}
                                    %
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Chart */}
                    {stats.total > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Statistik Todos</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Chart
                                    options={chartOptions}
                                    series={chartSeries}
                                    type="donut"
                                    height={300}
                                />
                            </CardContent>
                        </Card>
                    )}

                    {/* Search and Filter */}
                    <Card>
                        <CardContent className="pt-6">
                            <form
                                onSubmit={handleSearch}
                                className="flex gap-4"
                            >
                                <div className="flex-1">
                                    <Input
                                        type="text"
                                        placeholder="Cari todo..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                </div>
                                <select
                                    className="border rounded-md px-3 py-2"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                >
                                    <option value="all">Semua</option>
                                    <option value="finished">Selesai</option>
                                    <option value="unfinished">
                                        Belum Selesai
                                    </option>
                                </select>
                                <Button type="submit">
                                    <Search className="h-4 w-4" />
                                    Cari
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Todos List */}
                    <div className="space-y-4">
                        {todos.data.length === 0 ? (
                            <Card>
                                <CardContent className="py-12 text-center">
                                    <p className="text-muted-foreground">
                                        Belum ada todo. Mulai dengan menambahkan
                                        todo baru!
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            todos.data.map((todo) => (
                                <Card key={todo.id}>
                                    <CardContent className="pt-6">
                                        <div className="flex items-start gap-4">
                                            <button
                                                onClick={() =>
                                                    handleToggle(todo.id)
                                                }
                                                className="mt-1"
                                            >
                                                {todo.is_finished ? (
                                                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                                                ) : (
                                                    <Circle className="h-6 w-6 text-gray-400" />
                                                )}
                                            </button>
                                            {todo.cover_url && (
                                                <img
                                                    src={todo.cover_url}
                                                    alt={todo.title}
                                                    className="w-24 h-24 object-cover rounded-md"
                                                    onError={(e) => {
                                                        e.target.style.display =
                                                            "none";
                                                    }}
                                                />
                                            )}
                                            <div className="flex-1">
                                                <h3
                                                    className={`text-lg font-semibold ${
                                                        todo.is_finished
                                                            ? "line-through text-muted-foreground"
                                                            : ""
                                                    }`}
                                                >
                                                    {todo.title}
                                                </h3>
                                                {todo.description && (
                                                    <p
                                                        className={`text-sm mt-1 ${
                                                            todo.is_finished
                                                                ? "line-through text-muted-foreground"
                                                                : "text-muted-foreground"
                                                        }`}
                                                    >
                                                        {todo.description.substring(
                                                            0,
                                                            150
                                                        )}
                                                        {todo.description
                                                            .length > 150 &&
                                                            "..."}
                                                    </p>
                                                )}
                                                <div className="flex gap-2 mt-3">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/todos/${todo.id}`}
                                                        >
                                                            Detail
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/todos/${todo.id}/edit`}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                            Edit
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() =>
                                                            handleDelete(
                                                                todo.id
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        Hapus
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    <Pagination links={todos.links} meta={todos.meta} />
                </div>
            </div>
        </AppLayout>
    );
}
