export interface DashboardData {
    update: {
      percentage_change: string;
      date: string;
    };
    net_income: {
      amount: string;
      currency: string;
      percentage_change: string;
    };
    total_return: {
      amount: string;
      currency: string;
      percentage_change: string;
    };
    sales_report: {
      product_launched: string;
      ongoing_product: string;
      product_sold: string;
    };
    revenue: {
      amount: string;
      currency: string;
      percentage_change: string;
      break_down: {
        week: number;
        revenue: string;
        expense: string;
      }[];
    };
    total_view_perfomance: {
      view_count: string;
      sales: string;
      percentage: string;
      total_count: string;
    };
  }

  

export interface AuthResponse {
    status: boolean;
    message: string;
    data: {
      refresh: string;
      access: string;
      user: any;
    }
  }
  

export interface ViewPerformance {
    view_count: string;
    sales: string;
    percentage: string;
    total_count: string;
  }

  