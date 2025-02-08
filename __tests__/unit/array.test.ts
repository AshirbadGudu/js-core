import { getArrFromObj, getArrFromSnap, getArrFromNestedSnap } from '../../lib';

describe('Array Transformation Utilities', () => {
  describe('getArrFromObj', () => {
    it('should convert object to array with default key', () => {
      const input = {
        '1': { name: 'John', age: 30 },
        '2': { name: 'Jane', age: 25 }
      };
      const expected = [
        { id: '1', name: 'John', age: 30 },
        { id: '2', name: 'Jane', age: 25 }
      ];
      expect(getArrFromObj(input)).toEqual(expected);
    });

    it('should use custom key name', () => {
      const input = {
        '1': { name: 'John', age: 30 },
        '2': { name: 'Jane', age: 25 }
      };
      const expected = [
        { uid: '1', name: 'John', age: 30 },
        { uid: '2', name: 'Jane', age: 25 }
      ];
      expect(getArrFromObj(input, 'uid')).toEqual(expected);
    });
  });

  describe('getArrFromSnap', () => {
    it('should handle empty snapshot', () => {
      const snap = {
        val: () => null,
        exists: () => false
      };
      expect(getArrFromSnap(snap)).toEqual([]);
    });

    it('should convert Firebase snapshot to array', () => {
      const snap = {
        val: () => ({
          '1': { name: 'John', age: 30 },
          '2': { name: 'Jane', age: 25 }
        }),
        exists: () => true
      };
      const expected = [
        { id: '1', name: 'John', age: 30 },
        { id: '2', name: 'Jane', age: 25 }
      ];
      expect(getArrFromSnap(snap)).toEqual(expected);
    });
  });

  describe('getArrFromNestedSnap', () => {
    it('should handle empty nested snapshot', () => {
      const snap = {
        val: () => null,
        exists: () => false
      };
      expect(getArrFromNestedSnap(snap)).toEqual([]);
    });

    it('should convert nested Firebase snapshot to array', () => {
      const snap = {
        val: () => ({
          'user1': {
            'order1': { product: 'A', quantity: 1 },
            'order2': { product: 'B', quantity: 2 }
          },
          'user2': {
            'order3': { product: 'C', quantity: 3 }
          }
        }),
        exists: () => true
      };
      const expected = [
        { id: 'order1', _id: 'user1', product: 'A', quantity: 1 },
        { id: 'order2', _id: 'user1', product: 'B', quantity: 2 },
        { id: 'order3', _id: 'user2', product: 'C', quantity: 3 }
      ];
      expect(getArrFromNestedSnap(snap)).toEqual(expected);
    });

    it('should use custom key names', () => {
      const snap = {
        val: () => ({
          'user1': {
            'order1': { product: 'A', quantity: 1 }
          }
        }),
        exists: () => true
      };
      const expected = [
        { orderId: 'order1', userId: 'user1', product: 'A', quantity: 1 }
      ];
      expect(getArrFromNestedSnap(snap, 'orderId', 'userId')).toEqual(expected);
    });
  });
}); 