import { loginUser, checkAuth } from '../app/services/utils/auth'
import axios from '../app/services/utils/axiosConfig'

jest.mock('../app/services/utils/axiosConfig')

describe('Auth Service', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('successfully logs in user', async () => {
    const mockResponse = {
      data: {
        status: true,
        data: {
          access: 'mock-token',
          refresh: 'mock-refresh',
          user: { id: 1 }
        }
      }
    }
    
    ;(axios.post as jest.Mock).mockResolvedValueOnce(mockResponse)
    
    const result = await loginUser('test@example.com', 'password123')
    
    expect(result.success).toBe(true)
    expect(localStorage.getItem('accessToken')).toBe('mock-token')
    expect(localStorage.getItem('refreshToken')).toBe('mock-refresh')
  })

  it('handles login failure', async () => {
    const mockError = {
      response: {
        data: {
          message: 'Invalid credentials'
        }
      }
    }
    
    ;(axios.post as jest.Mock).mockRejectedValueOnce(mockError)
    
    const result = await loginUser('test@example.com', 'wrongpassword')
    
    expect(result.success).toBe(false)
    expect(result.error).toBe('Invalid credentials')
  })

  it('checks auth status correctly', () => {
    localStorage.setItem('accessToken', 'mock-token')
    expect(checkAuth()).toBe(true)
    
    localStorage.clear()
    expect(checkAuth()).toBe(false)
  })
})
