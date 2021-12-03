///<reference types = "Cypress" />

describe("Validate error error messages that related birthday textbox and API request body",()=>{
    beforeEach(function(){
        cy.navigate_To_Homepage();

        cy.fixture('example').then((data) => {
            globalThis.data = data;
        })
    })

    it("Validate error message when user age below 16",()=>{   

        //possible solution for validation of the API request body 
        //cy.intercept({method:'POST',url:"**/sst.ottonova.de/*"}).as("newDate");
        
        
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


        //Insert the birthdate "01.01.2010" and assert that a validation error 
        cy.enter_Birthday("01","01","2010");
        cy.get('.error-message').contains(data.error_message_under16);

   
        //Insert the birthdate "01.02.2022" and assert that a validation error 
        cy.clear_Birthday();
        cy.enter_Birthday("01","02","2022");
        cy.get('.error-message').contains(data.error_message_furtherbirthdate);

        //Insert a valid birthdate and proceed to the next page. 
        cy.clear_Birthday();
        cy.enter_Birthday("03","02","1990");
        cy.clickWeiterbutton();



        //possible solution for validation of the API request body 
/*         cy.wait('@newDate').should(({request,response})=>{
            cy.log("Request: "+JSON.stringify(request));
            cy.log("Response: "+ JSON.stringify(response));

            expect(response.statusCode).to.eq(200);
            expect(request.body.el).to.eq("03.02.1990");
        }) */
    });

})