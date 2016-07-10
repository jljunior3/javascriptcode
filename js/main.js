
var list = [
    {"id":1, "desc":"rice", "amount":"1", "value":"5.40" },
    {"id":2, "desc":"soda", "amount":"5", "value":"3.80" },
    {"id":3, "desc":"beer", "amount":"15", "value":"8.90" },
    {"id":4, "desc":"meat", "amount":"34", "value":"9.99" }
];

var desc = document.getElementById("desc");
var amount = document.getElementById("amount");
var value = document.getElementById("value");

function getTotal(list) {
    var total = 0;
    for (var key in list){
        total += list[key].value * list[key].amount;
    }
    return total;
}

function setList(list) {
    var tbody = "";
    for (key in list){
        tbody +=  "<tr>" +
            "<td>"+formatDesc(list[key].desc)+"</td>"+
            "<td>"+list[key].amount+"</td>"+
            "<td>"+formatValue(list[key].value)+"</td>"+
            "<td><button class='btn btn-primary' onclick='setUpdate("+key+");'>Editar</button>" +
            "&nbsp;<button class='btn btn-danger' onclick='deleteData("+list[key].id+");'>Deletar</button></td>"+
        "</tr>";
    }
    document.getElementById("tbody").innerHTML = tbody;
    document.getElementById("total").innerHTML = formatValue(getTotal(list));
}

function formatDesc(desc){
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

function formatValue(value){
    var str = parseFloat(value).toFixed(2) + "";
    str = "R$ " + str.replace(".",",");
    return str;
}

function resetForm(){
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";

    document.getElementById('btnUpdate').style.display = "none";
    document.getElementById('btnAdd').style.display = "inline-block";
}

function addData() {
    if(!validation()){
        return;
    }
    desc = document.getElementById("desc").value;
    amount = document.getElementById("amount").value;
    value = document.getElementById("value").value;

    list.unshift({"desc":desc, "amount":amount,"value":value});
    setList(list);
    resetForm();
}

function setUpdate(key) {
    var obj = list[key];

    document.getElementById("idUpdate").value = key;
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;

    document.getElementById('btnUpdate').style.display = "inline-block";
    document.getElementById('btnAdd').style.display = "none";

}

function updateData(){
    var key = document.getElementById("idUpdate").value;
    var obj = list[key];

    obj.desc = document.getElementById("desc").value;
    obj.amount = document.getElementById("amount").value;
    obj.value = document.getElementById("value").value;

    resetForm();
    setList(list);
}

function deleteData(id){
    // alert(id);
    for(key in list){
        if(list[key].id == id){
            var confirm =  window.confirm("Deseja apagar o registro " +list[key].desc.toUpperCase() +" ?");
            // alert(confirm);
            if(confirm) list.splice(key, 1);
        }
    }
    setList(list);
}

function validation(){
    errors = ""
    if(desc.value == ""){
        errors += "<p class='alert alert-danger'>Preencha a DESCRIÇÃO</p>";
    }
    if(amount.value == ""){
        errors += "<p class='alert alert-danger'>Preencha a QUANTIDADE</p>";
    }
    if(value.value == ""){
        errors += "<p class='alert alert-danger'>Preencha o VALOR</p>";
    }

    if(errors != ""){
        document.getElementById("errors").style.display = "block";
        document.getElementById("errors").innerHTML = errors;

        setTimeout(function(){document.getElementById("errors").style.display = "none"; }, 5000);
        return false;
    }
    return true;
}

setList(list);

