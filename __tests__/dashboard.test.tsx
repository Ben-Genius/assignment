import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import DashboardPage from '@/app/dashboard/page';

jest.mock('../app/services/utils/axiosConfig', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    }
  }
}));

jest.mock('react-hot-toast', () => ({
  error: jest.fn()
}));

const mockDashboardData = {
  data: {
    status: true,
    data: {
      update: { date: '2024-01-01', percentage_change: '15%' },
      net_income: { amount: '50000', currency: 'USD', percentage_change: '10%' },
      total_return: { amount: '25000', currency: 'USD', percentage_change: '-5%' },
      total_view_perfomance: {
        view_count: '1000',
        sales: '500',
        percentage: '50',
        total_count: '1500'
      },
      revenue: {
        currency: 'USD',
        amount: '75000',
        percentage_change: '8%',
        break_down: [
          { week: '1', revenue: '15000', expense: '10000' },
          { week: '2', revenue: '20000', expense: '12000' }
        ]
      },
      sales_report: {
        product_launched: '100',
        ongoing_product: '50',
        product_sold: '200'
      }
    }
  }
};

describe('DashboardPage', () => {
  const axios = require('../app/services/utils/axiosConfig').default;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', async () => {
    axios.get.mockImplementationOnce(() => new Promise(() => {})); // Simulate pending request

    await act(async () => {
      render(<DashboardPage />);
    });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('fetches and displays dashboard data successfully', async () => {
    axios.get.mockResolvedValueOnce(mockDashboardData);

    await act(async () => {
      render(<DashboardPage />);
    });

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('handles API error gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    await act(async () => {
      render(<DashboardPage />);
    });

    await waitFor(() => {
      expect(screen.getByText('Failed to load dashboard data')).toBeInTheDocument();
    });
  });
});
