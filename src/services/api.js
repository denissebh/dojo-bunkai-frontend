const BASE_URL = 'http://localhost:4000/api';

// El error personalizado 
export class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
  }
}

/* Función centralizada*/
const fetchConAuth = async (endpoint, method = 'GET', data = null) => {
  const url = `${BASE_URL}${endpoint}`;
  
  const token = localStorage.getItem('accessToken');
  
  const headers = {};
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else {
    // Si no hay token, no tiene sentido hacer la llamada protegida
    throw new AuthError('No se encontró token de sesión.');
  }

  const options = { method, headers };

  if (data) {
    if (data instanceof FormData) {
      // Si es FormData, no establecemos Content-Type
      // El navegador lo hará automáticamente con el 'boundary' correcto
      options.body = data;
    } else {
      // Si es un objeto JSON normal, hacemos lo de siempre
      headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(data);
    }
  }
  try {
    const response = await fetch(url, options);

    if (response.status === 401 || response.status === 403) {
      throw new AuthError('Sesión expirada o permisos insuficientes.');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})); 
      throw new Error(errorData.error || `Error ${response.status}`);
    }

    if (response.status === 204) {
      return null;
    }

    return response.json();

  } catch (error) {
    throw error;
  }
};

// Exportamos los métodos 
export const api = {
  get: (endpoint) => fetchConAuth(endpoint, 'GET'),
  post: (endpoint, data) => fetchConAuth(endpoint, 'POST', data),
  put: (endpoint, data) => fetchConAuth(endpoint, 'PUT', data),
  delete: (endpoint) => fetchConAuth(endpoint, 'DELETE'),
};

export default api;