context('Testing test', () => {
  // beforeEach(() => {
  //   cy.visit('http://localhost:3000/');
  // });

  before(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Validar si la tarea por defecto es creada', () => {
    cy.get('.todo-list li').should('have.length', 1);
    cy.get('.todo-list li:first .view label')
      .and(($div) => {
        expect($div.text()).to.eq('Use Redux');
      });
  });

  it('Agregar 1 todo', () => {
    cy.get('.new-todo')
      .type('Learn testing using Cypress{enter}');
    cy.get('.todo-list li').should('have.length', 2);
  });

  it('Editar la primera todo agregada', () => {
    cy.get('.todo-list li:first .view label').dblclick();
    cy.get('.todo-list').within(() => {
      // cy.get('.editing .edit')
      //   .type('{selectall}{del}Use Cypress{enter}');
      cy.get('.editing .edit')
        .clear()
        .type('Use Cypress{enter}');
    });
  });

  it('Marcar la primera tarea como completada', () => {
    cy.get('.todo-list li:first').within(() => {
      cy.get('.toggle').click();
    });
    cy.get('.todo-list li:first').should('have.class', 'completed');
  });

  it('Eliminar la ultima tarea agregada', () => {
    cy.get('.todo-list li:last')
      .within(() => {
        cy.get('.destroy').invoke('show').click();
      });
    cy.get('.todo-list li').should('have.length', 1);
  });
});
