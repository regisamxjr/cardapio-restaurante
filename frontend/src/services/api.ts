const API_URL = 'http://localhost:3000/api';

export const api = {
  getReservations: async () => {
    const response = await fetch(`${API_URL}/reservations`);
    return response.json();
  },
  createReservation: async (data: any) => {
    const response = await fetch(`${API_URL}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getTables: async () => {
    const response = await fetch(`${API_URL}/tables`);
    return response.json();
  },
  createTable: async (data: any) => {
    const response = await fetch(`${API_URL}/tables`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getReviews: async () => {
    const response = await fetch(`${API_URL}/reviews`);
    return response.json();
  },
  createReview: async (data: any) => {
    const response = await fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  checkHealth: async () => {
    const response = await fetch(`${API_URL}/health`);
    return response.json();
  },
};
