interface RegistrationErrorProps {
  message: string
}

export function RegistrationError({ message }: RegistrationErrorProps) {
  return <p className="text-sm text-red-500">{message}</p>
}