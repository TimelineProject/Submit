/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 37.8, "KoPercent": 62.2};
    var dataset = [
        {
            "label" : "KO",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "OK",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.18433333333333332, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "4 /imewis/msugg?ifc=4&em=4"], "isController": false}, {"data": [0.281, 500, 1500, "8 /UserServlet?method=login"], "isController": false}, {"data": [0.222, 500, 1500, "11 /UserServlet?method=login"], "isController": false}, {"data": [0.185, 500, 1500, "13 /UserServlet?method=login"], "isController": false}, {"data": [0.0, 500, 1500, "3 /imewis/msugg?ifc=4&em=4"], "isController": false}, {"data": [0.1675, 500, 1500, "6 /UserServlet?method=login"], "isController": false}, {"data": [0.0, 500, 1500, "2 /imewis/msugg?ifc=4&em=4"], "isController": false}, {"data": [0.287, 500, 1500, "7 /UserServlet?method=login"], "isController": false}, {"data": [0.251, 500, 1500, "9 /UserServlet?method=login"], "isController": false}, {"data": [0.259, 500, 1500, "10 /UserServlet?method=login"], "isController": false}, {"data": [0.214, 500, 1500, "12 /UserServlet?method=login"], "isController": false}, {"data": [0.0, 500, 1500, "1 /imewis/msugg?ifc=4&em=4"], "isController": false}, {"data": [0.731, 500, 1500, "5 /Login.jsp"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 6500, 4043, 62.2, 1199.3838461538458, 0, 7855, 2372.9000000000005, 4080.8499999999995, 6273.939999999999, 111.03329290582668, 147.7352177587076, 26.681220213183924], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["4 /imewis/msugg?ifc=4&em=4", 500, 500, 100.0, 0.02599999999999997, 0, 1, 0.0, 0.0, 1.0, 12.44059615336767, 14.748909892762061, 0.0], "isController": false}, {"data": ["8 /UserServlet?method=login", 500, 204, 40.8, 1885.9619999999982, 8, 7719, 3985.6000000000004, 5181.8, 6607.910000000001, 10.6972465287435, 12.948828885507371, 4.304304572003167], "isController": false}, {"data": ["11 /UserServlet?method=login", 500, 281, 56.2, 1879.9999999999993, 0, 7755, 3176.300000000007, 4560.85, 6475.92, 9.519095305182196, 15.413479009204964, 2.8338644195255682], "isController": false}, {"data": ["13 /UserServlet?method=login", 500, 323, 64.6, 1851.831999999999, 0, 7526, 2299.5000000000027, 4022.2999999999993, 6360.170000000002, 8.884624269239653, 16.075252628738205, 2.137723892531585], "isController": false}, {"data": ["3 /imewis/msugg?ifc=4&em=4", 500, 500, 100.0, 0.036000000000000004, 0, 7, 0.0, 0.0, 1.0, 12.440286624203821, 14.76069164883559, 0.0], "isController": false}, {"data": ["6 /UserServlet?method=login", 1000, 458, 45.8, 8455.768999999997, 7, 28885, 20932.0, 21633.8, 22484.97, 17.353278034220665, 103.78566844284698, 28.747094681654115], "isController": false}, {"data": ["2 /imewis/msugg?ifc=4&em=4", 500, 500, 100.0, 0.04799999999999999, 0, 5, 0.0, 0.0, 1.0, 12.439667612081404, 14.74780906354182, 0.0], "isController": false}, {"data": ["7 /UserServlet?method=login", 500, 172, 34.4, 1912.9759999999994, 0, 7605, 4234.000000000001, 5307.55, 6631.27, 11.171436870210245, 11.5664300765802, 4.981064414504994], "isController": false}, {"data": ["9 /UserServlet?method=login", 500, 233, 46.6, 1908.5339999999992, 0, 7855, 3848.8000000000006, 5061.849999999999, 6736.1500000000015, 10.266518828795533, 14.038802789156504, 3.7262650917826785], "isController": false}, {"data": ["10 /UserServlet?method=login", 500, 260, 52.0, 1815.3820000000012, 0, 7656, 3205.2000000000035, 4739.5, 6514.35, 9.872447972199186, 14.977583372823124, 3.2208861509299846], "isController": false}, {"data": ["12 /UserServlet?method=login", 500, 304, 60.8, 1806.469999999999, 0, 7421, 2427.700000000001, 4163.199999999999, 6129.110000000001, 9.185435573354889, 15.82227158118088, 2.4473444905757433], "isController": false}, {"data": ["1 /imewis/msugg?ifc=4&em=4", 1000, 1000, 100.0, 302.8879999999998, 0, 4215, 2003.0, 2014.9499999999998, 3512.1900000000005, 23.612193336639038, 86.90693733619041, 3.4970719035559963], "isController": false}, {"data": ["5 /Login.jsp", 500, 131, 26.2, 605.4019999999998, 1, 4215, 2014.9, 2295.349999999999, 3926.060000000001, 11.838802860254772, 16.958853870696593, 3.5067597714519105], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Percentile 1
            case 8:
            // Percentile 2
            case 9:
            // Percentile 3
            case 10:
            // Throughput
            case 11:
            // Kbytes/s
            case 12:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 28, 0.6925550333910463, 0.4307692307692308], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Unrecognized Windows Sockets error: 0: recv failed", 71, 1.75612169181301, 1.0923076923076922], "isController": false}, {"data": ["Non HTTP response code: java.lang.IllegalArgumentException/Non HTTP response message: URLDecoder: Illegal hex characters in escape (%) pattern - For input string: &quot;\u0090&Otilde;&quot;", 500, 12.367054167697255, 7.6923076923076925], "isController": false}, {"data": ["Non HTTP response code: java.lang.IllegalArgumentException/Non HTTP response message: URLDecoder: Illegal hex characters in escape (%) pattern - For input string: &quot;&acute;\u0082&quot;", 500, 12.367054167697255, 7.6923076923076925], "isController": false}, {"data": ["Non HTTP response code: java.lang.IllegalArgumentException/Non HTTP response message: URLDecoder: Illegal hex characters in escape (%) pattern - For input string: &quot;\u0001u&quot;", 500, 12.367054167697255, 7.6923076923076925], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8080 [localhost\/127.0.0.1, localhost\/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 1908, 47.19267870393272, 29.353846153846153], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:8080 failed to respond", 36, 0.8904279000742024, 0.5538461538461539], "isController": false}, {"data": ["Non HTTP response code: java.lang.IllegalArgumentException/Non HTTP response message: URLDecoder: Illegal hex characters in escape (%) pattern - For input string: &quot;s&oacute;&quot;", 500, 12.367054167697255, 7.6923076923076925], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 6500, 4043, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8080 [localhost\/127.0.0.1, localhost\/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 1908, "Non HTTP response code: java.lang.IllegalArgumentException/Non HTTP response message: URLDecoder: Illegal hex characters in escape (%) pattern - For input string: &quot;\u0090&Otilde;&quot;", 500, "Non HTTP response code: java.lang.IllegalArgumentException/Non HTTP response message: URLDecoder: Illegal hex characters in escape (%) pattern - For input string: &quot;&acute;\u0082&quot;", 500, "Non HTTP response code: java.lang.IllegalArgumentException/Non HTTP response message: URLDecoder: Illegal hex characters in escape (%) pattern - For input string: &quot;\u0001u&quot;", 500, "Non HTTP response code: java.lang.IllegalArgumentException/Non HTTP response message: URLDecoder: Illegal hex characters in escape (%) pattern - For input string: &quot;s&oacute;&quot;", 500], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["4 /imewis/msugg?ifc=4&em=4", 500, 500, "Non HTTP response code: java.lang.IllegalArgumentException/Non HTTP response message: URLDecoder: Illegal hex characters in escape (%) pattern - For input string: &quot;\u0090&Otilde;&quot;", 500, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["8 /UserServlet?method=login", 500, 204, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8080 [localhost\/127.0.0.1, localhost\/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 187, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Unrecognized Windows Sockets error: 0: recv failed", 9, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 4, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:8080 failed to respond", 4, null, null], "isController": false}, {"data": ["11 /UserServlet?method=login", 500, 281, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8080 [localhost\/127.0.0.1, localhost\/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 270, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Unrecognized Windows Sockets error: 0: recv failed", 5, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 3, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:8080 failed to respond", 3, null, null], "isController": false}, {"data": ["13 /UserServlet?method=login", 500, 323, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8080 [localhost\/127.0.0.1, localhost\/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 311, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:8080 failed to respond", 5, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Unrecognized Windows Sockets error: 0: recv failed", 4, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 3, null, null], "isController": false}, {"data": ["3 /imewis/msugg?ifc=4&em=4", 500, 500, "Non HTTP response code: java.lang.IllegalArgumentException/Non HTTP response message: URLDecoder: Illegal hex characters in escape (%) pattern - For input string: &quot;s&oacute;&quot;", 500, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["6 /UserServlet?method=login", 500, 135, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8080 [localhost\/127.0.0.1, localhost\/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 129, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:8080 failed to respond", 4, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 2, null, null, null, null], "isController": false}, {"data": ["2 /imewis/msugg?ifc=4&em=4", 500, 500, "Non HTTP response code: java.lang.IllegalArgumentException/Non HTTP response message: URLDecoder: Illegal hex characters in escape (%) pattern - For input string: &quot;\u0001u&quot;", 500, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["7 /UserServlet?method=login", 500, 172, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8080 [localhost\/127.0.0.1, localhost\/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 154, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Unrecognized Windows Sockets error: 0: recv failed", 10, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:8080 failed to respond", 5, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 3, null, null], "isController": false}, {"data": ["9 /UserServlet?method=login", 500, 233, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8080 [localhost\/127.0.0.1, localhost\/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 220, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Unrecognized Windows Sockets error: 0: recv failed", 6, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:8080 failed to respond", 4, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 3, null, null], "isController": false}, {"data": ["10 /UserServlet?method=login", 500, 260, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8080 [localhost\/127.0.0.1, localhost\/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 248, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Unrecognized Windows Sockets error: 0: recv failed", 5, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:8080 failed to respond", 4, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 3, null, null], "isController": false}, {"data": ["12 /UserServlet?method=login", 500, 304, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8080 [localhost\/127.0.0.1, localhost\/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 292, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Unrecognized Windows Sockets error: 0: recv failed", 5, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:8080 failed to respond", 5, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 2, null, null], "isController": false}, {"data": ["1 /imewis/msugg?ifc=4&em=4", 500, 500, "Non HTTP response code: java.lang.IllegalArgumentException/Non HTTP response message: URLDecoder: Illegal hex characters in escape (%) pattern - For input string: &quot;&acute;\u0082&quot;", 500, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["5 /Login.jsp", 500, 131, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8080 [localhost\/127.0.0.1, localhost\/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 97, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Unrecognized Windows Sockets error: 0: recv failed", 27, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 5, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:8080 failed to respond", 2, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
