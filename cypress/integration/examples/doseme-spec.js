/* =====================================
Author: Vinod Mathew
Testing tool: Cypress Version 3.1.0
Node version: v8.11.4
JS Editor: Atom 1.31.2
Operating System: Windows 8.1 Pro
Processor: Intel Core i5 3.10GHZ
RAM: 8GB
Running on test runner: Chrome 69 and Electron 59
===========================================*/


const t_weight = Cypress.env('test_weight');
const t_height = Cypress.env('test_height');
const t_age = Cypress.env('test_age');
const t_serum = Cypress.env('test_serum');
const t_pdose = Cypress.env('test_pastdose');
//const t_infusion = Cypress.env('test_infusion');
//const t_noofdose = Cypress.env('test_numberofdoses');

/*Cypress test - to test the Male/Female button action and text */

describe('Cypress test the Male/Female button action and text', function(){
it('Verify the Male/Female button selection is possible in Step-1', function(){
    cy.visit('/')
    cy.get('#sex >label>span').contains("Female").click()
      .then(($btn)=>{
        cy.wrap($btn).should('not.be.disabled');
        cy.wrap($btn).invoke('text').should('contain', 'Female');
      })
  })
});

/*Cypress test - using route test the post and verify the status and response message */

describe('Using Cypress route to test the post and verify status, response', function(){
it('Verify the status, response received', function(){
  cy.server();
  cy.route({
    method: 'POST',
    url : 'https://vancomycin-dosing-calculator.doseme.com.au/#/',
    body : {
      weight : '80',
      height: '180',
      age:  '35'
    },
    headers : {
      'Content-Type': 'text/html'
    }
  }).then(function (response) {
    console.log(response);
    expect(response.status).to.eq(200);
    expect(response.body.weight).to.eq('80');
    expect(response.body.height).to.eq('180');
    expect(response.body.age).to.eq('35');
    });
  })
});

/*Cypress test - In Step-1 of landing page enter Patient data */

describe('Cypress Step-1 enter Patient Data and Step-2 Previous Dose details', function(){

  before('Before test run to fill the patient data', () => {
    cy.wait(1000);
    cy.clearCookies();
    cy.resetPage();
    cy.patientdata(t_weight, t_height, t_age, t_serum);
  });

it('Verify whether the Patient data is able to enter in Step-1', function(){
    cy.viewport(1500, 900)
    cy.get('#weight').should('have.value', '85')
    cy.get('#height').should('have.value', '180')
    cy.get('#age').should('have.value', '35')
    cy.get('#secr').should('have.value', '2.5')
   })

/*Cypress test - In Step 2 page, enter Previous dose details and Calculate */

  it('Verify whether the data entered in Step 2: Previous Doses', function(){
    cy.get('button[type="submit"]').contains("Next ").click();
    cy.wait(1000)
    cy.get('#pastDose').type(t_pdose);
    cy.get('#pastDose').should('have.value', '250');
    cy.get('input[name="infusionLength"]').parents('.input-group').find('input ').clear().type('2', { force: true });
    cy.get('input[name="infusionLength"]').parents('.input-group').find('input ').should('have.value', '2');
    cy.get('select').select('q12h').should('have.value', 'q12h');
    cy.get('input[name="doseCount"]').parents('.input-group').find('input ').clear().type('3', { force: true });
    cy.get('input[name="doseCount"]').parents('.input-group').find('input ').should('have.value', '3');
    cy.get('button[type="submit"]').contains("Next ").click();
    cy.get('input[name="pastLevel"]').parents('.input-group').find('input ').clear().type('12', { force: true });
    cy.get('input[name="pastLevel"]').parents('.input-group').find('input ').should('have.value', '12');
    cy.get('button[type="submit"]').contains("Calculate ").click();
    cy.wait(2000);
    cy.get('.modal-content')
      .should('be.visible').should('contain', 'Before you continue...')
      .then(($dialog)=>{
        cy.wrap($dialog).find('form').find('div').find('div').find('div').find('div').find('label').contains("I agree; don't show this again").click().then(()=>{
            cy.get('#agreementModal___BV_modal_footer_ > button').contains("OK").click();
        });
  });
  cy.wait(2000);
    cy.get('h4').invoke('text').then((text)=>{
      const myText = text;
      var trimText = myText.replace(/(\r\n\t|\n|\r\t)/gm, "");
      console.log("Trimmed text:"+trimText);
      expect(trimText).to.include("Patient Summary  Edit");
       })
    })
})
