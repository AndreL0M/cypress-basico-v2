/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
    const TRES_SEGUNDOS = 3000

    beforeEach(() => {
    
        cy.visit("./src/index.html")

    });

    it('verifica o título da aplicação', () => {
  
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')

    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        
        cy.clock()

        cy.get('#firstName').type('Andre Lucas')
        cy.get('#lastName').type('Marques')
        cy.get('#email').type('marquesandre@exemplo.com')
        cy.get('#open-text-area').type('It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',{delay:0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
        cy.tick(TRES_SEGUNDOS)
        cy.get('.success').should('not.be.visible')

    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        
        cy.clock()
        cy.get('#firstName').type('Andre Lucas')
        cy.get('#lastName').type('Marques')
        cy.get('#email').type('emailerrado,cum')
        cy.get('#open-text-area').type('It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',{delay:0})
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        cy.tick(TRES_SEGUNDOS)
        cy.get('.error').should('not.be.visible')

    });

    it('campo de telefone continua vazio quando for preenchido com valor nao numerico', () => {
        
        cy.get('#phone').type('Teste').should('have.value', '')

    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        
        cy.clock()
        cy.get('#firstName').type('Andre Lucas')
        cy.get('#lastName').type('Marques')
        cy.get('#email').type('marquesandre@exemplo.com')
        cy.get('#open-text-area').type('It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',{delay:0})
        cy.get('#phone-checkbox').check()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        cy.tick(TRES_SEGUNDOS)
        cy.get('.error').should('not.be.visible')

    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        
        cy.get('#firstName').type('Andre Lucas').clear().should('have.value', '')
        cy.get('#lastName').type('Marques').clear().should('have.value', '')
        cy.get('#email').type('marquesandre@exemplo.com').clear().should('have.value', '')
        cy.get('#phone').type('8509004148').clear().should('have.value', '')

    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        
        cy.clock()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        cy.tick(TRES_SEGUNDOS)
        cy.get('.error').should('not.be.visible')

    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
        
        cy.clock()
        cy.formularioPreenchidoEEnviado()
        cy.get('.success').should('be.visible')
        cy.tick(TRES_SEGUNDOS)
        cy.get('.success').should('not.be.visible')

    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        
        cy.get('select').select('YouTube').should('have.value', 'youtube')

    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        
        cy.get('select').select('mentoria').should('have.value', 'mentoria')

    });

    it('seleciona um produto (Blog) por seu índice', () => {
        
        cy.get('select').select(1).should('have.value', 'blog')

    });

    it('verifica o título da aplicação', () => {
  
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })
    
    it('Testando o input radio', () => { 
         
        cy.get('input[type="radio"][value="feedback"]').check().should('be.checked') 
 
    }); 
 
    it('marca cada tipo de atendimento', () => { 
         
        cy.get('input[type="radio"]') 
        .each(function($radio) { 
        cy.wrap($radio).check() 
        cy.wrap($radio).should('be.checked') 
        }) 
 
    }); 
 
    it('marca ambos checkboxes, depois desmarca o último', () => { 
         
        cy.get('input[type="checkbox"]').check().should('be.checked') 
        .last().uncheck().should('not.be.checked') 
 
    }); 
 
    it('seleciona um arquivo da pasta fixtures', () => { 
         
        cy.get('input[type="file"]').selectFile('cypress/fixtures/Instruçoes Windows 10 Pro.pdf').should(input => { 
            expect(input[0].files[0].name).to.equal('Instruçoes Windows 10 Pro.pdf') 
         }); 
 
    }); 
 
    it('seleciona um arquivo simulando um drag-and-drop', () => { 
         
        cy.get('input[type="file"]').selectFile('cypress/fixtures/Instruçoes Windows 10 Pro.pdf', {action: 'drag-drop'}).should(input => { 
            expect(input[0].files[0].name).to.equal('Instruçoes Windows 10 Pro.pdf') 
         }); 
 
    }); 
 
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => { 
         
        cy.fixture('Instruçoes Windows 10 Pro.pdf').as('arquivoTeste') 
        cy.get('input[type="file"]').selectFile('@arquivoTeste').should(input => { 
            expect(input[0].files[0].name).to.equal('Instruçoes Windows 10 Pro.pdf') 
        }) 
 
    }); 
 
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => { 
         
        cy.get('#privacy a').should('have.attr', 'target', '_blank') 
 
    }); 
 
    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => { 
         
        cy.get('#privacy a').invoke('removeAttr', 'target').click() 
        cy.contains('CAC TAT - Política de privacidade').should('be.visible') 
 
    }); 

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () => {
        
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')

    });

    it('preenche a area de texto usando o comando invoke', () => {
        
        const longText = Cypress._.repeat('Texto preenche a area de texto usando o comando invoke ', 10)
        
        cy.get('#open-text-area').invoke('val', longText).should('have.value', longText)

    });


  })
  