import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlatformTabs } from "@/components/sections/PlatformTabs";

const tabs = [
  { id: "a", label: "Rooms", description: "Rooms text" },
  { id: "b", label: "Tenants", description: "Tenants text" },
  { id: "c", label: "Rent", description: "Rent text" },
];
const panels = { a: <p>Rooms preview</p>, b: <p>Tenants preview</p>, c: <p>Rent preview</p> };

describe("PlatformTabs", () => {
  it("implements the tabs pattern with roving tabindex and arrow keys", async () => {
    const user = userEvent.setup();
    render(<PlatformTabs title="Platform" tabs={tabs} panels={panels} cta={<a href="#x">CTA</a>} />);

    const [first, second, third] = screen.getAllByRole("tab");
    expect(first).toHaveAttribute("aria-selected", "true");
    expect(first).toHaveAttribute("tabindex", "0");
    expect(second).toHaveAttribute("tabindex", "-1");

    first.focus();
    await user.keyboard("{ArrowRight}");
    expect(second).toHaveAttribute("aria-selected", "true");
    expect(document.activeElement).toBe(second);

    await user.keyboard("{End}");
    expect(third).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{ArrowRight}");
    expect(first).toHaveAttribute("aria-selected", "true");
  });

  it("swaps both the description and the preview", async () => {
    const user = userEvent.setup();
    const { container } = render(<PlatformTabs title="Platform" tabs={tabs} panels={panels} cta={null} />);
    await user.click(screen.getByRole("tab", { name: "Rent" }));

    const activePanel = container.querySelector('[role="tabpanel"][data-active="true"]');
    expect(activePanel?.textContent).toContain("Rent text");
    const activeMedia = Array.from(container.querySelectorAll('.tab-panel[data-active="true"]')).map((el) => el.textContent);
    expect(activeMedia).toContain("Rent preview");
    expect(activeMedia).not.toContain("Rooms preview");
  });
});
