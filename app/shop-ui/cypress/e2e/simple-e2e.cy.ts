context('Simple e2e tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/food');
  });

  describe('Left Menu', () => {
    it('Shows the menu when clicked', () => {
      cy.get('.clickable').first().click();
    });

    it('Has 4 links in the horizontal menu', () => {
      cy.get('.navLink').should('have.length', 4);
    });

    it('Shows render 3 rows', () => {
      cy.get('app-shop-item').should('have.length', 3);
    });
  });
});
