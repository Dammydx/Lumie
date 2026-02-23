interface ToastProps {
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  onClose: () => void
}

const colors = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
}

export default function Toast({ type, message, onClose }: ToastProps) {
  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg border ${colors[type]} shadow-lg max-w-md`}
      role="alert"
    >
      <div className="flex justify-between items-center">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="ml-4 font-bold hover:opacity-70"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  )
}
