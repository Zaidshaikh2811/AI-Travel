interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
    <div className="min-h-[400px] flex items-center justify-center text-red-500">
        {message}
    </div>
);