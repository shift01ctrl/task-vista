
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
}

const PageLayout = ({ children, title }: PageLayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-2xl font-bold text-primary">TaskVista</h1>
          </div>
          <Navbar currentPath={location.pathname} />
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">{title}</h2>
        </div>
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
