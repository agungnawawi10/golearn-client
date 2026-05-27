interface AthleteErrorProps {
  message: string
}

export function AthleteError({ message }: AthleteErrorProps) {
  return <p className="text-sm text-red-500">{message}</p>
}