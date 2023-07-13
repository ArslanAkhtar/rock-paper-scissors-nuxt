import { mount } from "@vue/test-utils";
import Page from "./index.vue";

describe("index page", () => {
  it("shows interactive click counter", async () => {
    const page = mount(Page);
    expect(page.text()).toContain("Coming Soon!");
    // const button = page.find("button")
    // await button.trigger("click")
    // expect(page.text()).toContain("1 clicks")
  });
});
