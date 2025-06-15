import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClientProvider } from '@tanstack/react-query';
import { query } from "./lib/query";
import '@/index.css';
import App from './App';
//import AboutPage from '@/pages/(visitor)/about/page';
//import ContactPage from '@/pages/(visitor)/contact/page';
import LoginPage from './pages/(auth)/login/page';
import RegisterPage from './pages/(auth)/register/page';
//import DashboardPage from '@/pages/(user)/dashboard/page';
//import NoteDetailPage from '@/pages/(user)/note/[id]/page';
//import NewNotePage from '@/pages/(user)/note/page';
import { AuthProvider } from './context/auth-contaxt';
//import { ProtectedRoute } from '@/lib/protected-route';
import { ThemeProvider } from "./components/layout/theme-provider";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <QueryClientProvider client={query}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              {/* <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} /> */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              {/* <Route path="/dashboard" element={
                // <ProtectedRoute>
                //   <DashboardPage />
                // </ProtectedRoute>
              } /> */}
              {/* <Route path="/notes/new" element={
                <ProtectedRoute>
                  <NewNotePage />
                </ProtectedRoute>
              } /> */}
              {/* <Route path="/notes/:id" element={
                <ProtectedRoute>
                  <NoteDetailPage />
                </ProtectedRoute>
              } /> */}
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
)