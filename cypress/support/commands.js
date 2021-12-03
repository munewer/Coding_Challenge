// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//Click Weiter button
Cypress.Commands.add("clickWeiterbutton", () => {
    cy.get('[type="submit"]').click();
})

//Navigate to webdriveruni homepage via custom command
Cypress.Commands.add("navigate_To_Homepage", () => {
    cy.visit("/");
})

//Enter the birthdate in the text box, format should be like 'dd-mm-yyy'(01-01-2022)
Cypress.Commands.add("enter_Birthday",(day,month,year)=>{
    cy.get('.birthday > .ng-tns-c59-9').shadow().find('.day').type(day);
    cy.get('.birthday > .ng-tns-c59-9').shadow().find('.month').type(month);
    cy.get('.birthday > .ng-tns-c59-9').shadow().find('.year').type(year);
})

Cypress.Commands.add("clear_Birthday",()=>{
    cy.get('.birthday > .ng-tns-c59-9').shadow().find('.birthday').clear();
})