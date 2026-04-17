describe('Notes App', () => {
  beforeEach(() => {
    cy.window().then((win) => win.localStorage.clear());
    cy.visit('/');
  });

  it('adds a note with text and date stamp', () => {
    cy.get('textarea').type('My first note');
    cy.contains('button', 'Add').click();
    cy.get('textarea').should('have.value', '');
    cy.contains('My first note').should('be.visible');
    cy.get('.shadow-md').should('have.length', 1);
    cy.get('.text-xs').should('exist');
  });

  it('adds a note via Ctrl+Enter', () => {
    cy.get('textarea').type('Keyboard shortcut note{ctrl+enter}');
    cy.contains('Keyboard shortcut note').should('be.visible');
  });

  it('prevents adding an empty note', () => {
    cy.contains('button', 'Add').should('be.disabled');
    cy.get('textarea').type('   ');
    cy.contains('button', 'Add').should('be.disabled');
  });

  it('removes a note', () => {
    cy.get('textarea').type('Note to delete');
    cy.contains('button', 'Add').click();
    cy.contains('Note to delete').should('be.visible');
    cy.get('[aria-label="Remove note"]').click();
    cy.contains('Note to delete').should('not.exist');
  });

  it('filters notes by search query', () => {
    cy.get('textarea').type('Buy apples');
    cy.contains('button', 'Add').click();
    cy.get('textarea').type('Read a book');
    cy.contains('button', 'Add').click();
    cy.get('textarea').type('Buy bananas');
    cy.contains('button', 'Add').click();

    cy.get('input[placeholder="Search notes..."]').type('Buy');
    cy.get('.shadow-md').should('have.length', 2);
    cy.contains('Read a book').should('not.exist');
  });

  it('shows empty state when search has no results', () => {
    cy.get('textarea').type('Some note');
    cy.contains('button', 'Add').click();
    cy.get('input[placeholder="Search notes..."]').type('zzzzz');
    cy.contains('No notes match your search.').should('be.visible');
  });

  it('toggles sort order', () => {
    cy.get('textarea').type('First note');
    cy.contains('button', 'Add').click();
    cy.wait(50);
    cy.get('textarea').type('Second note');
    cy.contains('button', 'Add').click();

    cy.get('.shadow-md').first().should('contain.text', 'Second note');
    cy.contains('button', 'Newest first').click();
    cy.get('.shadow-md').first().should('contain.text', 'First note');
  });

  it('paginates when there are many notes', () => {
    cy.contains('button', 'Seed 100 test notes').click();
    cy.get('.shadow-md').should('have.length', 12);
    cy.contains('1 / ').should('be.visible');

    cy.get('.shadow-md')
      .first()
      .invoke('text')
      .then((page1Text) => {
        cy.contains('button', 'Next').click();
        cy.contains('2 / ').should('be.visible');
        cy.get('.shadow-md').first().invoke('text').should('not.eq', page1Text);
      });
  });

  it('gives notes random background colors', () => {
    cy.get('textarea').type('Note A');
    cy.contains('button', 'Add').click();
    cy.get('textarea').type('Note B');
    cy.contains('button', 'Add').click();

    cy.get('.shadow-md')
      .eq(0)
      .invoke('css', 'background-color')
      .then((colorA) => {
        cy.get('.shadow-md')
          .eq(1)
          .invoke('css', 'background-color')
          .then((colorB) => {
            expect(colorA).to.match(/^rgb/);
            expect(colorB).to.match(/^rgb/);
          });
      });
  });

  it('persists notes across page reload', () => {
    cy.get('textarea').type('Persistent note');
    cy.contains('button', 'Add').click();
    cy.contains('Persistent note').should('be.visible');
    cy.reload();
    cy.contains('Persistent note').should('be.visible');
  });
});
