interface SuccessFeedbackProps {
  message: string;
  description?: string;
  action?: React.ReactNode;
  show: boolean;
}
export default function Success({
  message,
  description,
  action,
  show,
}: SuccessFeedbackProps) {
  if (!show) return <></>;
  return (
    <div className="bg-green-200 p-2 rounded-full text-green-700 mt-6 flex flex-col items-center justify-center">
      <p className="font-bold">{message}</p>
      {description && <p>{description}</p>}
      {action && action}
    </div>
  );
}
