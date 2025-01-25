interface ErrorMessageProps {
    error: string;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => (
    <div className="min-h-[400px] flex items-center justify-center text-red-500">
        {error}
    </div>
);