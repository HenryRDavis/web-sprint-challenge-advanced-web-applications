import React, { useState, useEffect } from "react";
import { render, screen } from "@testing-library/react";
import BubblePage from "./BubblePage";

useEffect(() => {
    axiosWithAuth()
    .get('/api/colors')
    .then(res => {
      setColorList(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

let getColors = useEffect()

jest.mock(getColors)

const mockData = [
  {
    color: "aliceblue",
    code: {
      hex: "#f0f8ff"
    },
    id: 1
  },
  {
    color: "limegreen",
    code: {
      hex: "#99ddbc"
    },
    id: 2
  },
  {
    color: "aqua",
    code: {
      hex: "#00ffff"
    },
    id: 3
  },
]


test("Fetches data and renders the bubbles", async () => {
  // Finish this test
  const { rerender } = render(<BubblePage colors={[]} />);
  rerender(<BubblePage missions={mockData} />)

  expect(await screen.findByText(/bubbles/i)).toBeInTheDocument()
  expect(await screen.findByText(/colors/i)).toBeInTheDocument()
  
  let colorsArr = screen.queryAllByTestId(/colors/i);
  expect(colorsArr).toHaveLength(0);
});
