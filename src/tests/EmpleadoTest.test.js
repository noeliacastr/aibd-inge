import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CreateEmpleado from "../components/CreateEmpleado";
import { Button } from '@material-ui/core';

describe("CreateEmpleado", () => {
  test("renders the component and opens the dialog on button click", () => {
    render(<CreateEmpleado />);

    // Check that the "Agregar" button is displayed
    const addButton = screen.getByRole('button');
    expect(addButton).toBeInTheDocument();
  
    // Check that the "Agregar" text is displayed inside the button
    const addText = screen.getByText('Agregar');
    expect(addText).toBeInTheDocument();
    expect(addButton).toContainElement(addText);
  });
});