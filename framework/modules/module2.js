const canadianDollar = 0.91;

function roundTo(amount){
    return Math.round(amount * 100) / 100
}

exports.canadianToUS = canadian => roundTo(canadian * canadianDollar);
exports.USToCanadian = us => roundTo(us / canadianDollar);
