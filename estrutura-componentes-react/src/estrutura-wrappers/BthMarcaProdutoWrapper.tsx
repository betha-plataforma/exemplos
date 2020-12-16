import React, { useRef, useEffect } from 'react';
const BthMarcaProdutoWrapper: React.FC<{produto:string, exibirProdutos:boolean}> = ({produto, exibirProdutos }) => {
    const elementRef = useRef(null);
    useEffect(() => {
        const element = (elementRef.current as any)!;
        element.produto = produto;
        element.exibirProdutos = exibirProdutos;
    }, []);
    return (<bth-marca-produto slot="menu_marca_produto" ref={elementRef}></bth-marca-produto>);
}

export default BthMarcaProdutoWrapper;