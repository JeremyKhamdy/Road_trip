import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Card from "../Card.vue";

describe("Homepage", () => {
  it("renders properly", () => {
    const wrapper = mount(Card, { props: { msg: "Hello Vitest" } });
    expect(wrapper.text()).toContain("Hello Vitest");
  });
});
