describe('MyForm', () => {
    beforeEach(() => {
      // Visiter la page où ton formulaire est rendu
      cy.visit('http://localhost:3000');
    });

    it('click on Connexxion', () => {
      cy.contains('Inscription').click();
      cy.get('input[name="firstName"]').type('John Doe');
      cy.contains('Connexion').click();
    })
});