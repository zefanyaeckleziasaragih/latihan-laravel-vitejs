import React from "react";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Home, ListTodo } from "lucide-react";

export default function AppLayout({ children }) {
    const onLogout = () => {
        router.get("/auth/logout");
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="border-b bg-card">
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <Link href="/" className="text-lg font-bold">
                                DelTodos
                            </Link>
                            <div className="hidden md:flex items-center space-x-4">
                                <Link
                                    href="/"
                                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                                >
                                    <Home className="h-4 w-4" />
                                    Home
                                </Link>
                                <Link
                                    href="/todos"
                                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                                >
                                    <ListTodo className="h-4 w-4" />
                                    Todos
                                </Link>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={onLogout}>
                            Logout
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="border-t bg-card py-6 mt-12">
                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                    &copy; 2025 Delcom Labs. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
