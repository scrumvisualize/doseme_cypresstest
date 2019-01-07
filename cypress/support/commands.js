
Cypress.Commands.add('resetPage', () => {
   cy.visit('/')
   cy.get('button[type="reset"]').contains("Reset").click();
});


Cypress.Commands.add('patientdata', (weight, height, age, serum) => {
  // cy.visit('/')
   //cy.get('button[type="reset"]').contains("Reset").click()
   cy.get('#weight').type(weight);
   cy.get('#height').type(height);
   cy.get('#age').type(age);
   cy.get('#secr').type(serum);
});


Cypress.Commands.add('previousdose', (pdose, infusion, numberofdoses) => {
   cy.get('#pastDose').type(pdose);
   cy.get('input[name="infusionLength"]').parents('.input-group').find('input ').type(infusion);
   cy.get('select').select('q12h').should('have.value', 'q12h');
   cy.get('#doseCount').type(numberofdoses);
});
