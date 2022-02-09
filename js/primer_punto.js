"use strict";

$("[name=sel_consulta]").on("change", function () {
  if (this.value != "ninguno") {
    $("#campo_adicional").css("display", "block");
    return;
  }
  $("#campo_adicional").css("display", "none");
});

$("#boton_1").on("click", function (e) {
  e.preventDefault();

  const respuesta = $(".respuesta_1");

  console.log($("#usuario_1").val());

  let obj = {};
  obj.User = $("#usuario_1").val();
  obj.Password = $("#password_1").val();
  obj.option = $("#opcion_1").val();
  retornarFormData(
    obj,
    $("input[name='sel_consulta']:checked").val(),
    $("#codigo_consultado").val()
  );

  const jsonString = JSON.stringify(obj);

  console.log(jsonString);

  $.ajax({
    type: "POST",
    url: "https://www.php.engenius.com.co/DatabaseIE.php",
    contentType: "application/json",
    data: jsonString,
    dataType: "json",
    processData: false, // tell jQuery not to process the data
    success: function (json) {
      console.log(json);
      if (json.login == "Fail") {
        respuesta.html(
          imprimirMensaje(
            "Atenci&oacute;n",
            "Error en el inicio de sesi&oacute;n",
            "warning"
          )
        );
        return;
      }
      let respuestaJson = [];
      if (json.data == "DEFAULT") {
        respuestaJson = ["Inicio de sesión exitoso"].toString();
      } else if (json.data.length == 0) {
        respuestaJson = ["No hay información para mostrar"].toString();
      } else {
        respuestaJson = retornarInformacionArray(json.data, json.option);
      }
      respuesta.html(imprimirMensaje("Hecho", respuestaJson, "success"));
    },
    error: function (xhr, status) {
      alert("Disculpe, existió un problema");
    },
    complete: function (xhr, status) {
      alert("Petición realizada");
    },
  });

  return false;
});

function retornarFormData(obj, value, valueOption) {
  switch (value) {
    case "municipio":
      return (obj.CodMun = valueOption);
      break;
    case "institucion":
      return (obj.CodInst = valueOption);
      break;
    case "sede":
      return (obj.CodSede = valueOption);
      break;
    case "grupo":
      return (obj.IdGrupo = valueOption);
      break;
    default:
  }
}

function retornarInformacionArray(data, tipo) {
  let informacionDetallada = "";
  switch (tipo) {
    case "municipios":
      data.forEach((element) => {
        informacionDetallada += element.nombre + " : " + element.dane + "<br/>";
      });
      return informacionDetallada;
      break;
    case "instituciones":
      data.forEach((element) => {
        informacionDetallada += element.nombre + " : " + element.dane + "<br/>";
      });
      return informacionDetallada;
      break;
    case "sedes":
      data.forEach((element) => {
        informacionDetallada += element.nombre + " : " + element.dane + "<br/>";
      });
      return informacionDetallada;
      break;
    case "grupos":
      data.forEach((element) => {
        informacionDetallada +=
          "ID: " +
          element.id +
          "<br/>" +
          "Nombre: " +
          element.nombre +
          "<br/>" +
          "Grupo: " +
          element.numGrupo +
          "<hr/>";
      });
      return informacionDetallada;
      break;
    case "infoGrupo":
      data.forEach((element) => {
        informacionDetallada +=
          "ID: " +
          element.id +
          "<br/>" +
          "Nombre: " +
          element.nombre +
          "<br/>" +
          "Sede: " +
          element.sede +
          "<br/>" +
          "Institución: " +
          element.institución +
          "<br/>" +
          "Municipio: " +
          element.municipio +
          "<br/>" +
          "Grupo: " +
          element.numGrupo +
          "<hr/>";
      });
      return informacionDetallada;
      break;
    default:
  }
}
