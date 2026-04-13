import * as padrinhos from '../mocks/padrinhos';

describe('PadrinhoAPI - CRUD Operations', () => {
  
  beforeEach(() => {
    jest.resetModules();
  });

  describe('CREATE - Padrinho Creation', () => {
    it('should add new padrinho to the list', async () => {
      const newPadrinho = await padrinhos.createPadrinho({
        name: 'Carlos Teste',
        phone: '11 99999-8888',
        email: 'carlos@test.com',
      });

      expect(newPadrinho.id).toBeDefined();
      expect(newPadrinho.name).toBe('Carlos Teste');
      expect(newPadrinho.phone).toBe('11 99999-8888');
    });

    it('should create padrinho with optional fields', async () => {
      const newPadrinho = await padrinhos.createPadrinho({
        name: 'Padrinho Simples',
      });

      expect(newPadrinho.name).toBe('Padrinho Simples');
      expect(newPadrinho.phone).toBeUndefined();
    });
  });

  describe('READ - Padrinho Retrieval', () => {
    it('should list all padrinhos', async () => {
      const list = await padrinhos.listPadrinhos();
      expect(Array.isArray(list)).toBe(true);
      expect(list.length).toBeGreaterThan(0);
    });

    it('should retrieve specific padrinho by ID', async () => {
      const all_padrinhos = await padrinhos.listPadrinhos();
      const first = all_padrinhos[0];

      const retrieved = await padrinhos.getPadrinho(first.id);
      expect(retrieved).toEqual(first);
      expect(retrieved?.name).toBeDefined();
    });

    it('should return null for non-existent padrinho ID', async () => {
      const retrieved = await padrinhos.getPadrinho('non-existent-id');
      expect(retrieved).toBeNull();
    });
  });

  describe('UPDATE - Padrinho Modification', () => {
    it('should update existing padrinho', async () => {
      const all_padrinhos = await padrinhos.listPadrinhos();
      const padrinho_to_update = all_padrinhos[0];

      const updated = await padrinhos.updatePadrinho(padrinho_to_update.id, {
        phone: '11 98888-7777',
        email: 'updated@test.com',
      });

      expect(updated).not.toBeNull();
      if (updated) {
        expect((updated as any).phone).toBe('11 98888-7777');
        expect((updated as any).email).toBe('updated@test.com');
        expect((updated as any).name).toBe(padrinho_to_update.name);
      }
    });

    it('should return null when updating non-existent padrinho', async () => {
      const updated = await padrinhos.updatePadrinho('non-existent', {
        name: 'New Name',
      });

      expect(updated).toBeNull();
    });
  });

  describe('DELETE - Padrinho Removal', () => {
    it('should remove padrinho from the list', async () => {
      const padrinhos_before = await padrinhos.listPadrinhos();
      const padrinho_to_delete = padrinhos_before[0];

      const result = await padrinhos.deletePadrinho(padrinho_to_delete.id);
      expect(result).toBe(true);
      
      const deleted = await padrinhos.getPadrinho(padrinho_to_delete.id);
      expect(deleted).toBeNull();
    });

    it('should return false when deleting non-existent padrinho', async () => {
      const result = await padrinhos.deletePadrinho('non-existent-id');
      expect(result).toBe(false);
    });
  });

  describe('Data Integrity', () => {
    it('should return padrinho data with correct structure', async () => {
      const padrinho1 = await padrinhos.getPadrinho('p1');

      if (padrinho1) {
        expect(padrinho1.id).toBeDefined();
        expect(padrinho1.name).toBeDefined();
      }
    });
  });
});
