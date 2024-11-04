import React from "react"
import {
  findByText,
  fireEvent,
  getByText,
  render,
} from "@testing-library/react"
import Select from "."

const keyDownEvent = {
  key: "ArrowDown",
}

export async function selectOption(container: HTMLElement, optionText: string) {
  fireEvent.keyDown(container, keyDownEvent)
  await findByText(container, optionText)
  fireEvent.click(getByText(container, optionText))
}

describe(Select, () => {
  it("renders a react select", async () => {
    const options = [
      {
        value: "value1",
        label: "label1",
      },
      {
        value: "value2",
        label: "label2",
      },
      {
        value: "value3",
        label: "label3",
      },
    ]
    const mockChangeHandler = jest.fn()
    const { container } = render(
      <Select options={options} onChange={mockChangeHandler} />
    )

    await selectOption(
      container.querySelector(".Select") as HTMLDivElement,
      "label2"
    )

    expect(mockChangeHandler).toHaveBeenCalledWith(
      { value: "value2", label: "label2" },
      expect.anything()
    )
  })

  it("works as multi select", async () => {
    const options = [
      {
        value: "value1",
        label: "label1",
      },
      {
        value: "value2",
        label: "label2",
      },
      {
        value: "value3",
        label: "label3",
      },
    ]
    const mockChangeHandler = jest.fn()
    const { container } = render(
      <Select options={options} isMulti onChange={mockChangeHandler} />
    )

    await selectOption(
      container.querySelector(".Select") as HTMLDivElement,
      "label2"
    )
    await selectOption(
      container.querySelector(".Select") as HTMLDivElement,
      "label3"
    )

    expect(mockChangeHandler).toHaveBeenCalledWith(
      [{ value: "value2", label: "label2" }],
      expect.anything()
    )
    expect(mockChangeHandler).toHaveBeenCalledWith(
      [
        { value: "value2", label: "label2" },
        { value: "value3", label: "label3" },
      ],
      expect.anything()
    )
  })
})
