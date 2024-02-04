import { CircularProgress } from '@nextui-org/progress';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CircularLoadingProps {}

export function CircularLoading(_: CircularLoadingProps) {
  return (
    <div className="flex items-center justify-center h-[50vh]">
      <CircularProgress />
    </div>
  );
}
