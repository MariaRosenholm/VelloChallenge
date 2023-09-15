import test, { describe } from 'node:test';
import assert from 'node:assert';
import DatabaseTable from '../../src/lib/DatabaseTable.js';

const db = DatabaseTable.getInstance('person', {});

describe('Database', () => {
  describe('CRUD operations on person table', () => {

    let id = null;
  
    test('Create person', (t) => {
      const person = db.putDocument({
        name: 'test name',
        address: 'testkatu 55',
        city: 'Helsinki',
        age: 55,
      });
    
      assert.equal(person.name, 'test name');
      assert.equal(person.address, 'testkatu 55');
      assert.equal(person.city, 'Helsinki');
      assert.equal(person.age, 55);
      assert.equal(typeof person.id, 'number');

      id = person.id;
    });
    
    test('Test retrieving from database', (t) => {
      const person = db.getDocument(id);
    
      assert.equal(person.name, 'test name');
      assert.equal(person.address, 'testkatu 55');
      assert.equal(person.city, 'Helsinki');
      assert.equal(person.age, 55);
      assert.equal(person.id, id);
    });

    test('Test updating a document', (t) => {

      const status = db.updateDocument(id, {
        address: 'testtie 123',
        city: 'Tampere',
      });

      assert.equal(status, true);

      const person = db.getDocument(id);
    
      assert.equal(person.name, 'test name');
      assert.equal(person.address, 'testtie 123');
      assert.equal(person.city, 'Tampere');
      assert.equal(person.age, 55);
      assert.equal(person.id, id);
    });

    test('Test indexing a document', (t) => {
      const index = db.indexDocuments();

      assert.equal(index.length, 1);
      
      const person = index[0];
    
      assert.equal(person.name, 'test name');
      assert.equal(person.address, 'testtie 123');
      assert.equal(person.city, 'Tampere');
      assert.equal(person.age, 55);
      assert.equal(person.id, id);
    });

    test('Test deleting a document', (t) => {
      const status = db.deleteDocument(id);

      assert.equal(status, true);

      const person = db.getDocument(id);

      assert.equal(person, null);
    });

  });
});
