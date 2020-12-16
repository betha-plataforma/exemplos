import React, { useRef, useEffect } from 'react';

const BthContaUsuarioWrapper: React.FC<{  }> = ({  }) => {
  const elementRef = useRef(null);
  useEffect(() => {
    const element = (elementRef.current as any)!;
    element.usuario = 'lorem.ipsum';
    element.nome = 'Lorem Ipsum';
    element.fotoUrl = 'https://placeimg.com/80/80/animals';
  }, []);
  return (<bth-conta-usuario slot="menu_ferramentas" ref={elementRef}> </bth-conta-usuario>);
}

export default BthContaUsuarioWrapper;