describe('App E2E', () => {
  context('when pokedex is empty', () => {
    it('should have a message with link', () => {
      cy.visit('/');

      cy.get('[data-testid=empty-message]').should(
        'have.text',
        "You dont't have any pokemón yet. Let's find here!"
      );

      cy.get('[data-testid=hunting-link]')
        .should('contain', 'here!')
        .and('have.attr', 'href', '/pokemons');
    });

    it('should redirect to hunting screen', () => {
      cy.get('[data-testid=hunting-link-button]')
        .should('have.text', 'Catch Pokémon')
        .click();

      cy.url().should('include', '/pokemons');
    });
  });

  context('when search a pokemon', () => {
    it('should focus input on load', () => {
      cy.focused().should('have.attr', 'data-testid', 'input-search');
    });

    it('should not submit form if input is empty', () => {
      cy.get('[data-testid=input-search]').type('{enter}');
      cy.get('input:invalid').should('have.length', 1);
    });
  });
});
