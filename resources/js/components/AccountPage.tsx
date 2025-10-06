import { Button } from "@/components/ui/button";

interface AccountPageProps {
  onBack: () => void;
}

export function AccountPage({ onBack }: AccountPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Account</h1>
          <Button variant="outline" onClick={onBack}>Back to Forum</Button>
        </div>
        <div className="mt-6 text-muted-foreground">Profile settings coming soon…</div>
      </div>
    </div>
  );
}
