describe('Cadastro de usuário', () => {
  it('deve exibir erro quando nome estiver vazio', () => {
    cy.visit('/register');

    const email = `qa_${Date.now()}@exemplo.com`;
    const senha = Cypress.env('REGISTER_PASSWORD') || 'Senha1234';

    cy.get('.account_form').should('be.visible').within(() => {
      cy.contains('h3', 'Cadastro de usuário').should('be.visible');

      cy.get('#user').should('be.visible').clear().blur();
      cy.get('#email').should('be.visible').clear().type(email);
      cy.get('#password').should('be.visible').clear().type(senha, { log: false });

      cy.get('#btnRegister').should('be.enabled').click();

      cy.contains('span.errorLabel', 'O campo nome deve ser prenchido')
        .should('be.visible');
    });
  });

  it('deve exibir erro quando e-mail estiver vazio', () => {
    cy.visit('/register');

    const nome = Cypress.env('REGISTER_NAME') || 'Usuário QA';
    const senha = Cypress.env('REGISTER_PASSWORD') || 'Senha1234';

    cy.get('.account_form').should('be.visible').within(() => {
      cy.get('#user').should('be.visible').clear().type(nome);
      cy.get('#email').should('be.visible').clear().blur();
      cy.get('#password').should('be.visible').clear().type(senha, { log: false });

      cy.get('#btnRegister').should('be.enabled').click();

      cy.contains('span.errorLabel', 'O campo e-mail deve ser prenchido corretamente')
        .should('be.visible');
    });
  });

  it('deve exibir erro quando e-mail estiver inválido (fora do padrão)', () => {
    cy.visit('/register');

    const nome = Cypress.env('REGISTER_NAME') || 'Usuário QA';
    const emailInvalido = 'email-invalido';
    const senha = Cypress.env('REGISTER_PASSWORD') || 'Senha1234';

    cy.get('.account_form').should('be.visible').within(() => {
      cy.get('#user').should('be.visible').clear().type(nome);
      cy.get('#email').should('be.visible').clear().type(emailInvalido);
      cy.get('#password').should('be.visible').clear().type(senha, { log: false });

      cy.get('#btnRegister').should('be.enabled').click();

      cy.contains('span.errorLabel', 'O campo e-mail deve ser prenchido corretamente')
        .should('be.visible');
    });
  });

  it('deve exibir erro quando senha estiver vazia', () => {
    cy.visit('/register');

    const nome = Cypress.env('REGISTER_NAME') || 'Usuário QA';
    const email = `qa_${Date.now()}@exemplo.com`;

    cy.get('.account_form').should('be.visible').within(() => {
      cy.get('#user').should('be.visible').clear().type(nome);
      cy.get('#email').should('be.visible').clear().type(email);
      cy.get('#password').should('be.visible').clear().blur();

      cy.get('#btnRegister').should('be.enabled').click();

      cy.contains('span.errorLabel', 'O campo senha deve ter pelo menos 6 dígitos')
        .should('be.visible');
    });
  });

  it('deve exibir erro quando senha tiver menos de 6 dígitos', () => {
    cy.visit('/register');

    const nome = Cypress.env('REGISTER_NAME') || 'Usuário QA';
    const email = `qa_${Date.now()}@exemplo.com`;
    const senhaCurta = '12345';

    cy.get('.account_form').should('be.visible').within(() => {
      cy.get('#user').should('be.visible').clear().type(nome);
      cy.get('#email').should('be.visible').clear().type(email);
      cy.get('#password').should('be.visible').clear().type(senhaCurta, { log: false });

      cy.get('#btnRegister').should('be.enabled').click();

      cy.contains('span.errorLabel', 'O campo senha deve ter pelo menos 6 dígitos')
        .should('be.visible');
    });
  });

  it('deve cadastrar usuário com sucesso', () => {
    cy.visit('/register');

    const nome = Cypress.env('REGISTER_NAME') || 'Usuário QA';
    const email = `qa_${Date.now()}@exemplo.com`;
    const senha = Cypress.env('REGISTER_PASSWORD') || 'Senha1234';

    cy.get('.account_form').should('be.visible').within(() => {
      cy.get('#user').should('be.visible').clear().type(nome);
      cy.get('#email').should('be.visible').clear().type(email);
      cy.get('#password').should('be.visible').clear().type(senha, { log: false });

      cy.get('#btnRegister').should('be.enabled').click();
    });

    cy.get('#swal2-title', { timeout: 10000 })
      .should('be.visible')
      .and('have.text', 'Cadastro realizado!');
  });
});
