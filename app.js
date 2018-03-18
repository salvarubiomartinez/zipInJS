var gzip = require('gzip-js'),
var fs = require('fs');


var obj = JSON.parse(fs.readFileSync('data.json', 'utf8'));
console.log(obj[0]);

var json = JSON.stringify(obj);
console.log(json.length);

var zipped = btoa(getString(gzip.zip(getArr(json),{level:9})));
console.log(zipped.length);

fs.writeFileSync('base64.txt', zipped);
var out = fs.readFileSync('base64.txt', 'utf8');

var unzipped = getString(gzip.unzip(getArr(atob(out)), {level: 9}));

var inData = JSON.parse(unzipped);
console.log(inData[0]);

function atob(a) {
    return new Buffer(a, 'base64').toString('binary');
};

function btoa(b) {
    return new Buffer(b, 'binary').toString('base64');
};

function getArr(str) {
    var nIndex = 0,
      nLen = str.length,
      arr = [];
    for (; nIndex < nLen; nIndex++) {
      arr.push(str.charCodeAt(nIndex));
    }
    return arr;
}

function getString(array) {
    var nIndex = 0,
      nLen = array.length,
      str = '';
    for (var index = 0; index < nLen; index++) {
	str += String.fromCharCode(array[index]);
    }
    return str;
}
