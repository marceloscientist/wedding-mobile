// Central service entry — toggles between mock services and real backend by reading process.env.MOCK
import Mock from './api';

// Placeholder for a future real API implementation. For now it throws if used.
const Remote = {
  EventAPI: {
    list: async () => { throw new Error('Remote API not implemented'); },
    get: async () => { throw new Error('Remote API not implemented'); },
    create: async () => { throw new Error('Remote API not implemented'); },
    update: async () => { throw new Error('Remote API not implemented'); },
    delete: async () => { throw new Error('Remote API not implemented'); },
  },
  PadrinhoAPI: {
    list: async () => { throw new Error('Remote API not implemented'); },
    get: async () => { throw new Error('Remote API not implemented'); },
    create: async () => { throw new Error('Remote API not implemented'); },
    update: async () => { throw new Error('Remote API not implemented'); },
    delete: async () => { throw new Error('Remote API not implemented'); },
  },
  PresentAPI: {
    list: async () => { throw new Error('Remote API not implemented'); },
    get: async () => { throw new Error('Remote API not implemented'); },
    create: async () => { throw new Error('Remote API not implemented'); },
    update: async () => { throw new Error('Remote API not implemented'); },
    delete: async () => { throw new Error('Remote API not implemented'); },
    markAsPurchased: async () => { throw new Error('Remote API not implemented'); },
  }
};

// Prefer mock services by default. Only use Remote when REMOTE is explicitly set to 'true' or '1'.
let services = Mock;
try {
  if (typeof process !== 'undefined' && process?.env?.REMOTE === 'true') {
    services = Remote;
  }
} catch (e) {
  // In some bundlers process.env may be undefined; default to Mock
  services = Mock;
}

export const EventAPI = services.EventAPI;
export const PadrinhoAPI = services.PadrinhoAPI;
export const PresentAPI = services.PresentAPI;

export default { EventAPI, PadrinhoAPI, PresentAPI };
