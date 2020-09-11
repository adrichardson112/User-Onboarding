describe("Testing our form", () => {
    const user = cy
    beforeEach(() => {
        cy.visit("http://localhost:3000/")
    })

    it("fills out form", () => {
        const name = 'Ashley'
        const email = 'ashley-richardson@lambdastudents.com'
        const userPassword = 'password'

        //checking name input
        cy.get('[data-cy=namefield]')
        .type("Ashley")
        .should('have.value', 'Ashley')
        
        cy.get('[data-cy=emailfield')
        .type("ashley-richardson@lambdastudents.com")
        .should('have.value', 'ashley-richardson@lambdastudents.com')
        
        cy.get('[data-cy=passwordfield')
        .type("password")
        .should('have.value', "password")

        cy.get('[data-cy=termsfield')
        .check()
        .should('be.checked')

        cy.get('input')
        .should('be.empty')

        cy.get("button").click()
    })
})