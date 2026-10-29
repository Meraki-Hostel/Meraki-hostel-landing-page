import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EarlyAccessForm } from "@/components/sections/EarlyAccessForm";
import { content } from "@/config/site-content";

const copy = content.earlyAccess;

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/Full name/), "Test Owner");
  await user.type(screen.getByLabelText(/Property or business name/), "Example Residency");
  await user.type(screen.getByLabelText("Mobile number"), "9876543210");
  await user.type(screen.getByLabelText(/^City/), "Pune");
  await user.selectOptions(screen.getByLabelText(/Approx. number of beds/), "20-50");
  await user.click(screen.getByRole("checkbox"));
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("EarlyAccessForm", () => {
  it("renders disabled with an honest notice when lead capture is not enabled", () => {
    render(<EarlyAccessForm copy={copy} submitLabel="Request early access" enabled={false} contact={{}} />);
    expect(screen.getByText(copy.disabled.title)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Request early access" })).toBeDisabled();
    expect(screen.getByLabelText(/Full name/)).toBeDisabled();
    expect(document.querySelector('a[href^="mailto:"]')).toBeNull();
  });

  it("offers a mailto fallback only when a contact email is configured", () => {
    render(<EarlyAccessForm copy={copy} submitLabel="Send" enabled={false} contact={{ email: "team@example.test" }} />);
    expect(document.querySelector('a[href^="mailto:team@example.test"]')).not.toBeNull();
  });

  it("shows an error summary and sends nothing when fields are invalid", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<EarlyAccessForm copy={copy} submitLabel="Send" enabled contact={{}} />);
    await user.click(screen.getByRole("button", { name: "Send" }));
    expect(screen.getByText(copy.errors.invalid)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full name/)).toHaveAttribute("aria-invalid", "true");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("shows success only on 200 + {ok:true}", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ ok: true })));
    const user = userEvent.setup();
    render(<EarlyAccessForm copy={copy} submitLabel="Send" enabled contact={{}} />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: "Send" }));
    expect(await screen.findByText(copy.success.title)).toBeInTheDocument();
  });

  it.each([
    [502, { ok: false, error: "upstream" }, copy.errors.upstream],
    [503, { ok: false, error: "not_configured" }, copy.errors.notConfigured],
    [429, { ok: false, error: "rate_limited" }, copy.errors.rateLimited],
    [200, { ok: false }, copy.errors.upstream],
  ])("status %i keeps input and shows an honest error", async (status, body, message) => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json(body, { status })));
    const user = userEvent.setup();
    render(<EarlyAccessForm copy={copy} submitLabel="Send" enabled contact={{}} />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: "Send" }));
    expect(await screen.findByText(message)).toBeInTheDocument();
    expect(screen.queryByText(copy.success.title)).toBeNull();
    expect(screen.getByLabelText(/Full name/)).toHaveValue("Test Owner");
  });

  it("treats a network failure as an error, not success", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("offline")));
    const user = userEvent.setup();
    render(<EarlyAccessForm copy={copy} submitLabel="Send" enabled contact={{}} />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: "Send" }));
    expect(await screen.findByText(copy.errors.upstream)).toBeInTheDocument();
  });

  it("blocks duplicate submits while a request is pending", async () => {
    let resolve: (value: Response) => void = () => {};
    const fetchMock = vi.fn(() => new Promise<Response>((r) => (resolve = r)));
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<EarlyAccessForm copy={copy} submitLabel="Send" enabled contact={{}} />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: "Send" }));
    const pending = screen.getByRole("button", { name: /Sending/ });
    expect(pending).toBeDisabled();
    await user.click(pending);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    resolve(Response.json({ ok: true }));
    expect(await screen.findByText(copy.success.title)).toBeInTheDocument();
  });
});
