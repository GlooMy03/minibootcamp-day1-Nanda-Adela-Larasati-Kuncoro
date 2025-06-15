import { Link, useNavigate } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { Plus, Loader2 } from 'lucide-react';
import { useGetNotes, useDeleteNote } from '../../../services/user/notes.service';
import { useAuth } from '../../../hooks/use-auth';
import { Button } from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/Select';
import NoteCard from '../../(user)/note/_components/note-card';
import { ModeToggle } from '../../../components/layout/mode-toggle';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { data, isLoading, isError, error } = useGetNotes();
  const { mutateAsync: deleteNote } = useDeleteNote();

  const { register, watch, control } = useForm({
    defaultValues: {
      searchQuery: '',
      sortBy: 'updatedAt'
    }
  });

  const searchQuery = watch('searchQuery');
  const sortBy = watch('sortBy');

  const notes = data?.notes || [];

  const filteredNotes = notes
    .filter(note =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'createdAt') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen p-6 bg-background">
        <div className="p-4 bg-destructive/10 text-destructive rounded-md">
          <p>Error: {error?.message || 'Failed to load notes'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-foreground mb-4 md:mb-0">My Notes</h1>
            <div className='flex flex-col md:flex-row gap-2'>
              <Link to={"/"}>
                <Button variant="secondary">
                  Home
                </Button>
              </Link>
              <Button
                variant="default"
                onClick={handleLogout}
              >
                Logout
              </Button>
              <ModeToggle />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search notes..."
                {...register('searchQuery')}
                className="pl-10"
              />
            </div>

            <Controller
              name="sortBy"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updatedAt">Latest</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="createdAt">Created</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            <Button asChild>
              <Link to="/notes/new">
                <Plus className="size-4" />
                New Note
              </Link>
            </Button>
          </div>
        </header>

        {filteredNotes.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg shadow-sm">
            {searchQuery ? (
              <p className="text-muted-foreground">No notes match your search</p>
            ) : (
              <div className="space-y-4">
                <p className="text-muted-foreground">You don't have any notes yet</p>
                <Button asChild>
                  <Link to="/notes/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create your first note
                  </Link>
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;