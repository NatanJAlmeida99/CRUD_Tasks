export const validarDadosTask = (req, res, next) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ erro: "Os campos 'title' e 'description' são obrigatórios" });
  }

  next();
};
