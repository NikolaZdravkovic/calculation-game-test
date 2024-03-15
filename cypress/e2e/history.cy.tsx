// cypress/integration/history.spec.js

describe('History component', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('displays calculation history correctly', () => {
        // Simulate user interaction to add history entries
        cy.get('#input-field').type('5');
        cy.contains('Submit').click();

        // Wait for the history table to appear
        cy.contains('Question').should('be.visible');

        // Verify that the table contains the expected rows and data
        cy.get('table').within(() => {
            cy.contains('td', '5').should('exist');
        });

        // Verify that the "Clear History" button appears
        cy.contains('Clear History').should('be.visible');
    });

    it('clears history when "Clear History" button is clicked', () => {
        // Simulate user interaction to add a history entry
        cy.get('#input-field').type('5');
        cy.contains('Submit').click();

        // Verify that the "Clear History" button appears
        cy.contains('Clear History').should('be.visible');

        // Click the "History" button
        cy.contains('History').click();

        // Verify that the "Clear History" button disappears
        cy.contains('Clear History').should('not.exist');

        // Verify that the table is empty and displays the new message
        cy.get('table').within(() => {
            cy.contains('The table is currently empty').should('be.visible');
        });
    });
});
