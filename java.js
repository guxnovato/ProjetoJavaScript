function calcular_senioridade(senioridade) {
  if (senioridade === 'iniciante') return 0.8;
  if (senioridade === 'júnior') return 1.0;
  if (senioridade === 'pleno') return 1.3;
  if (senioridade === 'sênior') return 1.5;
  return 1.0;
}

function calcular_perfil_cliente(perfil) {
  if (perfil === 'amigos') return 0.8;
  if (perfil === 'startups') return 1.0;
  if (perfil === 'empresas médias') return 1.2;
  if (perfil === 'empresas grandes') return 1.4;
  return 1.0;
}

function calcular_regiao_cliente(regiao) {
  if (regiao === 'brasil') return 1.0;
  if (regiao === 'eua') return 1.3;
  if (regiao === 'europa') return 1.2;
  return 1.0;
}

function calcular_complexidade(complexidade) {
  if (complexidade === 'baixa') return 0.9;
  if (complexidade === 'média') return 1.0;
  if (complexidade === 'grande') return 1.2;
  return 1.0;
}

function calcular_margem_lucro(margem) {
  return 1 + (margem / 100);
}

function calcular_valor_hora(custos, horas_uteis, margem, senioridade, complexidade, perfil, regiao) {
  const piso = custos / horas_uteis;
  return piso *
    calcular_senioridade(senioridade) *
    calcular_complexidade(complexidade) *
    calcular_perfil_cliente(perfil) *
    calcular_regiao_cliente(regiao) *
    calcular_margem_lucro(margem);
}

document.addEventListener('DOMContentLoaded', function () {
  const btnCalcular = document.getElementById('btn-calcular');

  btnCalcular.addEventListener("click", () => {
    const senioridade = document.getElementById('senioridade').value;
    const horasUteis = parseFloat(document.getElementById('horas-uteis').value);
    const custos = parseFloat(document.getElementById('custos-mensais').value);
    const perfil = document.getElementById('perfil').value;
    const regiao = document.getElementById('regiao').value;
    const complexidade = document.getElementById('complexidade').value;
    const horasEstimadas = parseFloat(document.getElementById('horas-estimadas').value);
    const margem = parseFloat(document.getElementById('margem').value);

    const camposInvalidos = isNaN(horasUteis) || isNaN(custos) || isNaN(horasEstimadas) || isNaN(margem) ||
      senioridade === 'Selecione seu nível de senioridade' ||
      perfil === 'Selecione o perfil do cliente' ||
      regiao === 'Selecione a região do cliente' ||
      complexidade === 'Selecione a complexidade do projeto';

    if (camposInvalidos) {
      Swal.fire({
        toast: true,
        position: 'bottom-start',
        icon: 'error',
        title: 'Preencha todos os campos corretamente',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
      return;
    }

    const valorHora = calcular_valor_hora(
      custos,
      horasUteis,
      margem,
      senioridade,
      complexidade,
      perfil,
      regiao
    );

    const valorTotal = valorHora * horasEstimadas;

    document.getElementById('valor-hora').textContent = `R$ ${valorHora.toFixed(2)}`;
    document.getElementById('horas-usadas').textContent = `${horasEstimadas}h`;
    document.getElementById('valor-total').textContent = `R$ ${valorTotal.toFixed(2)}`;

    Swal.fire({
      toast: true,
      position: 'bottom-start',
      icon: 'success',
      title: `Cálculo realizado com sucesso!`,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  });
});
