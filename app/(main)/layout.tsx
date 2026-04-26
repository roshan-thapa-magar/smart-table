import Header from "@/components/main/header";
import { Footer } from "@/components/main/footer";
import { AuthModal } from "@/components/auth/AuthModal";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50 bg-muted/50  backdrop-blur-md  border-b border-black/5">
        <Header />
      </div>
      <AuthModal />
      <main className="flex-1 flex flex-col">{children}</main>

      <Footer />
    </div>
  );
}