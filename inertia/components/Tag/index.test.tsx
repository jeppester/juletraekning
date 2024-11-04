import React from "react"
import { render, waitFor } from "@testing-library/react"

import Tag, { TagProps } from "."
import userEvent from "@testing-library/user-event"

const defaultProps: TagProps = {
  text: "Tag text",
}

describe(Tag, () => {
  it("displays Tag text", () => {
    const { getByText } = render(<Tag {...defaultProps} />)

    const tag = getByText("Tag text")

    expect(tag).toBeInTheDocument()
  })

  describe("with onClose handler", () => {
    it("has a close button", async () => {
      const closeHandler = jest.fn()
      const { getByRole } = render(
        <Tag {...defaultProps} onClose={closeHandler} />
      )

      const element = getByRole("button")

      expect(element).toHaveClass("Tag__close")

      expect(closeHandler).not.toHaveBeenCalled()

      await userEvent.click(element)

      await waitFor(() => expect(closeHandler).toHaveBeenCalled())
    })
  })
})
