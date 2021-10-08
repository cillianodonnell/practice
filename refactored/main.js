const create_statement_data = require( './create_statement_data' );

function statement (invoice, plays)
{
  return render_plain_text(create_statement_data(invoice, plays) );
}
module.exports = statement;

function render_plain_text( data ) {
  let result = `Statement for ${data.customer}\n`;

  for (let performance of data.performances)
    result += `  ${performance.play.name}: ${usd(performance.cost)} (${performance.audience} seats)\n`;

  result += `Amount owed is ${usd(data.total_amount)}\n`;
  result += `You earned ${data.total_volume_credits} credits\n`;
  return result;
}
function render_html( data ) {
  let result = `<h1>Statement for ${data.customer}</h1>\n`;
  result += '<table>\n';
  result += '<tr><th>play</th><th>seats</th><th>cost</th>';

  for (let performance of data.performances)
    result += `<tr><td>${performance.play.name}</td>(${performance.audience}</td>`;
    result += '<td>${usd(performance.cost)}</td></tr>\n';

  result += '</table>\n';
  result += `<p>Amount owed is <em>${usd(data.total_amount)}</em></p>\n`;
  result += `<p>You earned <em>${data.total_volume_credits}</em> credits</p>\n`;
  return result;
}
function usd(a_number) {
  return new Intl.NumberFormat("en-US",
    {
      style: "currency", currency: "USD",
      minimumFractionDigits: 2
    }).format(a_number / 100);
}
