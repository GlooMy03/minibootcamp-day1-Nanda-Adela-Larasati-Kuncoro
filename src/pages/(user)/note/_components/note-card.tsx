import Modal from '../../../../components/ui/Modal';
import { formatDate } from '../../../../lib/format-date';
import type { NoteCardProps } from '../../../../types/notes';
import { Eye, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

const NoteCard = ({ note, onDelete }: NoteCardProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    try {
      onDelete(note.id);
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-150 border bg-card flex flex-col h-full">
      <div className="p-5 flex-grow">
        <Link to={`/notes/${note.id}`} className="block h-full">
          <h3 className="text-xl font-semibold text-foreground mb-2 line-clamp-1 hover:text-primary transition-colors">
            {note.title}
          </h3>
          <div className="text-muted-foreground mb-4 line-clamp-3 text-sm">
            {note.content}
          </div>
          <div className="text-muted-foreground text-sm">
            Created: {formatDate(note.createdAt)}
          </div>
        </Link>

        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="text-xs text-muted-foreground">
            <p>Updated: {formatDate(note.updatedAt)}</p>
            <p className="mt-1">By: {note.user.name}</p>
          </div>

          <div className="flex space-x-2">
            <Link
              to={`/notes/${note.id}`}
              className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors flex items-center"
              aria-label="View note"
              title="View"
            >
              <Eye size={18} />
            </Link>
            <Link
              to={`/notes/${note.id}`}
              className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors flex items-center"
              aria-label="Edit note"
              title="Edit"
            >
              <Pencil size={18} />
            </Link>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="p-2 text-destructive hover:bg-destructive/10 rounded-full transition-colors flex items-center"
              aria-label="Delete note"
              title="Delete"
            >
              <Trash size={18} />
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        title="Delete Note"
        description={`Are you sure you want to delete "${note.title}"? This action cannot be undone.`}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default NoteCard;