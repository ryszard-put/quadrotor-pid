const charts = {
  0: {
    datasets: [
      {
        label: 'Siła ciągu - Fc(t)',
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.7)',
        pointRadius: 0,
        cubicInterpolationMode: 'monotone',
      },
    ],
    title: 'Wygenerowana siła ciągu',
    yLabel: 'Fc(t) [N]',
    xLabel: 't [s]',
  },
  1: {
    datasets: [
      {
        label: 'Wysokość - h(t)',
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.7)',
        pointRadius: 0,
        cubicInterpolationMode: 'monotone',
      },
      {
        label: 'Wysokość zadana - h*(t)',
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.7)',
        pointRadius: 0,
        cubicInterpolationMode: 'monotone',
      },
    ],
    title: 'Zmierzona wysokość i wysokość zadana',
    yLabel: 'h(t) [m]',
    xLabel: 't [s]',
  },
  2: {
    datasets: [
      {
        label: 'Sygnał sterujący - u(t)',
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.7)',
        pointRadius: 0,
        cubicInterpolationMode: 'monotone',
      },
    ],
    title: 'Sygnał sterujący regulatora PID',
    yLabel: 'u(t) [-]',
    xLabel: 't [s]',
  },
};

export default charts;
