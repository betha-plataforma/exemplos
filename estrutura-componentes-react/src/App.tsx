import React, { useRef, useEffect } from 'react';
import './App.css';
import BthMarcaProdutoWrapper from './estrutura-wrappers/BthMarcaProdutoWrapper';
import MainComponent from './MainComponent';

const App: React.FC<{}> = ({ }) => {
  const elementRef = useRef(null);
  const opcoesMenu = [
    { id: 'menu1', descricao: 'Menu 1', icone: 'chart-pie', rota: '/', possuiPermissao: true },
    {
      id: '', descricao: 'Menu 2', icone: 'cog', possuiPermissao: true,
      submenus: [
        { id: 'menu2', descricao: 'Submenu 1', rota: '/menu2', possuiPermissao: true },
        { id: 'menu3', descricao: 'Submenu 2', rota: '/menu3', possuiPermissao: true },
      ]
    },
  ];
  useEffect(() => {
    const element = (elementRef.current as any)!;
    element.opcoes = opcoesMenu;
    element.menuVertical = false;
  }, [opcoesMenu]);

  return (<bth-app ref={elementRef}>
    <BthMarcaProdutoWrapper produto="React" exibirProdutos={true}></BthMarcaProdutoWrapper>
    <bth-utilitarios slot="menu_ferramentas"></bth-utilitarios>
    <bth-ajuda slot="menu_ferramentas"></bth-ajuda>
    <bth-novidades slot="menu_ferramentas"></bth-novidades>
    <bth-notificacoes slot="menu_ferramentas"></bth-notificacoes>
    <main slot="container_aplicacao">
      <MainComponent></MainComponent>
    </main>
  </bth-app>);
}

export default App;
