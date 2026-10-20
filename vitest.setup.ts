import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { createElement, type ReactNode } from "react";
import { afterEach, beforeEach, vi } from "vitest";

export const mockPush = vi.fn();
export const mockReplace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
}));

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt?: string; src?: unknown }) =>
    createElement("img", {
      alt: alt ?? "",
      src: typeof src === "string" ? src : "",
    }),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children?: ReactNode;
  }) => createElement("a", { href, ...props }, children),
}));

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  mockPush.mockReset();
  mockReplace.mockReset();
  vi.unstubAllGlobals();
});
