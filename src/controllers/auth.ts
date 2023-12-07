import { RequestHandler } from "express";
import { z } from "zod";
import * as auth from "../services/auth";

export const login: RequestHandler = (req, res) => {
  const loginSchema = z.object({
    password: z.string(),
  });
  const body = loginSchema.safeParse(req.body);
  if (!body.success) return res.json({ error: "Dados Inválidos" });

  // Validar a senha & gerar o token

  if (!auth.validadePassword(body.data.password)) {
    return res.status(403).json({ error: "Acesso negado" });
  }

  res.json({ token: auth.createToken() });
  
  
  
  // Retorno da requisição
};
