interface CoachErrorProps {
  message: string
}

export function CoachError({ message }: CoachErrorProps) {
  return (
    <p className="text-sm text-red-500">
      {message}
    </p>
  )
}