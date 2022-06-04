const alphabetOrder = (n) => {
	const Power = Array(100).fill(0);
	let sz = 0;

	Power[0] = 1;
	for (sz = 1; Power[sz - 1] * 26 < n; sz++) Power[sz] = Power[sz - 1] * 26;
	Power[0] = 0;

	n -= Power[sz - 1];

	let res = '';
	for (let i = sz - 1; i >= 0; i--) {
		for (let c = 'A'.charCodeAt(0); c <= 'Z'.charCodeAt(0); c++) {
			if (n > Power[i]) n -= Power[i];
			else {
				res += String.fromCharCode(c);
				break;
			}
		}
	}

	res += String.fromCharCode(n + 'A'.charCodeAt(0) - 1);

	return res;
};

module.exports = alphabetOrder;
