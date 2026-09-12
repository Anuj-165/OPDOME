import { useState } from 'react';
import { useAuth, type UserRole } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { UserPlus, X, MoreHorizontal } from 'lucide-react';

const roleColors: Record<UserRole, string> = {
  owner: 'text-primary border-primary/20 bg-primary/10',
  admin: 'text-primary border-primary/20 bg-primary/10',
  manager: 'text-blue-400 border-blue-500/20 bg-blue-500/10',
  analyst: 'text-yellow-400 border-yellow-500/20 bg-yellow-500/10',
  viewer: 'text-muted-foreground border-border bg-muted/30',
};

export function TeamPage() {
  const { team, inviteMember, updateRole } = useAuth();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('viewer');

  function handleInvite() {
    if (!name.trim() || !email.trim()) return;
    inviteMember(name, email, role);
    setName('');
    setEmail('');
    setRole('viewer');
    setInviteOpen(false);
  }

  return (
    <div className="mx-auto max-w-[1000px] space-y-5 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Team</h2>
          <p className="text-sm text-muted-foreground">Manage team members and roles.</p>
        </div>
        <button
          onClick={() => setInviteOpen(true)}
          className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <UserPlus className="h-3.5 w-3.5" />
          Invite member
        </button>
      </div>

      {/* Permissions overview */}
      <div className="rounded-xl border border-border bg-card p-4">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Role Permissions</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { role: 'Owner / Admin', perms: 'Full organization access' },
            { role: 'Manager', perms: 'Operations + investigations + actions' },
            { role: 'Analyst', perms: 'Analytics + investigations' },
            { role: 'Viewer', perms: 'Read-only access' },
          ].map((r) => (
            <div key={r.role} className="rounded-lg border border-border bg-background/50 px-3 py-2">
              <p className="text-xs font-medium text-foreground">{r.role}</p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">{r.perms}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team table */}
      <div className="rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {['Name', 'Email', 'Role', 'Status', 'Last active', ''].map((col) => (
                  <th key={col} className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {team.map((member) => (
                <tr key={member.id} className="border-b border-border/50 transition-colors last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                        {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-xs font-medium text-foreground">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{member.email}</td>
                  <td className="px-4 py-3">
                    <select
                      value={member.role}
                      onChange={(e) => updateRole(member.id, e.target.value as UserRole)}
                      className={cn(
                        'rounded-md border px-2 py-0.5 text-[10px] font-medium capitalize outline-none',
                        roleColors[member.role]
                      )}
                    >
                      <option value="owner">Owner</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="analyst">Analyst</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-medium',
                      member.status === 'active'
                        ? 'text-success border-success/20 bg-success/10'
                        : 'text-warning border-warning/20 bg-warning/10'
                    )}>
                      <span className={cn('h-1.5 w-1.5 rounded-full', member.status === 'active' ? 'bg-success' : 'bg-warning')} />
                      {member.status === 'active' ? 'Active' : 'Invited'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{member.lastActive}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="rounded-md p-1 text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite modal */}
      {inviteOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setInviteOpen(false)} />
          <div className="relative w-full max-w-md rounded-xl border border-border bg-popover shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h3 className="text-base font-semibold text-foreground">Invite Team Member</h3>
              <button onClick={() => setInviteOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4 p-5">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="auth-input" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@company.com" className="auth-input" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value as UserRole)} className="auth-input">
                  <option value="owner">Owner</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="analyst">Analyst</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
              <button
                onClick={handleInvite}
                className="w-full rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
