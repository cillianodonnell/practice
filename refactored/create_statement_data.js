function create_statement_data(invoice, plays) {
  const statement_data = {};
  statement_data.customer = invoice.customer;
  statement_data.performances = invoice.performances.map(enrich_performance);
  statement_data.total_volume_credits = total_volume_credits(statement_data);
  statement_data.total_amount = total_amount(statement_data);

  function enrich_performance(a_performance) {
    const calculator = createPerfomanceCalculator( a_performance, play_for(a_performance) );
    const result = Object.assign({}, a_performance);
    result.play = calculator.play;
    result.cost = calculator.amount;
    result.volume_credits = calculator.volume_credits;
    return result;
  }
  function play_for(performance) {
    return plays[performance.playID];
  }
  function total_amount(data) {
    return data.performances.reduce((total, p) => total + p.cost, 0);
  }

  function total_volume_credits(data) {
    return data.performances.reduce((total, p) => total + p.volume_credits, 0);
  }
  return statement_data;
}
function createPerfomanceCalculator( a_performance, a_play )
{
  switch( a_play.type)
  {
    case "tragedy": return new TragedyCalculator( a_performance, a_play );
    case "comedy": return new ComedyCalculator( a_performance, a_play );
    default:
      throw new Error(`unknown type: ${a_play.type}`)
  }
}
class PerformanceCalculator
{
  constructor( a_performance, a_play )
  {
    this.performance = a_performance;
    this.play = a_play
  }
  get amount()
  {
    throw new Error('subclass responsibility');
  }
  get volume_credits()
  {
    return Math.max(this.performance.audience - 30, 0);
  }
}
class TragedyCalculator extends PerformanceCalculator
{
  get amount()
  {
    let amount = 40000;
    if ( this.performance.audience > 30 )
      amount += 1000 * (this.performance.audience - 30);
    return amount;
  }
}
class ComedyCalculator extends PerformanceCalculator
{ 
  get amount()
  {
    let amount = 30000;
    if ( this.performance.audience > 20 )
      amount += 10000 + 500 * (this.performance.audience - 20);
    amount += 300 * this.performance.audience;
    return amount;
  }
  get volume_credits()
  {
    return super.volume_credits + Math.floor(this.performance.audience / 5);
  }
}
module.exports = create_statement_data;