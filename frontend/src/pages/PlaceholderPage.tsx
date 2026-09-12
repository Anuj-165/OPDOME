import { useLocation } from 'react-router-dom';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Construction, ArrowLeft } from 'lucide-react';

export function PlaceholderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.slice(1).replace(/-/g, ' ');

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <EmptyState
        icon={Construction}
        title={`${path.charAt(0).toUpperCase() + path.slice(1)} — Coming Soon`}
        description="This module is part of the OPDOME platform and will be available in the next build phase."
        action={
          <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            Back to Dashboard
          </Button>
        }
      />
    </div>
  );
}
