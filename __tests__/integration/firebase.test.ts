import { getArrFromSnap, getArrFromNestedSnap } from '../../lib';

// Mock Firebase DataSnapshot
class MockDataSnapshot {
  private _val: any;
  private _exists: boolean;

  constructor(data: any) {
    this._val = data;
    this._exists = data !== null;
  }

  val() {
    return this._val;
  }

  exists() {
    return this._exists;
  }
}

describe('Firebase Integration Tests', () => {
  describe('getArrFromSnap Integration', () => {
    it('should handle real-world Firebase-like data structure', () => {
      const mockUserData = {
        'user123': {
          name: 'John Doe',
          email: 'john@example.com',
          createdAt: '2024-02-28'
        },
        'user456': {
          name: 'Jane Smith',
          email: 'jane@example.com',
          createdAt: '2024-02-29'
        }
      };

      const snapshot = new MockDataSnapshot(mockUserData);
      const result = getArrFromSnap(snapshot);

      expect(result).toHaveLength(2);
      expect(result).toEqual([
        { id: 'user123', name: 'John Doe', email: 'john@example.com', createdAt: '2024-02-28' },
        { id: 'user456', name: 'Jane Smith', email: 'jane@example.com', createdAt: '2024-02-29' }
      ]);
    });

    it('should handle empty collections', () => {
      const snapshot = new MockDataSnapshot(null);
      const result = getArrFromSnap(snapshot);
      expect(result).toEqual([]);
    });
  });

  describe('getArrFromNestedSnap Integration', () => {
    it('should handle nested real-world Firebase-like data structure', () => {
      const mockOrderData = {
        'store1': {
          'order123': {
            items: ['item1', 'item2'],
            total: 100,
            status: 'pending'
          },
          'order456': {
            items: ['item3'],
            total: 50,
            status: 'completed'
          }
        },
        'store2': {
          'order789': {
            items: ['item4', 'item5'],
            total: 75,
            status: 'processing'
          }
        }
      };

      const snapshot = new MockDataSnapshot(mockOrderData);
      const result = getArrFromNestedSnap(snapshot, 'orderId', 'storeId');

      expect(result).toHaveLength(3);
      expect(result).toEqual([
        { orderId: 'order123', storeId: 'store1', items: ['item1', 'item2'], total: 100, status: 'pending' },
        { orderId: 'order456', storeId: 'store1', items: ['item3'], total: 50, status: 'completed' },
        { orderId: 'order789', storeId: 'store2', items: ['item4', 'item5'], total: 75, status: 'processing' }
      ]);
    });

    it('should handle empty nested collections', () => {
      const snapshot = new MockDataSnapshot(null);
      const result = getArrFromNestedSnap(snapshot);
      expect(result).toEqual([]);
    });

    it('should handle partially empty nested collections', () => {
      const mockPartialData = {
        'store1': {},
        'store2': {
          'order789': {
            items: ['item1'],
            total: 25
          }
        }
      };

      const snapshot = new MockDataSnapshot(mockPartialData);
      const result = getArrFromNestedSnap(snapshot);

      expect(result).toHaveLength(1);
      expect(result).toEqual([
        { id: 'order789', _id: 'store2', items: ['item1'], total: 25 }
      ]);
    });
  });
}); 