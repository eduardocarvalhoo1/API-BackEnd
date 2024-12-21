export const paginate = (data, limite, pagina) => {
    const limit = parseInt(limite) || 5;
    const page = parseInt(pagina) || 1;
  
    if (![5, 10, 30].includes(limit)) {
      throw new Error("O limite deve ser um dos valores: 5, 10 ou 30.");
    }
    
    // Calcula índices de início e fim
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
  
    return data.slice(startIndex, endIndex);
  };