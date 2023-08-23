function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function mat_to_table(x){
    var res = "<table class=\"mat_out_tab\">";
    for (let i = 0; i < x.length; i++) {
        res += "<tr>";
        for (let j = 0; j < x[i].length; j++) {
            res += "<td><input type=\"number\" class=\"mat_value\"\" value=\""+(Number.isInteger(x[i][j])? x[i][j] : x[i][j].toFixed(2) )+"\"></td>";
        }
        res += "</tr>";
    }
    res += "</table>";
    return res;
}


function rref(x){
    let output = "";
    for (let i = 0; i < mat_size[1] - 1; i++) {
        if (i >= mat_size[1] || i >= mat_size[0]) continue;
        let c = x[i][i];
        console.log(i);
        if (c === 0) continue;

        output += "<div class=\"msg\">Divide all elements of R"+(i+1)+" with the "+ordinal_suffix_of(i+1)+" element of R"+(i+1)+"<br></div>"
        for (let k = 0; k < mat_size[1]; k++) {
            x[i][k] = x[i][k] / c;
        }
        output += mat_to_table(x) + "<div class=\"out-gap\"></div>";

        for (let r = i + 1; r < mat_size[0]; r++) {
            let c = x[r][i];
            output += "<div class=\"msg\">Substract row "+(i+1)+" multiplied with "+ordinal_suffix_of(i+1)+" element of row "+(r+1)+" from row "+(r+1)+" <br> R"+(r+1)+"' = R"+(r+1)+" - R"+(i+1)+" x R"+(r+1)+"["+(i+1)+"]<br></div>"
            for (let k = i; k < mat_size[1]; k++) {
                x[r][k] = x[r][k] - x[i][k] * c;
            }
            output += mat_to_table(x) + "<div class=\"out-gap\"></div>";
        }

    }

    for (let i = 0; i < mat_size[1] - 1; i++) {
        if (i >= mat_size[1] || i >= mat_size[0]) continue;

        for (let r = 0; r < i; r++) {
            let c = x[r][i];
            output += "<div class=\"msg\">Substract row "+(i+1)+" multiplied with "+ordinal_suffix_of(i+1)+" element of row "+(r+1)+" from row "+(r+1)+" <br> R"+(r+1)+"' = R"+(r+1)+" - R"+(i+1)+" x R"+(r+1)+"["+(i+1)+"]<br></div>";
            for (let k = i; k < mat_size[1]; k++) {
                x[r][k] = x[r][k] - x[i][k] * c;
            }
            output += mat_to_table(x) + "<div class=\"out-gap\"></div>";

        }
    }
    output = "<div class=\"msg_head\">Result:</div>" + mat_to_table(x) + "<br><div class=\"msg_head\">Steps:</div>" + output;
    document.getElementById("mat_out_con").innerHTML = "<div class=\"mat_output\">" + output + "</div>";

    return x;
}
var mat_size;

function change_dimension(){
    sr = document.getElementById("size_row");
    sc = document.getElementById("size_col");

    if (sr.value == "") {sr.style.background = "lightpink"; return}
    else {sr.style.background = "none"}
    if (sc.value == "") {sc.style.background = "lightpink"; return}
    else {sc.style.background = "none"}

    size_row = Number(sr.value);
    size_col = Number(sc.value);
    mat_size = [size_row, size_col];

    mat_html = "<table>";
    for (r = 0; r < size_row; r++){
        mat_html += "<tr>";
        for (c = 0; c < size_col; c++){
            mat_html += "<td><input id=\"matv["+r+"]["+c+"]\" type=\"number\" class=\"mat_value\" onclick=\"this.select();\"></td>";
        }
        mat_html += "</tr>";

    }

    mat_html += "</table>";

    document.getElementById("matrix").innerHTML = mat_html;
}


function calculate_rref(){
    dont_eval = false;
    var x = Array(mat_size[0]).fill(null).map(() => Array(mat_size[1]).fill(0));;
    for (r = 0; r < mat_size[0]; r++){
        for (c = 0; c < mat_size[1]; c++){
            e = document.getElementById("matv["+r+"]["+c+"]");
            if (e.value == "") {e.style.background = "lightpink"; dont_eval = true;}
            else {
                e.style.background = "white";
                x[r][c] = Number(e.value);
            }
        }
    }
    if (!dont_eval) rref(x);

}


onload = () => {
    change_dimension();
}
