import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PatientProvider } from "../../contexts/PatientsContext";
import PatientDetailsPage from "../PatientDetailsPage";
import AuthProvider from "../../contexts/AuthContext";

describe("PatientDetailsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockPatient = {
    id: "id-patient-random",
    name: "Anderson Martins",
    age: "22",
    treatmentPlan: [
      {
        idPlan: "id-plan-random",
        dateTreatment: "17/04/2026",
        cart: [
          {
            code: "T1",
            left: "0.5",
            mid: "0",
            product: "VM",
            right: "0.5",
          },
          {
            code: "T2",
            left: "0.5",
            mid: "0",
            product: "VM",
            right: "0.5",
          },
        ],
      },
    ],
  };

  const user = userEvent.setup();

  const mockClosePage = jest.fn();

  it("should render PatientDetails componente in the document", () => {
    render(
      <AuthProvider>
        <PatientProvider>
          <PatientDetailsPage patient={mockPatient} closePage={mockClosePage} />
        </PatientProvider>
      </AuthProvider>
    );
    expect(screen.findByText(`Treatments Plans: ${mockPatient.name}`));
  });

  it("Should when clicked in the button return close the component and call the closePage function", async () => {
    render(
      <AuthProvider>
        <PatientProvider>
          <PatientDetailsPage closePage={mockClosePage} patient={mockPatient} />
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
          <PatientDetailsPage closePage={mockClosePage} patient={mockPatient} />
        </PatientProvider>
      </AuthProvider>
    );
    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    expect(deleteButton).toBeInTheDocument();
    await user.click(deleteButton);

  });
});
