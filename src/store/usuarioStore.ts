import { create } from "zustand";
import { usuarioService } from "../services/usuarioService";
import type { IUsuario } from "../types/IUsuario";

interface UsuarioState {
  usuarios: IUsuario[];
  usuarioSeleccionado: IUsuario | null;
  usuarioLogueado: IUsuario | null;
  loading: boolean;
  error: string | null;

  getUsuarios: () => Promise<void>;
  createUsuario: (usuario: Omit<IUsuario, "id">) => Promise<void>;
  updateUsuario: (id: number, usuario: Partial<IUsuario>) => Promise<void>;
  deleteUsuario: (id: number) => Promise<void>;
  toggleActivo: (id: number, activo: boolean) => Promise<void>;

  setUsuarioLogueado: (usuario: IUsuario | null) => void;
  setUsuarioSeleccionado: (usuario: IUsuario | null) => void;
  logout: () => void;
}

const usuarioGuardado = localStorage.getItem("user");
const usuarioInicial: IUsuario | null = usuarioGuardado
  ? JSON.parse(usuarioGuardado)
  : null;

export const usuarioStore = create<UsuarioState>((set, get) => ({
  usuarios: [],
  usuarioLogueado: usuarioInicial,
  usuarioSeleccionado: null,
  loading: false,
  error: null,

  getUsuarios: async () => {
    set({ loading: true, error: null });
    try {
      const data = await usuarioService.getAllUsers();
      set({ usuarios: data, loading: false });
    } catch (err) {
      set({ error: "Error al cargar usuarios", loading: false });
      console.log(err);
    }
  },

  createUsuario: async (usuario) => {
    try {
      const nuevo = await usuarioService.createUsuario(usuario);
      set({ usuarios: [...get().usuarios, nuevo] });
    } catch (err) {
      set({ error: "Error al crear usuario" });
      console.log(err);
    }
  },

  updateUsuario: async (id, usuario) => {
    try {
      const actualizado = await usuarioService.updateUsuario(id, usuario);
      set({
        usuarios: get().usuarios.map((u) =>
          u.id === id ? { ...u, ...actualizado } : u
        ),
      });
    } catch (err) {
      set({ error: "Error al actualizar usuario" });
      console.log(err);
    }
  },

  deleteUsuario: async (id) => {
    try {
      await usuarioService.deleteUsuario(id);
      set({
        usuarios: get().usuarios.filter((u) => u.id !== id),
      });
    } catch (err) {
      set({ error: "Error al eliminar usuario" });
      console.log(err);
    }
  },

  toggleActivo: async (id, activo) => {
    try {
      const actualizado = await usuarioService.updateActivo(id, activo);
      set({
        usuarios: get().usuarios.map((u) =>
          u.id === id ? { ...u, activo: actualizado.activo } : u
        ),
      });
    } catch (err) {
      set({ error: "Error al actualizar estado de usuario" });
      console.log(err);
    }
  },
  setUsuarioLogueado: (usuario) => set({ usuarioLogueado: usuario }),
  setUsuarioSeleccionado: (usuario) => set({ usuarioSeleccionado: usuario }),

  logout: () => {
    set({ usuarioLogueado: null });
    localStorage.removeItem("user");
  },
}));
