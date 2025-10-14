import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
  },
});

describe('My First Test', () => {
  it('Visits the app', () => {
    cy.visit('/');
    cy.contains('Welcome to Your Vue.js App');
  });
});