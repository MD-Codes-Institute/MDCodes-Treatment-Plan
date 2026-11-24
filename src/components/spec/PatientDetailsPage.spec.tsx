import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PatientProvider } from "../../contexts/PatientsContext";
import PatientDetailsPage from "../PatientDetailsPage";
import AuthProvider from "../../contexts/AuthContext";
import { mockPatients } from "../../tests/fixtures/patients";

describe("PatientDetailsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const user = userEvent.setup();

  const mockClosePage = jest.fn();

  it("should render PatientDetails componente in the document", () => {
    render(
      <AuthProvider>
        <PatientProvider>
          <PatientDetailsPage patient={mockPatients[0]} closePage={mockClosePage} />
        </PatientProvider>
      </AuthProvider>
    );
    expect(screen.findByText(`Treatments Plans: ${mockPatients[0].name}`));
  });

  it("Should when clicked in the button return close the component and call the closePage function", async () => {
    render(
      <AuthProvider>
        <PatientProvider>
          <PatientDetailsPage closePage={mockClosePage} patient={mockPatients[0]} />
        </PatientProvider>
      </AuthProvider>
    );

    const returnButton = screen.getByRole("button", { name: "Return" });
    expect(returnButton).toBeInTheDocument();

    await user.click(returnButton);
    expect(mockClosePage).toHaveBeenCalledTimes(1);
  });

  it("Should when clicked in button delete to be called deletePatient function", async () => {
    render(
      <AuthProvider>
        <PatientProvider>
          <PatientDetailsPage closePage={mockClosePage} patient={mockPatients[0]} />
        </PatientProvider>
      </AuthProvider>
    );
    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    expect(deleteButton).toBeInTheDocument();
    await user.click(deleteButton);

  });
});
