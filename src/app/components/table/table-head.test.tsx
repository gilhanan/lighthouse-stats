import { render } from "@testing-library/react";
import { TableHead } from "./table-head";
import { Cell } from "./models";

const cells: Cell[] = [
  {
    label: "Simple",
    value: 0,
  },
  {
    label: "Two animals",
    value: [
      {
        label: "Cat",
        value: 1,
      },
      {
        label: "Dog",
        value: 2,
      },
    ],
  },
  {
    label: "Three vegetables",
    value: [
      {
        label: "Tomato",
        value: 3,
      },
      {
        label: "Potato",
        value: 4,
      },
      {
        label: "Carrot",
        value: 5,
      },
    ],
  },
  {
    label: "Three levels",
    value: [
      {
        label: "First",
        value: [
          {
            label: "One",
            value: 6,
          },
          {
            label: "Two",
            value: 7,
          },
        ],
      },
      {
        label: "Second",
        value: [
          {
            label: "Three",
            value: 8,
          },
          {
            label: "Four",
            value: 9,
          },
        ],
      },
    ],
  },
];

it("renders homepage unchanged", () => {
  const { container } = render(<TableHead cells={cells} />);
  expect(container).toMatchSnapshot();
});
