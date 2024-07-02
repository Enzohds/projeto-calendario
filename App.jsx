import {useState} from "react";
import './App.css';

function Calendario(){
  const hoje = new Date();
  const mesAtual = hoje.getMonth();
  const anoAtual = hoje.getFullYear();

  const nomeDosMeses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']

  const diasDaSemana = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']

  const [diaSelecionado, setDiaSelecionado] = useState(null)
  const [itens,setItens] = useState([])

  const lidarComCliqueNoDia = (dia) => {
    setDiaSelecionado(dia)
  }
  const adicionarItemAoDia = () => {
    const novoItem = prompt('Digite um item:');
    if(novoItem){
      const novoItemComData = `${diaSelecionado}/${mesAtual + 1} - ${novoItem}`;
      setItens([...itens, novoItemComData])
    }
  }

  const obterNumeroDeDiasNoMes = (ano, mes) => {
    return new Date(ano, mes + 1, 0).getDate()
  }

  const obterEspacosEmBranco = (ano, mes) => {
    const primeiroDiaDaSemana = new Date(ano, mes, 1).getDay();
    return Array(primeiroDiaDaSemana === 0 ? 6 : primeiroDiaDaSemana - 1).fill(null)
  }

  const numedorDeDiasNoMes = 
  obterNumeroDeDiasNoMes(anoAtual, mesAtual);

  const espacosEmBranco = 
  obterEspacosEmBranco(anoAtual, mesAtual);

  const dias = Array.from({length: numedorDeDiasNoMes }, (_,i) => i + 1)
  
  const semanas = [];
  let semana = [...espacosEmBranco];

  dias.forEach((dia) => {
    semana.push(dia)
    if(semana.length === 7 ){
      semanas.push(semana);
      semana = []
    }
  })

  if(semana.length > 0){
    semanas.push(semana)
  }

  return(
    <div className="calendario">
      <h2> {nomeDosMeses[mesAtual]}</h2>

      <table>
        <thead>
          <tr>
            {diasDaSemana.map((dia) => (
              <th key={dia}>{dia}</th>
            ))}
          </tr>
          </thead>
          <tbody>
            {semanas.map((semana, indice) => (
              <tr key={indice}>
                {semana.map((dia,indiceDia) => (
                 < td key={indiceDia}className={diaSelecionado === dia ? 'selecionado' : ''} onClick={() => lidarComCliqueNoDia(dia)}>
                 {dia}
              </td>
            ))}
            </tr>
            ))}
          </tbody>
      </table>

      {diaSelecionado && (
        <div>
          <h3>{diaSelecionado} de {nomeDosMeses[mesAtual]}:</h3>
          <button onClick={adicionarItemAoDia}>Adicionar Item</button>
          {itens.length > 0 ? (
            <ul>{itens.map((item,indice) =>(
              <li key={indice}>{item}</li>
            ))}</ul>
          ) : (
            <p>Nenhum item adicionado.</p>
          )
          }
          </div>
      )}
    </div>
  );
}

export default Calendario;