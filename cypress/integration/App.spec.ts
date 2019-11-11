describe('App E2E', () => {
  before(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
  });

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

    it('should not find a pokemon', () => {
      cy.get('[data-testid=input-search]').type('notfound{enter}');
      cy.get('[data-testid=empty-message]').should(
        'have.text',
        "Sorry, we did'nt find the pokémon. Try new search!"
      );
    });

    it('should find a pokemon', () => {
      cy.get('[data-testid=input-search]')
        .clear()
        .type('pikachu{enter}');

      cy.get('[data-testid=pokecard-header]')
        .should('contain', 'pikachu')
        .and('contain', '#25');

      cy.get('[data-testid=pokecard-image]').should(
        'have.css',
        'background-image',
        'url("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png")'
      );

      cy.get('[data-testid=pokecard-image]').should(
        'have.css',
        'background-image',
        'url("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png")'
      );

      cy.get('[aria-label="Release"]').should('not.exist');
      cy.get('[aria-label="See more"]').should('be.visible');
      cy.get('[aria-label="Catch"]').should('be.visible');
    });

    it('should redirect to pokemon detail screen', () => {
      cy.get('[data-testid=pokecard-image]').click();
      cy.url().should('include', '/pokemons/25');
    });
  });

  context('when see pokemon details ', () => {
    it('should catch this pokemon', () => {
      cy.get('[aria-label="Release"]').should('not.exist');
      cy.get('[aria-label="Catch"]')
        .should('be.visible')
        .click();
      cy.get('[aria-label="Release"]').should('exist');
    });
  });

  context('when pokedex is not empty', () => {
    it('should see pokemon catched', () => {
      cy.visit('/');
      cy.get('[data-testid=pokecard]').should('have.length', 1);
    });
  });
});
