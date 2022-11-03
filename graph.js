var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var config = {
	type: 'line',
    data: {
        datasets: [{
            label: 'Scatter Dataset',
			backgroundColor: window.chartColors.red,
			borderColor: window.chartColors.red,
            data: [],
			fill: false,
			lineTension: .2,
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'time',
                position: 'bottom',
				ticks: {
					min: new Date() - 5000,
				},
            }]
        }
    }
};


console.log(config.data.datasets);
for (let i = 0; i < 10; i++) {
	config.data.datasets[0].data.push({x: (new Date()).getTime() - (10 - i) * 250, y: randomScalingFactor()});
}

window.onload = function() {
	var ctx = document.getElementById('canvas').getContext('2d');
	window.myLine = new Chart(ctx, config);



document.getElementById('randomizeData').addEventListener('click', function() {
	config.data.datasets.forEach(function(dataset) {
		dataset.data = dataset.data.map(function() {
			return randomScalingFactor();
		});

	});

	window.myLine.update();
});

var colorNames = Object.keys(window.chartColors);
document.getElementById('addDataset').addEventListener('click', function() {
	var colorName = colorNames[config.data.datasets.length % colorNames.length];
	var newColor = window.chartColors[colorName];
	var newDataset = {
		label: 'Dataset ' + config.data.datasets.length,
		backgroundColor: newColor,
		borderColor: newColor,
		data: [],
		fill: false
	};

	for (var index = 0; index < config.data.labels.length; ++index) {
		newDataset.data.push(randomScalingFactor());
	}

	config.data.datasets.push(newDataset);
	window.myLine.update();
});

document.getElementById('addData').addEventListener('click', function() {
	if (config.data.datasets.length > 0) {
		//var month = MONTHS[config.data.labels.length % MONTHS.length];
		//config.data.labels.push(month);

		config.data.datasets.forEach(function(dataset) {
			dataset.data.push({x: new Date(), y: randomScalingFactor()});
			//if (dataset.data.length > 50) {
				//dataset.data.shift();
			//}
		});

		window.myLine.update(0);
	}
});

setInterval(() => {
	let minTime = new Date() - 5000;
	window.myLine.options.scales.xAxes[0].ticks.min = minTime;
	let data = window.myLine.data.datasets[0].data;
	console.log(data);
	//while (data.length > 0 && data[0].x < minTime - 2000) {
		//console.log('remove', data[0]);
		//data.shift();
	//}
	window.myLine.update(0);
}, 1000);

document.getElementById('removeData').addEventListener('click', function() {
	config.data.labels.splice(-1, 1); // remove the label first

	config.data.datasets.forEach(function(dataset) {
		dataset.data.pop();
	});

	window.myLine.update();
});
//setInterval(() => {
		//config.data.datasets.forEach(function(dataset) {
			//dataset.data.push({x: new Date(), y: randomScalingFactor()});
			//if (dataset.data.length > 500) {
				//dataset.data.shift();
			//}
		//});

		//window.myLine.update();

//}, 16);
};

