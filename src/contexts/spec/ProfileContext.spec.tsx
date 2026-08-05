import { get, ref, update } from "firebase/database";
import {
  mockNewDataPreference,
  mockUserInfo,
  mockUser,
  mockSnapshot,
  mockUserUid,
  mockDatabaseRef,
  mockDb
} from "../../tests/fixtures/profile";
import { renderHook, waitFor } from "@testing-library/react";
import { useProfile, ProfileProvider } from "../ProfileContext";
import { useAuth } from "../AuthContext";
import { act } from "react";
import { db } from "../../firebaseConfig";


//Mock do banco de dados
jest.mock("../../firebaseConfig", () => ({
    db: jest.fn(() => mockDb)
}))

// Mock do Firebase
jest.mock("firebase/database", () => ({
  get: jest.fn(),
  ref: jest.fn(() => mockDatabaseRef),
  update: jest.fn()
}));

// Mock do profileSettings
jest.mock("../../api/routes/profile", () => ({
  profileSettings: jest.fn((uid) => `profile-${uid}`),
}));

// Mock do AuthContext
jest.mock("../AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("Test ProfileContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });

    (get as jest.Mock).mockResolvedValue(mockSnapshot);
  });

  it("deve carregar os dados do usuário quando o usuário está logado", async () => {
    const { result } = renderHook(() => useProfile(), { wrapper: ProfileProvider });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.userInfo).toEqual(mockUserInfo);
    expect(get).toHaveBeenCalledWith(`profile-${mockUserUid}`);
  });

    it("deve chamar a function com os novos dados a serem salvos no banco de dados", async () => {
    const { result } = renderHook(() => useProfile(), { wrapper: ProfileProvider });
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    let response;
    await act(async () => {
        response = await result.current.createNewPreference(mockNewDataPreference)
    })
    expect(update).toHaveBeenCalledTimes(1)
    expect(update).toHaveBeenCalledWith(ref(db), mockNewDataPreference)

    expect(response).toEqual({message: "Sucess in create a new preference", status: 201})
    expect(result.current.isLoading).toBe(false)
  });

  it("deve lançar erro se useProfile for usado fora do Provider", () => {
    // Silenciar console.error para esse teste
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    expect(() => {
      renderHook(() => useProfile());
    }).toThrow("useProfile deve ser usado dentro de um ProfileProvider!");

    consoleErrorSpy.mockRestore();
  });
});
