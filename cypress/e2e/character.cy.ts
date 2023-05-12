describe("Pagina do personagem", function () {
    it("deve exibir o nome do personagem", function () {
      cy.visit("/character/1260");
      cy.get("h1").should("contain", "Thom Kallor");
    });
  
    it("deve exibir a imagem do personagem", function () {
      cy.visit("/character/1260");
      cy.get("img").should("have.attr", "alt", "Thom Kallor");
      cy.get("img").should("have.attr", "src").should("include", "https://comicvine.gamespot.com/a/uploads/original/6/68065/8224022-starboy.jpg");
    });
  
    it("deve exibir o nome real do personagem", function () {
      cy.visit("/character/1260");
      cy.contains("Nome real:").should("exist");
    });
  
    it("deve exibir o apelido do personagem", function () {
      cy.visit("/character/1260");
      cy.contains("Outros nomes:").should("exist");
    });
  
    it("deve mostrar o gênero do personagem", function () {
      cy.visit("/character/1260");
      cy.contains("Gênero:").should("exist");
    });

    it("deve voltar para a página inicial quando o botão 'Voltar' for clicado", function () {
      cy.visit("/character/1260");
      cy.get("button").contains("Voltar").click();
      cy.url().should("not.include", "/character/1260");
    });
  });

  