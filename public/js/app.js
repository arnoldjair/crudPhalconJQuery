//obj con las funcionalidades
var crud = {};

$(function () {
    console.log("Arnold Jair Jimenez Vargas <arnoldjair at hotmail dot com>");
});

$.fn.serializeObject = function ()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$(document).ready(function () {

    $("#fechaNacimiento").datepicker();

    crud.showAddUser = function () {
        $("#modalCrud").modal("show");
    };

    $("#btnAddUser").click(function (event) {
        event.preventDefault();
        console.log($("#formAddUser").serializeObject());
    });
});