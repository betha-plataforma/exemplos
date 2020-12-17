import React, { useRef, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import BthMarcaProdutoWrapper from './estrutura-wrappers/BthMarcaProdutoWrapper';
import MainComponent from './MainComponent';

const App: React.FC<{}> = ({ }) => {
  const elementRef = useRef(null);
  const opcoesMenu = useMemo(() => [
    {
      id: 'menu1', descricao: 'Menu 1', rota: '/', possuiPermissao: true
    },
    {
      id: 'menu2', descricao: 'Menu 2', rota: '/teste', possuiPermissao: true
    },
  ], []);

  // componentDidUpdate(prevProps) {
  //   if (this.props.location !== prevProps.location) {
  //     this.onRouteChanged();
  //   }
  // }

  // onRouteChanged() {
  //   console.log("ROUTE CHANGED");
  // }
  useEffect(() => {
    const element = (elementRef.current as any)!;
    element.opcoes = opcoesMenu;
    element.menuVertical = false;
    // element.setMenuAtivo('menu2');
    // window.location.replace('/teste')
    element.addEventListener('opcaoMenuSelecionada', (event: CustomEvent<any>) => {
      console.log('menu selecionado', event)
      element.setMenuAtivo(event.detail.id);
      // window.location.href = event.detail.rota;
    });
  }, [opcoesMenu]);

  return (
    <Router>
      <Switch>
        <bth-app ref={elementRef}>
          <BthMarcaProdutoWrapper produto="React" exibirProdutos={true}></BthMarcaProdutoWrapper>
          <bth-utilitarios slot="menu_ferramentas"></bth-utilitarios>
          <bth-ajuda slot="menu_ferramentas"></bth-ajuda>
          <bth-novidades slot="menu_ferramentas"></bth-novidades>
          <bth-notificacoes slot="menu_ferramentas"></bth-notificacoes>
          <main slot="container_aplicacao" className="container-fluid mt-2">
            <Route exact path="/"></Route>
            <Route exact path="/teste" component={MainComponent} ></Route>
          </main>
        </bth-app>
      </Switch>
    </Router>
  );
}

export default App;
