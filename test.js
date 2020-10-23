var items = [
    {
        name: 'Edward',
        value: 21
    },
    {
        name: 'Sharpe',
        value: 38
    },
    {
        name: 'And',
        value: 45
    },
    {
        name: 'The',
        value: -12
    },
    {
        name: 'Zeros',
        value: 37
    }
];

// sort by value
items.sort(function (a, b) {
    return (a.value - b.value)
});

console.log(items)

console.log(items.slice(0,2))
