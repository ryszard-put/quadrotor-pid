importScripts('regulator.js');

onmessage = async function (e) {
  const regulator = new Regulator(e.data[0], e.data[1]);
  await regulator.run();
  const { h, u, Fc, hzad_arr, performanceIndices } = regulator;
  console.log(performanceIndices);
  postMessage([{ h, u, Fc, hzad_arr, performanceIndices }]);
};
