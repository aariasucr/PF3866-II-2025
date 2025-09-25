describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://websitedemos.net/brandstore-02/");

    // Es el mismo selector, pero el 1ero es muy largo y dificil de leer
    // El segundo puede fallar por usar ~=, pero es mas facil de leer
    //cy.get(
    //  "#post-10 > div > div > div.elementor-element.elementor-element-aef5fd5.e-flex.e-con-boxed.e-con.e-parent.e-lazyloaded > div > div > div.elementor-element.elementor-element-1f905f6.elementor-widget.elementor-widget-heading.animated.fadeIn > div > h3"
    //).contains("25%");

    cy.get("h3[class~='elementor-heading-title']").contains("25%");

    cy.scrollTo(0, 2000);

    // Click directo falla por lazy loading
    // Usamos scroll antes de click
    cy.get(
      "#post-10 > div > div > div.elementor-element.elementor-element-1d45057.e-flex.e-con-boxed.e-con.e-parent.e-lazyloaded > div > div > div.elementor-element.elementor-element-f628c74.elementor-widget.elementor-widget-shortcode > div > div > div > ul > li.ast-article-single.desktop-align-left.tablet-align-left.mobile-align-left.product.type-product.post-362.status-publish.first.instock.product_cat-men.has-post-thumbnail.sale.featured.shipping-taxable.purchasable.product-type-simple"
    ).click();

    // Agregar al carrito
    cy.get("button[name='add-to-cart']").click();

    // Ir al carrito
    cy.get("#main > div > div.woocommerce-notices-wrapper > div > a").click();

    cy.get("#coupon-error-notice").should("not.exist");

    const coupon = "PATITO PATITO";

    cy.get("#coupon_code").type(coupon);
    cy.get("button[name='apply_coupon']").click();
    cy.get("#coupon-error-notice")
      .should("be.visible")
      .contains(coupon, { matchCase: false });

    //Ir al Checkout
    //cy.get(
    //  "#post-39 > div > div > section.elementor-section.elementor-top-section.elementor-element.elementor-element-4c824ebb.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default > div > div > div > div > div > div > div > div.cart-collaterals > div > div > a"
    //).click();

    // Rellenar formulario
    // En esta pagina falla por un error de JS de WordPress
    //cy.get("#billing_first_name").type("Juan");
  });
});
