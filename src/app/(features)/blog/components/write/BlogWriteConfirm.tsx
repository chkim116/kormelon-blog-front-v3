import { useMemo } from 'react';
import { Button } from '@nextui-org/react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

interface BlogWriteConfirmProps {
  isPrivate: boolean;
  onPrivate: () => void;
}

export const BlogWriteConfirm = ({
  isPrivate,
  onPrivate,
}: BlogWriteConfirmProps) => {
  const secretText = useMemo(
    () => (isPrivate ? <LockOutlinedIcon /> : <LockOpenOutlinedIcon />),
    [isPrivate],
  );

  const handlePrivate = () => {
    onPrivate();
  };

  return (
    <div className="flex justify-start mt-2 gap-1 max-w-4xl mx-auto w-full">
      <Button
        variant="bordered"
        color={isPrivate ? 'success' : 'danger'}
        onClick={handlePrivate}
      >
        {secretText}
      </Button>
      <Button type="submit" color="primary">
        게시
      </Button>
    </div>
  );
};
