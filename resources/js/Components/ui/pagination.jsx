import React from "react";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ links, meta }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="flex items-center justify-between border-t pt-4">
            <div className="text-sm text-muted-foreground">
                Menampilkan {meta.from} sampai {meta.to} dari {meta.total} data
            </div>
            <div className="flex items-center gap-2">
                {links.map((link, index) => {
                    if (index === 0) {
                        return (
                            <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                disabled={!link.url}
                                asChild={!!link.url}
                            >
                                {link.url ? (
                                    <Link href={link.url}>
                                        <ChevronLeft className="h-4 w-4" />
                                        Sebelumnya
                                    </Link>
                                ) : (
                                    <>
                                        <ChevronLeft className="h-4 w-4" />
                                        Sebelumnya
                                    </>
                                )}
                            </Button>
                        );
                    }

                    if (index === links.length - 1) {
                        return (
                            <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                disabled={!link.url}
                                asChild={!!link.url}
                            >
                                {link.url ? (
                                    <Link href={link.url}>
                                        Selanjutnya
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                ) : (
                                    <>
                                        Selanjutnya
                                        <ChevronRight className="h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        );
                    }

                    return (
                        <Button
                            key={index}
                            variant={link.active ? "default" : "outline"}
                            size="icon-sm"
                            disabled={!link.url}
                            asChild={!!link.url}
                        >
                            {link.url ? (
                                <Link href={link.url}>{link.label}</Link>
                            ) : (
                                link.label
                            )}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
