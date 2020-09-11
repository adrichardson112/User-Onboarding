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
        
        
    })
})