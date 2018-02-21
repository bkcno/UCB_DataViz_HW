function init() {
    var data = [{
        values: [
            163, 126, 113, 78, 71, 51, 50, 47, 40, 40
        ],
        labels: [
            '1167', 
      '2859', 
      '482', 
      '2264', 
      '41', 
      '1189', 
      '352', 
      '189', 
      '1977', 
      '2318'
        ],
        type: "pie"
    }];
    var layout = {
        title: '<b>OTU Compositions</b>',
        height: 400,
        width: 400
    };
    Plotly.plot("pie", data, layout);
}

init();