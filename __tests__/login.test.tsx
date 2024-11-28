import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Login from '@/app/login/login'
import { loginUser } from '@/app/services/utils/auth'

// Move the import before the mock
jest.mock('../app/services/utils/auth', () => ({
  loginUser: jest.fn()
}))

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn()
    }
  }
}))

jest.mock('react-hot-toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}))

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders login form', () => {
    render(<Login />)
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('handles form submission', async () => {
    (loginUser as jest.Mock).mockResolvedValueOnce({ success: true, data: {} })
    
    render(<Login />)
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith('test@example.com', 'password123')
    })
  })
})