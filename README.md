Test Cases:
1)Check the button Male/Female button selection
2) Verify the post submission and check response status, data
3) Enter Patient Data in Step-1 
4) Enter Previous Dose details in Step-2, click on the Calculate button and check the Patient Summary and handled the 'I agree and don't show this again' dialog

Regarding the spec/ test file and other test configuration:

1) 
The doseme-spec.js test spec is available in the following path:

   \cypress\integration\examples

2) 
I have written below functions in 'commands.js' file so it gives the flexibility of reusing at any / number of time
   \cypress\support\
  cy.resetPage(), 
  cy.patientdata(t_weight, t_height, t_age, t_serum);
  cy.previousdose(t_pdose, t_infusion, t_noofdose);

3)
I have defined all the parameters for the page in Cypress.env.json file, its available in the root folder
C:\doseme\node_modules\.bin 
{
"test_weight": "85",
"test_height": "180",
"test_age": "35",
"test_serum": "2.5",
"test_pastdose": "250",
"test_infusion": "2",
"test_numberofdoses": "3"
}

4)
The baseUrl is configured in the cypress.json file and also available in the root folder
"baseUrl": "https://vancomycin-dosing-calculator.doseme.com.au/#/"

Command to run the test file: 

Run the spec/ test file from the command prompt: 

First navigate to the Cypress folder directory>>  C:\doseme\node_modules\.bin
Then type this command cypress run --record --headed --no-exit 'cypress/integration/doseme-spec.js'

Run the test from the test runner:

First navigate to the Cypress folder directory>>  C:\doseme\node_modules\.bin  
Then type command and enter  cypress open