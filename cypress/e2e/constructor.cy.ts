import * as tokens from '../fixtures/tokens.json';

const selectors = {
  bun: '[data-cy="bun"]',
  bunTop: '[data-cy="bun-top"]',
  bunBottom: '[data-cy="bun-bottom"]',
  main: '[data-cy="main"]',
  mainComponent: '[data-cy="main-component"]',
  modal: '[data-cy="modal"]',
  modalButton: '[data-cy="modal-button"]',
  overlay: '[data-cy="modal-overlay"]',
  orderNumber: '[data-cy="orderNumber"]'
};

describe('Проверка конструктора', function () {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    window.localStorage.setItem('accessToken', tokens.accessToken);
    cy.setCookie('refreshToken', tokens.refreshToken);
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    cy.visit('/');
  });
  afterEach(() => {
    window.localStorage.removeItem('accessToken');
    cy.clearCookie('refreshToken');
  });
  describe('Проверка составления бургера', function () {
    it('Проверка добавления булки', function () {
      cy.get(selectors.bunTop).should('not.exist');
      cy.get(selectors.bunBottom).should('not.exist');
      cy.get(selectors.bun)
        .eq(0)
        .within(() => {
          cy.contains('Добавить').click();
        });
      cy.get(selectors.bunTop).should('exist');
      cy.get(selectors.bunBottom).should('exist');
    });
    it('Проверка добавления начинки', function () {
      cy.get(selectors.mainComponent).should('not.exist');
      cy.get(selectors.main)
        .eq(0)
        .within(() => {
          cy.contains('Добавить').click();
        });
      cy.get(selectors.mainComponent).should('exist');
    });
  });
  describe('Проверка модального окна', function () {
    it('Проверка открытия модального окна', function () {
      cy.get(selectors.bun)
        .eq(0)
        .within(() => {
          cy.get('.text_type_main-default').invoke('text').as('bunName');
        });
      cy.get(selectors.bun)
        .eq(0)
        .within(() => {
          cy.get('a').click();
        });
      cy.get(selectors.modal).should('exist');
      cy.get('@bunName').then((bunName) => {
        cy.get(selectors.modal).within(() => {
          cy.get('h3').should('contain', bunName);
        });
      });
    });
    it('Проверка закрытия модального окна на крестик', function () {
      cy.get(selectors.bun)
        .eq(0)
        .within(() => {
          cy.get('a').click();
        });
      cy.get(selectors.modalButton).click();
      cy.get(selectors.modal).should('not.exist');
    });
    it('Проверка закрытия модального окна по оверлею', function () {
      cy.get(selectors.bun)
        .eq(0)
        .within(() => {
          cy.get('a').click();
        });
      cy.get(selectors.overlay).click({ force: true });
      cy.get(selectors.modal).should('not.exist');
    });
  });
  describe('Проверка отправки бургера', function () {
    it('Проверка оформления заказа', function () {
      cy.get(selectors.bun).eq(0).contains('Добавить').click();
      cy.get(selectors.main).eq(0).contains('Добавить').click();
      cy.contains('Оформить заказ').click();
      cy.get(selectors.modal).should('exist');
      cy.fixture('order.json').then((order) => {
        cy.get(selectors.orderNumber).should('contain', order.order.number);
      });
      cy.get(selectors.modalButton).click();
      cy.get(selectors.modal).should('not.exist');
      cy.get(selectors.bunTop).should('not.exist');
      cy.get(selectors.bunBottom).should('not.exist');
      cy.get(selectors.mainComponent).should('not.exist');
    });
  });
});
