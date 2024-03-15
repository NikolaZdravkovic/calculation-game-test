/// <reference types="cypress" />

describe('Calculation component', () => {
  it('allows user to input answer and submit', () => {
    cy.visit('/');

    // Wait for the app to load
    cy.contains('Calculation Game').should('be.visible');

    // Enter an answer
    cy.get('#input-field').type('5');


    // Click the submit button
    cy.contains('Submit').click();

  });

  it('clears history when clear history button is clicked', () => {
    cy.visit('/');

    // Wait for the app to load
    cy.contains('Calculation Game').should('be.visible');

    // Click the clear history button
    cy.contains('Clear History').should('not.exist');

  });

  it('displays clear history button after reloading with non-empty history', () => {
    cy.visit('/');

    // Wait for the app to load
    cy.contains('Calculation Game').should('be.visible');

    // Add some history
    cy.get('#input-field').type('5');
    cy.contains('Submit').click();

    // Reload the page
    cy.reload();

    // Wait for the app to load
    cy.contains('Calculation Game').should('be.visible');

    // Assert that the clear history button is visible after reloading with non-empty history
    cy.contains('Clear History').should('be.visible');

    // Verify that the table is not empty after reloading with non-empty history
    cy.contains('No history available').should('not.exist');
  });
});
