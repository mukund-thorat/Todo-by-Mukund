import ProtectedRoute from "../components/ProtectedRoute.tsx";

function DashboardPage(){
    return (
        <ProtectedRoute>
            <div className="flex items-center justify-center h-screen">
                Dashboard
            </div>
        </ProtectedRoute>
    )
}

export default DashboardPage;