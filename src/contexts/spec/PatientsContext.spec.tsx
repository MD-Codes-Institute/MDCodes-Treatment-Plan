import { renderHook, act, waitFor } from "@testing-library/react";
import { PatientProvider, usePatient } from "../PatientsContext";
import { useAuth } from "../AuthContext";
import { set, remove, child, push } from "firebase/database";
import { getPatients } from "../../api/database/getPatients";
import { patientsDatabase } from "../../api/routes/patients";
import { mockPatients, newDataRaw, mockUser } from "../../tests/fixtures/patients";

jest.mock("../../api/database/getPatients", () => ({
  getPatients: jest.fn(),
}));

jest.mock("../AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("firebase/database", () => ({
  push: jest.fn(),
  set: jest.fn(),
  child: jest.fn(),
  remove: jest.fn(),
}));

jest.mock("../../api/routes/patients", () => ({
  patientsDatabase: jest.fn(() => "mock-database-ref"),
}));

describe("Testing all function of the ContextPatient", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const mockedUseAuth = useAuth as jest.Mock;
    mockedUseAuth.mockReturnValue({ user: mockUser });

    const mockedGetPatients = getPatients as jest.Mock;
    mockedGetPatients.mockResolvedValue({
      havePatient: true,
      dataPatient: mockPatients,
      message: "Sucess",
      status: 200,
    });

    const mockPush = push as jest.Mock;
    mockPush.mockImplementationOnce(() => "mock-ref-id");
    mockPush.mockImplementationOnce(() => ({ key: "mock-ref-plan-id" }));

    (child as jest.Mock).mockImplementation((ref, path) => `${ref}/${path}`);
  });

  it("Testing the patient rendering list and returning the filtered name from the list.", async () => {
    const { result } = renderHook(() => usePatient(), { wrapper: PatientProvider });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    act(() => {
      result.current.searchPatient("Paulo");
    });

    expect(getPatients).toHaveBeenCalledWith(mockUser.uid);
    expect(result.current.displayed).toHaveLength(1);
    expect(result.current.displayed![0].name).toContain("Paulo");
  });

  it("Tested, error returned when incorrect name is passed in the list.", async () => {
    const { result } = renderHook(() => usePatient(), { wrapper: PatientProvider });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => {
      result.current.searchPatient("Jairon");
    });

    expect(result.current.displayed).toHaveLength(0);
  });

  it("Tested function add new patient", async () => {
    const { result } = renderHook(() => usePatient(), { wrapper: PatientProvider });
    (set as jest.Mock).mockResolvedValueOnce(undefined);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const { name, age, treatmentPlan } = newDataRaw;
    const infoPatient = { name, age };

    let response;
    await act(async () => {
      response = await result.current.saveNewPatient(infoPatient, treatmentPlan);
    });

    const firstPushed = (push as jest.Mock).mock.results[0].value;
    const secondPushed = (push as jest.Mock).mock.results[1].value;

    expect(response).toEqual({ message: "Patient created successfully", status: 201 });
    expect(result.current.isLoading).toBe(false);
    expect(push).toHaveBeenCalledTimes(2);
    expect(push).toHaveBeenCalledWith("mock-database-ref");
    expect(push).toHaveBeenCalledWith(`${firstPushed}/treatmentPlan`);
    expect(mockUser.reload).toHaveBeenCalledTimes(1);
    expect(set).toHaveBeenCalledWith(firstPushed, {
      name: "Anderson Martins",
      age: "44",
      treatmentPlan: {
        [secondPushed.key]: {
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
      },
    });
  });

  it("Tested function add existing patient", async () => {
    const { result } = renderHook(() => usePatient(), { wrapper: PatientProvider });

    (set as jest.Mock).mockResolvedValueOnce(undefined);

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    const patientId = "patient-123";
    const { treatmentPlan } = newDataRaw;
    let response;
    await act(async () => {
      response = await result.current.saveExistingPatient(patientId, treatmentPlan);
    });

    const pushed = (push as jest.Mock).mock.results[0].value
    expect(child).toHaveBeenCalledWith("mock-database-ref", `${patientId}/treatmentPlan`);
    expect(result.current.isLoading).toBe(false);
    expect(push).toHaveBeenCalledTimes(1);
    expect(mockUser.reload).toHaveBeenCalledTimes(1);
    expect(response).toEqual({ message: "TreatmentPlan created successfully", status: 201 });
    expect(set).toHaveBeenCalledWith(pushed, treatmentPlan);
  });

  it("Tested function remove patient when the planId is not passed to the function", async () => {
    const { result } = renderHook(() => usePatient(), { wrapper: PatientProvider });
    (remove as jest.Mock).mockResolvedValueOnce(undefined);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const patientId = "patient-123";
    let response;
    await act(async () => {
      response = await result.current.deletePatient(patientId);
    });

    expect(remove).toHaveBeenCalledTimes(1);
    expect(child).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledWith(`mock-database-ref/${patientId}`);
    expect(response).toEqual({ message: "Success in deleting patient.", status: 204 });
  });

  it("Tested function removing a treatment plan", async () => {
    const { result } = renderHook(() => usePatient(), { wrapper: PatientProvider });

    (remove as jest.Mock).mockResolvedValueOnce(undefined)

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    const patientId = "patient-123"
    const planId = "plan-456"
    let response;
    await act(async () => {
      response = await result.current.deletePatient(patientId, planId)
    })

    expect(planId).toBeTruthy()
    expect(response).toEqual({ message: "Success in deleting Treatment Plan of this patient.", status: 204 })
    expect(mockUser.reload).toHaveBeenCalled()
    expect(child).toHaveBeenCalledWith("mock-database-ref", `${patientId}/treatmentPlan/${planId}`)

  });
});
