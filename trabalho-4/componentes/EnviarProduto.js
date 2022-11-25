import React, {useState, createContext} from 'react';

export const ProdutoContext = createContext({});

export default function EnviarProduto({children}){
  
    const[produto, setProduto] = useState('');

    function alteraProduto(inputCodigo, inputDescricao, inputPreco, inputQuantidade){
      setProduto({
      codigo: inputCodigo,
      descricao: inputDescricao,
      preco: inputPreco,
      quantidade: inputQuantidade
      })
    
    }
  
   return(
    <ProdutoContext.Provider value= {{produto, alteraProduto}} >
      {children}
    </ProdutoContext.Provider>
  )
}