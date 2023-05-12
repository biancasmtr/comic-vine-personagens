describe("Teste de carregamento de página", () => {
  it("Deve carregar a página corretamente", () => {
    cy.visit("http://localhost:3000");
    cy.title().should("include", "Personagens Comic Vine");
    cy.get("h1").should("contain", "Personagens Comic Vine");
  });
});

describe("Home page", () => {
    it("deve exibir o título", () => {
      cy.visit("/");
      cy.contains("Personagens Comic Vine");
    });
  });
  
  describe("Home Page", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("deve exibir o título", () => {
      cy.get("h1").should("have.text", "Personagens Comic Vine");
    });
  
    it("deve exibir caracteres quando a página carregar", () => {
      cy.get(".grid").should("be.visible");
      cy.get(".grid > div").should("have.length.gt", 0);
    });
  
    it("deve filtrar caracteres por nome", () => {
      cy.get(".grid > div").then((characters) => {
        const characterCount = characters.length;
        const searchTerm = "Spider";
  
        cy.get("input[type='text']").type(searchTerm);
        cy.get(".grid > div").should("have.length.lt", characterCount);
  
        cy.get("input[type='text']").clear();
        cy.get(".grid > div").should("have.length", characterCount);
      });
    });
  
    it("deve limpar o termo de pesquisa quando o botão limpar for clicado", () => {
      const searchTerm = "Iron Man";
  
      cy.get("input[type='text']").type(searchTerm);
      cy.get(".grid > div").should("have.length.lt", 100);
  
      cy.contains("Limpar").click();
      cy.get("input[type='text']").should("have.value", "");
      cy.get(".grid > div").should("have.length", 100);
    });
  
    it("deve navegar para a página de detalhes do personagem quando um personagem é clicado", () => {
      cy.get(".grid > div").first().click();
      cy.url().should("include", "/character/");
    });
  });
  

  