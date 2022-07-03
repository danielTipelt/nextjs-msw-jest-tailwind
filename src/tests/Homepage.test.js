import { render, screen, waitFor } from "@testing-library/react";

import HomePage from "../pages/index";

describe("homepage", function () {
  test("I shows proper heading", function () {
    render(<HomePage name="Passdown prop" />);
    expect(screen.getByRole("heading").textContent).toEqual("Passdown prop");
  });

  test("I shows proper heading on client refetch", async function () {
    render(<HomePage />);

    screen.getByText("Fetch").click();
    await waitFor(() =>
      expect(screen.getByRole("heading").textContent).toEqual(
        "Homepage client title"
      )
    );
  });
});
