import { Link, useNavigate } from "react-router";
import { Button } from "../../components/ui/Button";
import { useAuth } from "../../hooks/use-auth";
import { ModeToggle } from "./mode-toggle";
import { NotebookIcon } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="max-w-7xl mx-auto flex justify-center sticky top-0 z-50 w-full border-b border-b-black/10 bg-gray-200/20 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex gap-6 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <NotebookIcon className="size-5" />
            <span className="font-bold text-xl">notedev</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <Button variant="secondary" size="default">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="default"
                  size="default"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="default" size={"default"}>
                    Log in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size={"default"}>
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;