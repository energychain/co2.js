const CO2 = require('./src/co2')

const co2Emission = new CO2();

const cliapp = async function(megabytes) {
  if(isNaN(megabytes)) megabytes = 1;
  let bytesSent = (megabytes * 1024 * 1024);
  const estimatedCO2 = Math.round(co2Emission.perByte(bytesSent));
  const offerCompensate = await co2Emission.compensationOffer(estimatedCO2);
  const compensationLink = co2Emission.compensationOfferOnline(estimatedCO2);

  console.log(`Sending ${megabytes} megabytes, had a carbon footprint of ${estimatedCO2.toFixed(3)} grams of CO2`)
  console.log(`Compensation Costs: ${offerCompensate.priceUSD} USD / ${offerCompensate.priceEUR} EUR`);
  console.log('Offset/Compensate via:',compensationLink);
}

if(process.argv.length > 2) {
  cliapp(process.argv[2]*1);
} else {
  console.log("Note: You might give megabytes to calculate as parameter");
  cliapp(1);
}
