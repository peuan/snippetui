export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <div className="mt-2">
            {children}
        </div>
    )
}