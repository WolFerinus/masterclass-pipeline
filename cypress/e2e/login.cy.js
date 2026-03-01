describe('Login', () => {
  it('deve realizar login com sucesso', () => {
    // Ajuste a URL conforme a aplicação alvo (usa baseUrl do cypress.config.js)
    cy.visit('/login');

    const email = Cypress.env('LOGIN_EMAIL') || 'usuario@exemplo.com';
    const senha = Cypress.env('LOGIN_PASSWORD') || 'Senha123';

    cy.get('.account_form').should('be.visible').within(() => {
      cy.contains('h3', 'Login').should('be.visible');

      cy.get('#user').should('be.visible').clear().type(email);
      cy.get('#password').should('be.visible').clear().type(senha, { log: false });

      cy.get('#btnLogin').should('be.enabled').click();
    });

    cy.get('#swal2-title', { timeout: 10000 })
      .should('be.visible')
      .and('have.text', 'Login realizado');
  });

  it('deve exibir erro quando e-mail estiver vazio', () => {
    cy.visit('/login');

    const senha = Cypress.env('LOGIN_PASSWORD') || 'Senha123';

    cy.get('.account_form').should('be.visible').within(() => {
      cy.get('#user').should('be.visible').clear().blur();
      cy.get('#password').should('be.visible').clear().type(senha, { log: false });

      cy.get('#btnLogin').should('be.enabled').click();

      cy.contains('span.invalid_input', 'E-mail inválido.')
        .should('be.visible');
    });
  });

  it('deve exibir erro quando e-mail invalido ', () => {
    cy.visit('/login');

    const emailInvalido = 'email-invalido';
    const senha = Cypress.env('LOGIN_PASSWORD') || 'Senha123';

    cy.get('.account_form').should('be.visible').within(() => {
      cy.get('#user').should('be.visible').clear().type(emailInvalido);
      cy.get('#password').should('be.visible').clear().type(senha, { log: false });

      cy.get('#btnLogin').should('be.enabled').click();

      cy.contains('span.invalid_input', 'E-mail inválido.')
        .should('be.visible');
    });
  });

  it('deve exibir erro quando senha estiver vazia', () => {
    cy.visit('/login');

    const email = Cypress.env('LOGIN_EMAIL') || 'usuario@exemplo.com';

    cy.get('.account_form').should('be.visible').within(() => {
      cy.get('#user').should('be.visible').clear().type(email);
      cy.get('#password').should('be.visible').clear().blur();

      cy.get('#btnLogin').should('be.enabled').click();

      cy.contains('span.invalid_input', 'Senha inválida.')
        .should('be.visible');
    });
  });

  it('deve exibir erro quando senha tiver menos de 6 caracteres', () => {
    cy.visit('/login');

    const email = Cypress.env('LOGIN_EMAIL') || 'usuario@exemplo.com';
    const senhaCurta = '12345';

    cy.get('.account_form').should('be.visible').within(() => {
      cy.get('#user').should('be.visible').clear().type(email);
      cy.get('#password').should('be.visible').clear().type(senhaCurta, { log: false });

      cy.get('#btnLogin').should('be.enabled').click();

      cy.contains('span.invalid_input', 'Senha inválida.')
        .should('be.visible');
    });
  });
});
