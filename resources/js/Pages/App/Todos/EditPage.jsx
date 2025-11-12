import React, { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { useForm, Link, usePage } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EditPage() {
    const { todo } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        title: todo.title || "",
        description: todo.description || "",
        is_finished: todo.is_finished || false,
        cover: null,
        _method: "PUT",
    });

    const [preview, setPreview] = useState(
        todo.cover ? `/storage/${todo.cover}` : null
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/todos/${todo.id}`);
    };

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        setData("cover", file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AppLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto space-y-6">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link href="/todos">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-bold">Edit Todo</h1>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Todo</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="title">
                                            Judul Todo *
                                        </FieldLabel>
                                        <Input
                                            id="title"
                                            type="text"
                                            placeholder="Masukkan judul todo"
                                            value={data.title}
                                            onChange={(e) =>
                                                setData("title", e.target.value)
                                            }
                                            required
                                        />
                                        {errors.title && (
                                            <div className="text-sm text-red-600">
                                                {errors.title}
                                            </div>
                                        )}
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="description">
                                            Deskripsi
                                        </FieldLabel>
                                        <textarea
                                            id="description"
                                            className="w-full min-h-[150px] border rounded-md px-3 py-2"
                                            placeholder="Masukkan deskripsi todo"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.description && (
                                            <div className="text-sm text-red-600">
                                                {errors.description}
                                            </div>
                                        )}
                                    </Field>

                                    <Field>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id="is_finished"
                                                checked={data.is_finished}
                                                onChange={(e) =>
                                                    setData(
                                                        "is_finished",
                                                        e.target.checked
                                                    )
                                                }
                                                className="w-4 h-4"
                                            />
                                            <FieldLabel htmlFor="is_finished">
                                                Tandai sebagai selesai
                                            </FieldLabel>
                                        </div>
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="cover">
                                            Cover (Opsional)
                                        </FieldLabel>
                                        <Input
                                            id="cover"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleCoverChange}
                                        />
                                        {errors.cover && (
                                            <div className="text-sm text-red-600">
                                                {errors.cover}
                                            </div>
                                        )}
                                        {preview && (
                                            <div className="mt-4">
                                                <img
                                                    src={preview}
                                                    alt="Preview"
                                                    className="max-w-full h-48 object-cover rounded-md"
                                                />
                                            </div>
                                        )}
                                    </Field>

                                    <div className="flex gap-2">
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? "Menyimpan..."
                                                : "Simpan Perubahan"}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            asChild
                                        >
                                            <Link href="/todos">Batal</Link>
                                        </Button>
                                    </div>
                                </FieldGroup>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
