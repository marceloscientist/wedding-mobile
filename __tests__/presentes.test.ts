import * as presentes from '../mocks/presentes';

describe('PresentAPI - CRUD Operations', () => {
  
  beforeEach(() => {
    jest.resetModules();
  });

  describe('CREATE - Presente Creation', () => {
    it('should add new presente to the list', async () => {
      const presentesBefore = await presentes.listPresentes();
      const initialCount = presentesBefore.length;

      const newPresente = await presentes.createPresente({
        title: 'Novo Presente de Teste',
      });

      expect(newPresente.id).toBeDefined();
      expect(newPresente.title).toBe('Novo Presente de Teste');
      expect((newPresente as any).purchasedBy).toBeNull();

      const presentes_after = await presentes.listPresentes();
      expect(presentes_after.length).toBe(initialCount + 1);
    });
  });

  describe('READ - Presente Retrieval', () => {
    it('should list all presentes', async () => {
      const list = await presentes.listPresentes();
      expect(Array.isArray(list)).toBe(true);
      expect(list.length).toBeGreaterThan(0);
    });

    it('should retrieve specific presente by ID', async () => {
      const all_presentes = await presentes.listPresentes();
      const first = all_presentes[0];

      const retrieved = await presentes.getPresenteById(first.id);
      expect(retrieved).toEqual(first);
      expect(retrieved?.title).toBeDefined();
    });

    it('should return null for non-existent presente ID', async () => {
      const retrieved = await presentes.getPresenteById('non-existent-id');
      expect(retrieved).toBeNull();
    });
  });

  describe('UPDATE - Presente Modification', () => {
    it('should update existing presente', async () => {
      const all_presentes = await presentes.listPresentes();
      const presente_to_update = all_presentes[0];

      const updated = await presentes.updatePresente(presente_to_update.id, {
        title: 'Updated Presente',
      });

      expect(updated).not.toBeNull();
      expect(updated?.title).toBe('Updated Presente');
    });

    it('should return null when updating non-existent presente', async () => {
      const updated = await presentes.updatePresente('non-existent', {
        title: 'New Title',
      });

      expect(updated).toBeNull();
    });
  });

  describe('DELETE - Presente Removal', () => {
    it('should remove presente from the list', async () => {
      const presentes_before = await presentes.listPresentes();
      const initial_count = presentes_before.length;
      const presente_to_delete = presentes_before[0];

      const result = await presentes.deletePresente(presente_to_delete.id);
      expect(result).toBe(true);

      const presentes_after = await presentes.listPresentes();
      expect(presentes_after.length).toBe(initial_count - 1);
      
      const deleted = await presentes.getPresenteById(presente_to_delete.id);
      expect(deleted).toBeNull();
    });

    it('should return false when deleting non-existent presente', async () => {
      const result = await presentes.deletePresente('non-existent-id');
      expect(result).toBe(false);
    });
  });

  describe('PURCHASE - Marcar como Comprado', () => {
    it('should mark an available presente as purchased (self)', async () => {
      const presentes_list = await presentes.listPresentes();
      const available = presentes_list.find((p) => !p.purchasedBy);

      if (available) {
        const result = await presentes.markAsPurchased(available.id, 'Nós', 'self');
        expect(result).toBe(true);

        const updated = await presentes.getPresenteById(available.id);
        expect((updated as any).purchasedBy).toBe('Nós');
        expect((updated as any).purchasedByType).toBe('self');
      }
    });

    it('should mark an available presente as purchased (padrinho)', async () => {
      const presentes_list = await presentes.listPresentes();
      const available = presentes_list.find((p) => !p.purchasedBy);

      if (available) {
        const result = await presentes.markAsPurchased(available.id, 'Carlos Silva', 'padrinho');
        expect(result).toBe(true);

        const updated = await presentes.getPresenteById(available.id);
        expect((updated as any).purchasedBy).toBe('Carlos Silva');
        expect((updated as any).purchasedByType).toBe('padrinho');
      }
    });

    it('should not mark an already purchased presente', async () => {
      const presentes_list = await presentes.listPresentes();
      const purchased = presentes_list.find((p) => p.purchasedBy);

      if (purchased) {
        const result = await presentes.markAsPurchased(purchased.id, 'Outro Padrinho', 'padrinho');
        expect(result).toBe(false);

        const unchanged = await presentes.getPresenteById(purchased.id);
        expect((unchanged as any).purchasedBy).toBe(purchased.purchasedBy);
      }
    });

    it('should not mark non-existent presente', async () => {
      const result = await presentes.markAsPurchased('non-existent', 'Someone', 'padrinho');
      expect(result).toBe(false);
    });
  });

  describe('Data Integrity', () => {
    it('should return presente data with correct structure', async () => {
      const presente1 = await presentes.getPresenteById('pr1');

      if (presente1) {
        expect(presente1.id).toBeDefined();
        expect(presente1.title).toBeDefined();
      }
    });

    it('should list presentes as array', async () => {
      const list = await presentes.listPresentes();

      expect(Array.isArray(list)).toBe(true);
      if (list.length > 0) {
        expect(list[0].id).toBeDefined();
        expect(list[0].title).toBeDefined();
      }
    });
  });
});
