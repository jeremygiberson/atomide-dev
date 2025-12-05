export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background font-sans antialiased">
            <main className="flex-1">{children}</main>
        </div>
    );
}
