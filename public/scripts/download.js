const { jsPDF } = window.jspdf
const XLSX = window.XLSX

export function downloadPDF() {
  const doc = new jsPDF()
  // Lógica para gerar PDF...
  doc.save('Operações-MathsCalcs.pdf')
}

export function downloadXLSX() {
  const operations = getOperations()
  const data = operations.map(op => [
    op.date,
    op.description,
    op.ticker,
    op.value,
    op.quantity,
    op.result
  ])

  const ws = XLSX.utils.aoa_to_sheet([
    ['Data', 'Descrição', 'Ativo', 'Valor', 'Quantidade', 'Resultado'],
    ...data
  ])
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Operações')
  XLSX.writeFile(wb, 'Operações-MathsCalcs.xlsx')
}
