import { html, fixture, expect } from '@open-wc/testing';
import "../nasa-project.js";

describe("nasaProject test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <nasa-project
        title="title"
      ></nasa-project>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
