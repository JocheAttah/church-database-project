import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Uploader from "@/components/Uploader";

type UploadDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  onUpload: () => void;
  onFileUpload: (data: unknown[]) => void;
  loading: boolean;
  uploadedDataLength: number;
};

const UploadDialog = ({
  isOpen,
  onOpenChange,
  title,
  onUpload,
  onFileUpload,
  loading,
  uploadedDataLength,
}: UploadDialogProps) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription />
      </DialogHeader>
      <div className="border-t border-mineshaft pt-7 text-white">
        <Uploader onFileUpload={onFileUpload} />
        <DialogFooter className="mt-7">
          <Button
            variant="secondary"
            loading={loading}
            onClick={onUpload}
            disabled={uploadedDataLength === 0}
          >
            Upload list
          </Button>
        </DialogFooter>
      </div>
    </DialogContent>
  </Dialog>
);

export default UploadDialog;
