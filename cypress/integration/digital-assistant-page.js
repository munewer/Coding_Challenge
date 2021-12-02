///<reference types = "Cypress" />

describe("Validate digital assistant page of Ottonova",()=>{
    beforeEach(function(){
        cy.navigate_To_Homepage();

 /*        cy.fixture('example').then((data) => {
            globalThis.data = data;
        }) */
    })

    it.only("Validate error message when user age below 16",()=>{   
        
        //Select Jetzt Beitrag berechnen
        cy.get('[data-cy=intro-calculate-continue]').click({force: true});
        
        //Select Angestellt
        cy.get('#employed').check({force: true}).should("be.checked");
       
       //Enter an income of "70.000" 
        cy.get('.form-field').type("70000");
        cy.clickWeiterbutton();

        //Choose "Vollversicherung" and "01.01.2022" as start date in the dropdown 
        cy.get('#comprehensive').check({force: true}).should("be.checked");
        cy.get('[data-cy="ingress-date"]').select("01.01.2022");
        cy.clickWeiterbutton();

        
        cy.get('.birthday > .ng-tns-c59-9').shadow().find('.day').as("day");
        cy.get('.birthday > .ng-tns-c59-9').shadow().find('.month').as("month");
        cy.get('.birthday > .ng-tns-c59-9').shadow().find('.year').as("year");

        //Insert the birthdate "01.01.2010" and assert that a validation error 
        cy.get('@day').type("01");
        cy.get('@month').type("01");
        cy.get('@year').type("2010");
        cy.get('.error-message').contains("Leider kannst du dich erst ab 16 Jahren alleine versichern.")

   
        //Insert the birthdate "01.01.2022" and assert that a validation error 
        cy.clear_Birthday();
        cy.get('@day').type("01");
        cy.get('@month').type("02");
        cy.get('@year').type("2022");
        cy.get('.error-message').contains(" Du bist in der Zukunft geboren? Bitte überprüfe deine Eingaben. ")

        //Insert a valid birthdate and proceed to the next page. 
        cy.clear_Birthday();
        cy.get('@day').type("01");
        cy.get('@month').type("01");
        cy.get('@year').type("1990");
        cy.clickWeiterbutton();

    });

})