import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../serveur';
import Book from '../models/book';

chai.use(chaiHttp);


describe('Book Controller', () => {
  beforeEach(async () => {
    await Book.deleteMany({});
  });

  it('devrait enregistrer un livre avec succès', async () => {
    const bookData = {
      titre: 'Test Book',
      auteur: 'Test Author',
      annee: '2023',
      ISBN: '1234567890'
    };

    const response = await chai
      .request(app)
      .post('/enregistrer')
      .send(bookData);

    chai.expect(response).to.have.status(201);
    chai.expect(response.body).to.have.property('id');

    const bookInDatabase = await Book.findById(response.body.id);
    chai.expect(bookInDatabase).to.exist;
    chai.expect(bookInDatabase.titre).to.equal(bookData.titre);
  });

});