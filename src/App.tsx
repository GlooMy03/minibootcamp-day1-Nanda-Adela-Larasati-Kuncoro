import { Button } from "./components/ui/Button";
import { Link } from "react-router";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import { FileText, AlignLeft, Settings, Star } from "lucide-react";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6 flex flex-col items-center text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Capture your ideas, organize your life
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              notedev helps you capture ideas, organize tasks, and stay in sync across all your devices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg">Get Started for Free</Button>
              </Link>
              <Link to="/about">
                <Button variant="secondary" size="lg">Learn More</Button>
              </Link>
            </div>
          </div>

          {/* App Preview - Updated to match the screenshot */}
          <div className="mt-16 rounded-lg border shadow-xl w-full max-w-5xl overflow-hidden">
            <div className="p-2 bg-muted border-b">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="bg-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">My Notes</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Logout</Button>
                  <Button variant="default" size="sm">New Note</Button>
                </div>
              </div>

              <div className="w-full mb-4">
                <input
                  type="text"
                  placeholder="Search notes..."
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Note Card 1 */}
                <div className="border rounded-md p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-medium mb-1">Tugas Pemrograman Lanjut</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Buat aplikasi web dengan React dan Tailwind CSS. Implementasikan fitur CRUD untuk manajemen data.
                  </p>
                  <p className="text-xs text-muted-foreground">Created: Jul 14, 2023, 01:20:54 PM</p>
                </div>

                {/* Note Card 2 */}
                <div className="border rounded-md p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-medium mb-1">
                    Quiz Pemrograman Web Dasar
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Siapkan materi untuk quiz minggu depan. Fokus pada HTML, CSS, dan JavaScript dasar.
                  </p>
                  <p className="text-xs text-muted-foreground">Created: Jul 14, 2023, 01:20:56 PM</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/50 flex flex-col items-center">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-16">Everything you need, in one place</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <FileText className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-medium mb-2">Rich Note Taking</h3>
                <p className="text-muted-foreground">Create beautiful notes with formatting, images, checklists, and more.</p>
              </div>

              {/* Feature 2 */}
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <AlignLeft className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-medium mb-2">Organize & Search</h3>
                <p className="text-muted-foreground">Keep your notes organized with notebooks, tags, and powerful search.</p>
              </div>

              {/* Feature 3 */}
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Settings className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-medium mb-2">Sync Everywhere</h3>
                <p className="text-muted-foreground">Access your notes from any device with real-time synchronization.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 flex flex-col items-center">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-16">Loved by thousands</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-background p-6 rounded-lg border">
                <div className="flex gap-2 text-yellow-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <p className="mb-4 italic">"notedev has completely transformed how I organize my work and personal projects. Can't imagine life without it now."</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted"></div>
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Product Designer</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-background p-6 rounded-lg border">
                <div className="flex gap-2 text-yellow-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <p className="mb-4 italic">"The seamless sync across devices and clean interface make notedev the best note-taking app I've ever used."</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted"></div>
                  <div>
                    <p className="font-medium">Michael Chen</p>
                    <p className="text-sm text-muted-foreground">Software Engineer</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-background p-6 rounded-lg border">
                <div className="flex gap-2 text-yellow-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <p className="mb-4 italic">"As a student, I rely on notedev for all my classes. The organization features help me keep everything in perfect order."</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted"></div>
                  <div>
                    <p className="font-medium">Emily Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Graduate Student</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/50 flex flex-col items-center">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Start capturing ideas today</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
              Join thousands of users who organize their work and life with notedev.
            </p>
            <Link to="/register">
              <Button variant={"default"} size="lg">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;