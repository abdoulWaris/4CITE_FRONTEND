describe('Akkord App e2e testing', () => {
    beforeEach(() => {
      // Visiter la page où ton formulaire est rendu
      cy.visit('http://localhost:3000');
     //cy.visit('http://10.1.0.183:3000');
    });

    it('shoul click on home button', () => {
      cy.contains('Accueil').click();
      cy.url().should('include', '/');
    });

    it('shoul click on Hotel list', () => {
      cy.contains('Accueil').click();
      cy.url().should('include', '/');
      cy.get('button[type="button"]').click();
    });

    it('click on Inscription', () => {
      cy.contains('Inscription').click();
      cy.get('input[name="firstName"]').type('John Doe');
      cy.get('input[name="lastName"]').type('John Doe');
      cy.get('input[name="email"]').type('JohnDoe@test.com');
      cy.get('input[name="password"]').type('Test@1234');
      cy.get('input[name="confirmPassword"]').type('Test@1234');
      cy.get('button[type="submit"]').click();
    });

    it('should display validation errors for empty fields', () => {
      cy.contains('Connexion').click();
      cy.get('form').submit();
  
      // Vérifier que les erreurs de validation apparaissent
      cy.get('<div class="MuiAlert-message css-zioonp-MuiAlert-message">Une erreur est survenue lors de la connexion</div>');
    });

    it('should display an error message if the email is invalid', () => {
      cy.contains('Connexion').click();
      cy.get('input[name="email"]').type('test');
      cy.get('form').submit();
  
      // Vérifier que le message d'erreur apparaît
     //cy.contains('Adresse email invalide').should('exist');
    });

    it('should display required text fields', () => {
      cy.contains('Connexion').click();
      cy.get('form').submit();
    });

    it('should display an error message for invalid email and password', () => {
      cy.contains('Connexion').click();
      cy.get('input[name="email"]').type('test');
      cy.get('input[name="password"]').type('test');
      cy.get('form').submit();
    });
});