'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

/* ================= TYPES ================= */

export interface DeleteDialogProps {
  isOpen: boolean;
  isLoading: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loadingText?: string;
  isDangerous?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/* ================= COMPONENT ================= */

export function DeleteDialog({
  isOpen,
  isLoading,
  title = 'Delete item?',
  description = 'This action cannot be undone.',
  confirmText = 'Delete',
  loadingText = 'Deleting...',
  cancelText = 'Cancel',
  isDangerous = true,
  onConfirm,
  onCancel,
}: DeleteDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!isLoading && !open) onCancel();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelText}
          </Button>

          <Button
            onClick={onConfirm}
            disabled={isLoading}
            variant={isDangerous ? 'destructive' : 'default'}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                {loadingText}
                <Loader2 className="h-4 w-4 animate-spin" />
              </span>
            ) : (
              confirmText
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}