describe('Pages flow',() => {
    it('visits homepage', () => {
        cy.visit('/');
        cy.contains('h1', 'Trouvez vos besoins en un seul clique et facilement')
    })
})