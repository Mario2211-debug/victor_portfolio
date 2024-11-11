export const offlineData = {
    posts: [
        [
            {
                _id: "66907002b0588d69b8dbcb17",
                title: "Componentes no React",
                description: "Aprenda a diferenciar e a usar componentes no React",
                content: `No React, temos duas maneiras principais de criar componentes: **componentes funcionais** e **componentes de classe**...

          ### 1. Componentes Funcionais
          
          Componentes funcionais são funções JavaScript que retornam elementos de UI (geralmente em JSX). Eles foram introduzidos como uma maneira mais simples de criar componentes em React...
          
          Exemplo de um Componente Funcional:
          \`\`\`javascript
          import React, { useState } from 'react';

          function Contador() {
            const [contador, setContador] = useState(0);
            return (
              <div>
                <p>Contador: {contador}</p>
                <button onClick={() => setContador(contador + 1)}>Incrementar</button>
              </div>
            );
          }

          export default Contador;
          \`\`\`

          ### 2. Componentes de Classe

          Componentes de classe eram o modo tradicional de criar componentes antes da introdução dos Hooks...
          `
            }
        ]
    ]
}