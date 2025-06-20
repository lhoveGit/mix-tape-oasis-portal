
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-lg">
      <div className="text-center space-y-6 p-8 rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-lg border border-white/10">
        <div className="space-y-2">
          <h1 className="text-8xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-white">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
            className="border-white/20 hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <Button 
            asChild
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
