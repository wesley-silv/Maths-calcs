import { getOperations } from './operations.js'

// Funções auxiliares melhoradas
const safeParseNumber = (value, defaultValue = 0) => {
  if (value === null || value === undefined) return defaultValue
  const num = typeof value === 'number' ? value : parseFloat(value)
  return isNaN(num) ? defaultValue : num
}

const safeFormatCurrency = value => {
  const num = safeParseNumber(value)
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num)
}

const safeFormatDate = dateString => {
  if (!dateString) return '--'
  try {
    const date = new Date(dateString)
    return isNaN(date.getTime()) ? '--' : date.toLocaleDateString('pt-BR')
  } catch {
    return '--'
  }
}

export function downloadXLSX() {
  const operations = getOperations()

  if (!operations || operations.length === 0) {
    alert('Nenhuma operação registrada para exportar!')
    return
  }

  const script = document.createElement('script')
  script.src =
    'https://cdn.sheetjs.com/xlsx-0.19.3/package/dist/xlsx.full.min.js'
  script.onload = () => {
    const formattedOperations = operations.map(op => ({
      Data: safeFormatDate(op.date),
      Descrição: op.description || '--',
      Ativo: (op.ticker || '--').toUpperCase(),
      'Valor (R$)': safeParseNumber(op.value),
      Quantidade: safeParseNumber(op.quantity),
      'Resultado (R$)': safeParseNumber(op.result),
      Tipo: safeParseNumber(op.result) >= 0 ? 'Lucro' : 'Prejuízo'
    }))

    const worksheet = XLSX.utils.json_to_sheet(formattedOperations)
    const workbook = XLSX.utils.book_new()

    // Formatação de células para valores numéricos
    const range = XLSX.utils.decode_range(worksheet['!ref'])
    for (let i = range.s.r + 1; i <= range.e.r; ++i) {
      ;['D', 'E', 'F'].forEach(col => {
        // Colunas D (Valor), E (Quantidade), F (Resultado)
        const cell = worksheet[col + i]
        if (cell) {
          cell.t = 'n' // Tipo numérico
          if (col === 'D' || col === 'F') {
            cell.z = '"R$"#,##0.00' // Formato monetário
          } else if (col === 'E') {
            cell.z = '#,##0' // Formato inteiro
          }
        }
      })
    }

    worksheet['!cols'] = [
      { wch: 12 },
      { wch: 25 },
      { wch: 10 },
      { wch: 15 },
      { wch: 12 },
      { wch: 15 },
      { wch: 10 }
    ]

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Operações')
    XLSX.writeFile(
      workbook,
      `operacoes_${new Date().toISOString().slice(0, 10)}.xlsx`
    )
  }
  document.head.appendChild(script)
}

export function downloadPDF() {
  const operations = getOperations()

  if (!operations || operations.length === 0) {
    alert('Nenhuma operação registrada para exportar!')
    return
  }

  const script = document.createElement('script')
  script.src =
    'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js'
  script.onload = () => {
    const script2 = document.createElement('script')
    script2.src =
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.min.js'
    script2.onload = () => {
      const styles = {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
          alignment: 'center'
        },
        subheader: {
          fontSize: 12,
          bold: true,
          margin: [0, 10, 0, 5],
          color: '#555'
        },
        tableHeader: {
          bold: true,
          fontSize: 10,
          color: 'white',
          fillColor: '#2c3e50',
          alignment: 'center'
        },
        profit: { color: 'green', bold: true },
        loss: { color: 'red', bold: true },
        rightAlign: { alignment: 'right' },
        centerAlign: { alignment: 'center' },
        missingData: { color: '#999', fontStyle: 'italic' }
      }

      const tableBody = operations.map(op => {
        const value = safeParseNumber(op.value)
        const result = safeParseNumber(op.result)
        const quantity = safeParseNumber(op.quantity)

        return [
          { text: safeFormatDate(op.date), style: 'centerAlign' },
          op.description || { text: 'Sem descrição', style: 'missingData' },
          { text: (op.ticker || '--').toUpperCase(), style: 'centerAlign' },
          { text: safeFormatCurrency(value), style: 'rightAlign' },
          { text: quantity.toString(), style: 'rightAlign' },
          {
            text: safeFormatCurrency(result),
            style: result >= 0 ? 'profit' : 'loss'
          },
          {
            text: result >= 0 ? 'Lucro' : 'Prejuízo',
            style: result >= 0 ? 'profit' : 'loss',
            alignment: 'center'
          }
        ]
      })

      // Cálculo dos totais corrigido
      const totalLucro = operations.reduce((sum, op) => {
        const result = safeParseNumber(op.result)
        return result > 0 ? sum + result : sum
      }, 0)

      const totalPrejuizo = Math.abs(
        operations.reduce((sum, op) => {
          const result = safeParseNumber(op.result)
          return result < 0 ? sum + result : sum
        }, 0)
      )

      const docDefinition = {
        pageOrientation: 'landscape',
        content: [
          { text: 'Relatório de Operações Financeiras', style: 'header' },
          {
            text: `Gerado em: ${new Date().toLocaleDateString()} às ${new Date().toLocaleTimeString()}`,
            style: 'subheader',
            alignment: 'center'
          },
          {
            table: {
              headerRows: 1,
              widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto'],
              body: [
                [
                  { text: 'Data', style: 'tableHeader' },
                  { text: 'Descrição', style: 'tableHeader' },
                  { text: 'Ativo', style: 'tableHeader' },
                  { text: 'Valor (R$)', style: 'tableHeader' },
                  { text: 'Quantidade', style: 'tableHeader' },
                  { text: 'Resultado (R$)', style: 'tableHeader' },
                  { text: 'Tipo', style: 'tableHeader' }
                ],
                ...tableBody
              ]
            },
            layout: {
              fillColor: rowIndex => (rowIndex % 2 === 0 ? '#f5f5f5' : null),
              hLineWidth: (i, node) =>
                i === 0 || i === node.table.body.length ? 1 : 0.5,
              vLineWidth: () => 0.5,
              hLineColor: () => '#aaa',
              vLineColor: () => '#aaa'
            }
          },
          {
            text: '\n\nResumo:',
            style: 'subheader'
          },
          {
            table: {
              widths: ['*', '*', '*'],
              body: [
                [
                  { text: 'Total de Operações', style: 'tableHeader' },
                  { text: 'Total Lucro', style: 'tableHeader' },
                  { text: 'Total Prejuízo', style: 'tableHeader' }
                ],
                [
                  operations.length,
                  {
                    text: safeFormatCurrency(totalLucro),
                    style: 'profit'
                  },
                  {
                    text: safeFormatCurrency(totalPrejuizo),
                    style: 'loss'
                  }
                ]
              ]
            },
            layout: 'lightHorizontalLines'
          }
        ],
        styles: styles,
        defaultStyle: {
          fontSize: 9,
          margin: [0, 2, 0, 2]
        }
      }

      pdfMake
        .createPdf(docDefinition)
        .download(`operacoes_${new Date().toISOString().slice(0, 10)}.pdf`)
    }
    document.head.appendChild(script2)
  }
  document.head.appendChild(script)
}
